import mongoose, { model, Model, Document, Schema } from "mongoose";

const ModelSchema = mongoose.Schema;

const customerSchema = new ModelSchema(
  {
    name: {
      type: String,
      required: [true, "Shopping Item name is a required"],
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
    },
    Bought: [],
    WishList: [],
  },
  { minimize: false }
);
/* 
console.log(mongoose.models, mongoose.modelNames); */

const containsCustomer = Object.keys(mongoose.models).includes("customer");
const Customer = containsCustomer
  ? mongoose.models.customer
  : mongoose.model("customer", customerSchema);
export { Customer };
