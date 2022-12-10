import mongoose, { model, Model, Document, Schema } from "mongoose";

const ModelSchema = mongoose.Schema;

const shopItemSchema = new ModelSchema(
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
    itemCollection: {
      type: String,
      require: [true, "Item's collection is required to save it"],
    },
    DateCreated: { type: Date, default: Date.now() },
    urls: [
      {
        imgUrl: {
          type: String,
          required: [true, "Shopping Item Url is a required"],
        },
        isMain: Boolean,
        cloudId: {
          type: String,
          required: [true, "Shopping Item cloud id is a required"],
        },
        blurUrl: String,
      },
    ],
  },
  { minimize: false }
);
/* 
console.log(mongoose.models, mongoose.modelNames); */

const containsShopItems = Object.keys(mongoose.models).includes("shopItem");
const ShopItem = containsShopItems
  ? mongoose.models.shopItem
  : mongoose.model("shopItem", shopItemSchema);
export { ShopItem };
