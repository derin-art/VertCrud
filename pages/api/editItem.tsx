import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Mongo from "DataBase/Mongo";
import upload from "../../MiddleWare/Multer";
import multiparty from "multiparty";
import { buildImageUrl } from "cloudinary-build-url";
import cloudinary from "../../DataBase/Cloudinary";
import { Model } from "mongoose";

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
  .get(async (req, res) => {
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });

    try {
      console.log("getItem");
      const itemId = req.query.id;
      console.log(req.query);
      const data = await ShopItem.findById(itemId);
      if (data) {
        console.log(data);
      }
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  })
  .patch(async (req, res) => {
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });

    try {
      const form = new multiparty.Form();
      const data: any = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
          if (err) reject({ err });
          resolve({ fields, files });
        });
      });

      const cloudData = await Object.entries(data.files).map(
        async (file: any) => {
          const isMain = file[0] === "Main";
          const result: any = await cloudinary.v2.uploader
            .upload(file[1][0].path)
            .catch((err) => {
              console.log(err);
            });

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
      const allImgTypes = ["Main", "Sec", "Alt"];
      const editedShopItem = await ShopItem.findById({ _id: req.query.id });

      let finalEdited: any = { ...editedShopItem._doc };

      if (editedShopItem) {
        const newEditedItemsUrls = editedShopItem.urls.map((url: any) => {
          const available = allImageUrls.find((item) => {
            return item.imgType === url.imgType;
          });

          if (available) {
            return { ...url, ...available };
          } else {
            return url;
          }
        });

        const otherURls: any = [];

        allImageUrls.forEach((item) => {
          const notAvailable = newEditedItemsUrls.find((url: any) => {
            return url.imgType === item.imgType;
          });
          if (!notAvailable) {
            otherURls.push(item);
          }
        });

        console.log("mognp", newEditedItemsUrls);
        const newEditedShopItem = {
          ...editedShopItem,
          urls: editedShopItem.urls,
          name: data.fields.name[0],
          price: parseInt(data.fields.price[0]),
          Description: data.fields.Description[0],
          itemCollection: data.fields.collection[0],
        };
        console.log("formdata", data);
        editedShopItem.urls = [...newEditedItemsUrls, ...otherURls].filter(
          (url: any) => {
            const itemInDeletionArr = data.fields.forDeletionArr.find(
              (item: string) => {
                return item === url.imgType;
              }
            );
            if (!itemInDeletionArr) {
              return url;
            } else return;
          }
        );
        editedShopItem.name = data.fields.name[0];
        editedShopItem.price = parseInt(data.fields.price[0]);
        editedShopItem.Description = data.fields.Description[0];
        editedShopItem.itemCollection = data.fields.collection[0];

        const updatedItem = await ShopItem.findByIdAndUpdate(
          req.query.id,
          editedShopItem,
          { new: true }
        );

        return res.status(200).send(updatedItem);
      }
    } catch (err) {
      console.log(err);
    }
  });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
