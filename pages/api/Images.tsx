import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { async } from "@firebase/util";
import cloudinary from "../../DataBase/Cloudinary";
import Mongo from "../../DataBase/Mongo";
import upload from "../../MiddleWare/Multer";
import { buildImageUrl } from "cloudinary-build-url";
import multiparty from "multiparty";

import { promises } from "fs";

const { ShopItem } = require("../../Models/items");

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler
  .post(async (req: any, res) => {
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });

    try {
      let urlArr: object[];
      urlArr = [];
      console.log(req.files);

      const form = new multiparty.Form();
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) reject({ err });
          resolve({ fields, files });
        });
      });

      console.log("sds", data);

      const cloudData = await Object.entries(data.files).map(
        async (file: any) => {
          const isMain = file[0] === "Main";
          const result: any = await cloudinary.v2.uploader
            .upload(file[1][0].path)
            .catch((err) => {
              console.log(err);
            });
          console.log(result);

          const blurUrl = buildImageUrl(result.public_id, {
            cloud: {
              cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME,
            },
            transformations: {
              effect: "blur:200",
              quality: 1,
            },
          });

          return {
            imgType: file[0],
            imgUrl: result.secure_url,
            isMain,
            cloudId: result.public_id,
            blurUrl: blurUrl,
          };
        }
      );

      const allImageUrls = await Promise.all(cloudData);
      console.log("sdsdsd", allImageUrls);

      const newShopItem = await ShopItem.create({
        urls: [...allImageUrls],
        name: data.fields.name[0],
        price: parseInt(data.fields.price[0]),
        Description: data.fields.Description[0],
        itemCollection: data.fields.collection[0],
      });

      return res.status(200).send(newShopItem);
    } catch (err) {
      console.log(err);
    }
  })
  .get(async (req, res) => {
    console.log("Sent");
    await Mongo().catch((err) => {
      console.log(err);
      return err;
    });
    try {
      const allShoppingItems = await ShopItem.find({});

      return res.status(200).send(allShoppingItems);
    } catch (err) {
      console.log(err);
    }
  })
  .delete(async (req, res) => {
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });
    try {
      const shoppingItemAfterDelete = await ShopItem.findByIdAndDelete(
        req.query.id
      );
      return res.status(200).send(shoppingItemAfterDelete);
    } catch (err) {
      console.log(err);
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

/* .then((cl) => {
            finalUR[1] = cl.secure_url;
            urlArr = [...urlArr, { imgUrl: cl.secure_url }];
          }) */

export default handler;

/*  upload.fields([
      { name: "Main", maxCount: 1 },
      { name: "Sec", maxCount: 1 },
      { name: "Alt", maxCount: 1 },
    ]), */
