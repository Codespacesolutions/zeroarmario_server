const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const AdminAuthController = require('../controllers/adminAuthController')

const router = express.Router()
const adminAuthController = new AdminAuthController()

router.post('/login', expressAsyncHandler(adminAuthController.AdminLogin))
router.post('/add-user', expressAsyncHandler(adminAuthController.AddUser))

module.exports = router