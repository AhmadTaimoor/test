'use strict'
var express = require('express')
// import { path } from 'path'
var api = require('./route/test.js')
var PORT = require('./config.json').PORT
var { json, urlencoded } = require('body-parser')
var { connect } = require('./schema/mongoose')
var app = express()
app.listen(PORT, function () {
    console.log(`Server is listening on ${PORT}`)
    connect()
}).on('error', function () {
    console.log('Something went wrong')
    console.log(Error)
})
// app.set('view engine', 'ejs')
// app.set('views', path.join(__dirname, 'views'))
app.use(json())
app.use(urlencoded({ extended: false }))
app.use('/', api)
