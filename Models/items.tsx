import mongoose from "mongoose";

const Schema = mongoose.Schema;

const shopItemSchema = new Schema(
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

console.log(mongoose.models, mongoose.modelNames);

const containsShopItems = Object.keys(mongoose.models).includes("shopItem");
const ShopItem = containsShopItems
  ? mongoose.models.shopItem
  : mongoose.model("shopItem", shopItemSchema);
export { ShopItem };
