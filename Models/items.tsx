import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopItem = new Schema(
  {
    name: {
      type: String,
      required: [true, "Shopping Item name is a required"],
    },
    price: {
      type: Number,
      required: [true, "Shopping Item price is a required"],
    },
    data: {},
    Description: { type: String },
    DateCreated: { type: Date, default: Date.now() },
    urls: [
      {
        imgUrl: {
          type: String,
          required: [true, "Shopping Item Url is a required"],
        },
        main: Boolean,
      },
    ],
  },
  { minimize: false }
);

const ShopItem = mongoose.model("ShopItem", shopItem);
export { ShopItem };
