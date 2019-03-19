'use strict'
const { Stock } = require('../schema/stock')
const { Response } = require('../utils/response')
const { ErrorHandler } = require('../utils/errorhandler')
const mongoose = require('mongoose')
class StockController {
/**
     * API | POST
     * Adds a product to database
     * @example {
     *      ProductName: String
     *      ProductPrice:Number
     *      ProductRange:Number
     * @param {*} req
     *      req.body.name
     *      req.body.price
     *      req.body.quanitity
     * @param {*} res
     *      res.send
     *      res.status
     */
    static async addStock (req, res) {
        try {
            let ProductName = req.body.ProductName
            let ProductPrice = req.body.ProductPrice
            let ProductRange = req.body.ProductRange
            if (ProductName == null) { throw { code: 400, message: 'Name is required' } }
            let stock = new Stock({ ProductName: ProductName, ProductPrice: ProductPrice, ProductRange: ProductRange })
            await stock.save()
            return new Response(res, { Stock: stock }, 'Stock saved successfully')
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
    /**
     * aPI | GET
     * Retreive Stock from database
     * @example {
     *     ProductName: String
     *      ProductPrice:Number
     *      ProductRange:Number
     * @param {*} req
     * @param {*} res
     *      response
     */
    static async showProduct (req, res) {
        try {
            await Stock.find((_err, data) => new Response(res, { data,
                message: 'Stock retreived successfully' }))
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
    /**
 * aPI | GET
 * Delete product from database
 * @example {
 *      ProductName: String
 *      ProductPrice:Number
 *      ProductRange:Number
 * @param {*} req
 *      req.params.id
 * @param {*} res
 *      response
 */
    static async deleteProduct (req, res) {
        try {
            await Stock.findByIdAndDelete(req.params.id, () => new Response(res, { data: '',
                message: 'Stock Deleted successfully' }))
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
    /**
 * aPI | PUT
 * update stock into database
 * @example {
 *      ProductName: String
 *      ProductPrice:Number
 *      ProductRange:Number
 * @param {*} req
 *      ProductName: req.body.ProductName,
        ProductPrice: req.body.ProductPrice,
        ProductRange: req.body.ProductRange
 * @param {*} res
 *      response
 */

    static async updateProduct (req, res) {
        try {
            await Stock.findByIdAndUpdate(
                req.params.id,
                { $set:
                    {
                        ProductName: req.body.ProductName,
                        ProductPrice: req.body.ProductPrice,
                        ProductRange: req.body.ProductRange
                    } }, () => new Response(res, { data: '',
                    message: 'Stock updated successfully' })
            )
        } catch (error) {
            ErrorHandler.sendError(res, error)
        }
    }
}
module.exports = { StockController }
