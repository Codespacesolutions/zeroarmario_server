const { Router } = require('express')
const express = require('express')
const asyncHandler = require('express-async-handler')
const AuthController = require('../controllers/authController')

const router = express.Router()
const authController = new AuthController()

router.post('/register', asyncHandler(authController.Register))

module.exports = router