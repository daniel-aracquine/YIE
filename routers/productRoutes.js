const express = require("express");
const mongoose = require('mongoose')
const router = new express.Router();
const Person = require('../models/person')
const User = require('../models/user')
const Admin = require('../models/admin')
const Product = require('../models/products')
const {auth, adminAuth} = require('../middlewares/auth')


//Get all products
router.get('/products/getAll', auth, async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send({
            products
        })
    } catch (e) {
        res.status(500).send(e)
    }
})


//Get product by id
router.get('/products/:id', auth, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(400).send({
                error: 'Product does not exist'
            })
        }

        res.status(200).send({
            product
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router