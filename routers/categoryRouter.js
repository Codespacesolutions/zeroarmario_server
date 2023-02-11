const express = require('express')
const asyncHandler = require('express-async-handler')
const {adminLoginJWT, adminAuthJWT} = require('../libs/authMiddleware')
const {CategoryController, SubCategoryController, PtypeController} = require('../controllers/categoryController')

const router = express.Router()
const categoryController = new CategoryController()
const subCategoryController = new SubCategoryController()
const ptypeController = new PtypeController()

router.post('/create-category', adminLoginJWT, adminAuthJWT, asyncHandler(categoryController.CreateCategory) )
router.get('/get-categories',asyncHandler(categoryController.GetCategories))

router.post('/create-subCategory',adminLoginJWT, adminAuthJWT, asyncHandler(subCategoryController.CreateSubCategory))
router.get('/get-subCategories',asyncHandler(subCategoryController.GetSubCategories))

router.post('/create-ptype', adminLoginJWT,adminAuthJWT, asyncHandler(ptypeController.CreatePtype))
router.get('/get-ptypes',asyncHandler(ptypeController.getPtypes))

module.exports = router