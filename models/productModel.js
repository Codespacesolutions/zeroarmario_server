const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "Admin" },
    category: { type: Schema.Types.ObjectId, required: true, ref: "Ptype" },
    productTitle: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    description: { type: String },
    image: { type: String },
    xsmall: { type: Boolean, default: false },
    xsmallQty: { type: Number, default: 0 },
    small: { type: Boolean, default: false },
    smallQty: { type: Number, default: 0 },
    medium: { type: Boolean, default: false },
    mediumQty: { type: Number, default: 0 },
    large: { type: Boolean, default: false },
    largeQty: { type: Number, default: 0 },
    exLarge: { type: Boolean, default: false },
    exLargeQty: { type: Number, default: 0 },
    dXL: { type: Boolean, default: false },
    dXLQty: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
