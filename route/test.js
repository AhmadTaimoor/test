'use strict'
const { Router } = require('express')
const { StockController } = require('../controllers/StockController')
const router = new Router()
router.post('/products', StockController.addStock)

module.exports = router
