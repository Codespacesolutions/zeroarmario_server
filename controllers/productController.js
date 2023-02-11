const Product = require("../models/productModel");
const Ptype = require("../models/productTypeModel");

class ProductController {
  async CreateProduct(req, res) {
    const {
      category,
      title,
      price,
      description,
      sizeChart,
      xsmall,
      xsmallQty,
      small,
      smallQty,
      medium,
      mediumQty,
      large,
      largeQty,
      exLarge,
      exLargeQty,
      dXL,
      dXLQty,
    } = req.body;
    const existCategory = await Ptype.findById(category);
    if (!existCategory) return res.status(400).send("Category not found!");
    const file = req.file;
    if (!file) return res.status(400).send("No image in the request");

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get("host")}/uploads/`;
    const product = await Product.create({
      user: req.user,
      category: category,
      image: `${basePath}${fileName}`,
      productTitle: title,
      price: price ? price : 0,
      description: description,
      sizeChart: sizeChart,
      xsmall: xsmall,
      xsmallQty: xsmallQty,
      small: small,
      smallQty: smallQty,
      medium: medium,
      mediumQty: mediumQty,
      large: large,
      largeQty: largeQty,
      exLarge: exLarge,
      exLargeQty: exLargeQty,
      dXL: dXL,
      dXLQty: dXLQty,
    });
    if (!product)
      return res
        .status(500)
        .send("Product cannot be created! Please try again");
    return res.status(201).send(product);
  }
  async GetProducts(req, res){
    const products = await Product.find({}).lean().populate("category")
    if(!products) return res.stats(400).send("Cannot access products!")
    return res.status(200).json(products)
  }
}

module.exports = ProductController;
