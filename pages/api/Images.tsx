import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { async } from "@firebase/util";
import cloudinary from "../../DataBase/Cloudinary";
import Mongo from "../../DataBase/Mongo";
import upload from "../../MiddleWare/Multer";
import { ShopItem } from "Models/items";

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
      const urlArr = [];

      Object.entries(req.files).forEach(async (file: any) => {
        const isMain = file[1] === req.body.main;
        const result = await cloudinary.v2.uploader.upload(file[1][0].path);
        urlArr.push({ imgUrl: result.secure_url, main: isMain });
      });

      return;

      const newShopItem = await ShopItem.create({
        urls: [],
        name: req.body.name,
        price: req.body.price,
      });
    } catch (err) {}
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
