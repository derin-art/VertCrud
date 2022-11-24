import { Writable } from "stream";
const formidable = require("formidable");
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const formidableConfig = {
  keepExtensions: true,
  maxFileSize: 10_000_000,
  maxFieldsSize: 10_000_000,
  maxFields: 2,
  allowEmptyFiles: false,
  multiples: false,
};

function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: any; files: any }> {
  return new Promise((accept, reject) => {
    const form = formidable(opts);

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) {
        return reject(err);
      }
      return accept({ fields, files });
    });
  });
}

const fileConsumer = <T = unknown,>(acc: T[]) => {
  const writable = new Writable({
    write: (chunk, _enc, next) => {
      acc.push(chunk);
      next();
    },
  });

  return writable;
};

const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

handler.post(async (req, res) => {
  try {
    const chunks: never[] = [];
    const { fields, files } = await formidablePromise(req, {
      ...formidableConfig,
      // consume this, otherwise formidable tries to save the file to disk
      fileWriteStreamHandler: () => fileConsumer(chunks),
    });
    const contents = Buffer.from(chunks);
  } catch (err) {
    console.log(err);
  }
});
// and don't forget
export const config = {
  api: {
    bodyParser: false,
  },
};
