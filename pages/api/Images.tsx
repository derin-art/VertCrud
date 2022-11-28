import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { async } from "@firebase/util";
import cloudinary from "../../DataBase/Cloudinary";
import Mongo from "../../DataBase/Mongo";
import upload from "../../MiddleWare/Multer";

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

handler.post(
  upload.fields([
    { name: "Main", maxCount: 1 },
    { name: "Sec", maxCount: 1 },
    { name: "Alt", maxCount: 1 },
  ]),
  async (req: any, res) => {
    await Mongo().catch((err) => {
      console.log(err);
    });

    try {
      let urlArr: object[];
      urlArr = [];
      console.log(req.files);
      let finalUR = {
        1: "",
        2: "",
        3: "",
      };

      const cloudData = await Object.entries(req.files).map(
        async (file: any) => {
          const isMain = file[1] === "Main";
          const result: any = await cloudinary.v2.uploader
            .upload(file[1][0].path)
            .catch((err) => {
              console.log(err);
            });
          return { imgurl: result.secure_url, isMain };
        }
      );

      const allImageUrls = await Promise.all(cloudData);
      console.log(allImageUrls);

      return res.status(200).send(allImageUrls);
      return;
      const newShopItem = await ShopItem.create({
        urls: [],
        name: req.body.name,
        price: req.body.price,
      });
    } catch (err) {
      console.log(err);
    }
  }
);
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
