import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
const cors = require("cors");
import Mongo from "DataBase/Mongo";
import { async } from "@firebase/util";
import { use } from "react";

const { Customer } = require("../../Models/customer");

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .options("*", cors())
  .use(cors({ origin: "*" }));

const allowCors = (fn: any) => async (req: any, res: any) => {
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT,get,put,post"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  return await fn(req, res);
};

handler
  .use(async (req, res, next) => {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "get", "post"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "OPTIONS") {
      return res.status(200).json({
        body: "OK",
      });
    }
    next();
  })
  .get(async (req, res) => {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "get"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });
    if (req.query.id) {
      try {
        const data = await Customer.findOne({ _id: req.query.id });
        return res.status(200).send(data);
      } catch (err) {
        console.log(err);
        return;
      }
    } else {
      try {
        console.log(req.query.email);
        const data = await Customer.findOne({ email: req.query.email });
        return res.status(200).send(data);
      } catch (err) {
        console.log(err);
        return;
      }
    }
  })
  .post(async (req, res) => {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "get", "post"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "OPTIONS") {
      return res.status(200).json({
        body: "OK",
      });
    }
    await Mongo().catch((err) => {
      console.log(err);
      return;
    });

    try {
      console.log("Sent", req.query.name, req.query.email);
      const data = await Customer.create({
        name: req.query.name,
        email: req.query.email,
      });
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
    }
  })
  .put(async (req, res) => {
    if (req.method === "OPTIONS") {
      return res.status(200).json({
        body: "OK",
      });
    }
    await NextCors(req, res, {
      // Options
      methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "get", "post"],
      origin: "*",
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    await Mongo().catch((err) => {
      console.log(err, "er");
      return res.status(500).send(err);
    });
    const data = await Customer.findOne({ email: req.query.email });
    if (req.query.Bought) {
      console.log(data);

      data.Bought.push(...req.body.item);

      try {
        const newUpdatedMongoData = await Customer.findOneAndUpdate(
          { email: req.query.email },
          data,
          { new: true }
        );
        return res.status(200).send(newUpdatedMongoData);
      } catch (err) {
        console.log(err);
      }
    } else {
      if (req.query.Remove) {
        const newData = data.WishList.filter(
          (item: any) => item._id != req.body.item._id
        );
        data.WishList = newData;
        try {
          const newUpdatedMongoData = await Customer.findOneAndUpdate(
            { email: req.query.email },
            data,
            { new: true }
          );
          return res.status(200).send(newUpdatedMongoData);
        } catch (err) {
          console.log(err);
        }
      } else {
        if (data.WishList.find((item: any) => item._id === req.body.item._id)) {
          return res.status(433).send("Item already whishlisted");
        }
        try {
          const data = await Customer.findOneAndUpdate(
            { email: req.query.email },
            { $push: { WishList: req.body.item } },
            { new: true }
          );
          return res.status(200).send(data);
        } catch (err) {
          console.log(err);
        }
      }
    }
  });

export default allowCors(handler);
