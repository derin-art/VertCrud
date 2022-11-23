import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export default async function Mongo(handler, req, res) {
  try {
    if (mongoose.connections[0]) {
      await mongoose
        .connect(process.env.NEXT_PUBLIC_MONGO_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => {
          console.log("Mongoose is connected");
        });
      handler(req, res);
    } else {
      handler(req, res);
    }
  } catch (err) {
    console.log(err);
  }
}
