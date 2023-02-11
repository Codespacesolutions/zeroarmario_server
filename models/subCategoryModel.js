const mongoose = require("mongoose");
const Schema = mongoose.Schema

const subCategorySchema = mongoose.Schema(
  {
    user: {type:Schema.Types.ObjectId, required: true, ref:"Admin"},
    subCategory: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Subcategory = mongoose.model("Subcategory", subCategorySchema);
module.exports = Subcategory;
