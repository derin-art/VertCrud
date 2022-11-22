import nextConnect from "next-connect";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
  info?: any;
};

const handler = nextConnect<NextApiRequest, NextApiResponse<Data>>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.get(async (req, res) => {
  return res.status(200).json({ name: "Heyy", info: "Nicee" });
});

export default handler;
