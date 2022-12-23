import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import Mongo from "DataBase/Mongo";
import { async } from "@firebase/util";

const { Customer } = require("../../Models/customer");

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
  .get(async (req, res) => {})
  .post(async (req, res) => {
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });

    try {
      const data = await Customer.create({
        name: req.body.name,
        email: req.body.email,
      });
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  })
  .patch(async (req, res) => {});

export default handler;
