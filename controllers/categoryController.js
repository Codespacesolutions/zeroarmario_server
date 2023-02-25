const Category = require('../models/categoryModel')
const Subcategory = require('../models/subCategoryModel')
const Ptype = require('../models/productTypeModel')

class CategoryController{
    async CreateCategory(req, res){
        const {category} = req.body
        console.log("called")
        const newCategory = await Category.create({
            user: req.user,
            category: category
        })
        if(!newCategory) return res.status(400).send("Category cannot be created!")
        return res.status(201).json(newCategory)
    }
    async GetCategories(req, res){
        const categories = await Category.find({})
        if(!categories) return res.status(500).send("Server error!")
        return res.status(200).json(categories)
    }
    async GetCategory(req, res){
        const category = await Category.findById(req.params.id)
        if(!category) return res.status(400).send("Category not found!")
        return res.status(200).json(category)
    }
}

class SubCategoryController{
    async CreateSubCategory(req, res){
        const {category, subCategory} = req.body
        const existCategory = await Category.findById(category)
        if(!existCategory) return res.status(400).send("Category not found!")
        const newSubCategory = await Subcategory.create({
            user: req.user,
            subCategory: subCategory+":"+existCategory.category,
            category: category
        })
        if(!newSubCategory) return res.status(400).send("Subcategory cannot be created!")
        return res.status(201).json(newSubCategory)
    }
    async GetSubCategories(req, res){
        const subCategories = await Subcategory.find({})
        if(!subCategories) return res.status(500).send("Server error!")
        return res.status(200).json(subCategories)
    }
    async GetSubCategory(req, res){
        const subCategory = await Subcategory.findById(req.params.id)
        if(!subCategory) return res.status(400).send("Data not found!")
        return res.status(200).json(subCategory)
    }
}

class PtypeController{
    async CreatePtype(req, res){
        const {ptype, category} = req.body
        const existSubCategory = await Subcategory.findById(category)
        if(!existSubCategory) return res.status(400).send("Subcategory not found!")
        const newPtype = await Ptype.create({
            user: req.user,
            ptype: ptype+":"+existSubCategory.subCategory,
            category: category
        })
        if(!newPtype) return res.status(400).send("Product type cannot be created!")
        return res.status(201).json(newPtype)
    }
    async getPtypes(req, res){
        const ptypes = await Ptype.find({})
        if(!ptypes) return res.status(500).send("Server error!")
        return res.status(200).json(ptypes)
    }
    async getPtype(req, res){
        const ptype = await Ptype.findById(req.params.id)
        if(!ptype) return res.status(400).send("Ptype not found!")
        return res.status(200).json(ptype)
    }
}

module.exports = {CategoryController, SubCategoryController, PtypeController}