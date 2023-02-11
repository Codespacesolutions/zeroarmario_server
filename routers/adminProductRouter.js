const express = require("express");
const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { adminLoginJWT, adminAuthJWT } = require("../libs/authMiddleware");
const ProductController = require('../controllers/productController')

const router = express.Router();
const productController = new ProductController()

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid image type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.replace(" ", "-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

router.post("/create-product",adminLoginJWT, adminAuthJWT,upload.single("file"),asyncHandler(productController.CreateProduct));

router.get('/get-products',asyncHandler(productController.GetProducts))

module.exports = router;
