import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Mongo from "DataBase/Mongo";
import upload from "../../MiddleWare/Multer";
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

handler.get(async (req, res) => {
  await Mongo().catch((err) => {
    console.log(err);
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
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
