const express = require('express')
const asyncHandler = require('express-async-handler')
const AuthrorizationController = require('../controllers/authorizationController')

const router = express.Router()
const authorizationController = new AuthrorizationController()

router.get('/refreshToken', asyncHandler(authorizationController.refreshToken))

module.exports = router