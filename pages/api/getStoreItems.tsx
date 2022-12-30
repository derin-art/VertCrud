import nextConnect from "next-connect";
import { NextApiResponse, NextApiRequest } from "next";
const { ShopItem } = require("../../Models/items");
import Mongo from "DataBase/Mongo";

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
    return;
  });
  try {
    const data = await ShopItem.find({
      itemCollection: req.query.collection,
    });
    res.setHeader("Cache-control", "public, max-age=200");
    return res.status(200).send(data);
  } catch (err) {}
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
