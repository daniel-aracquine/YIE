const express = require("express");
const mongoose = require('mongoose')
const router = new express.Router();
const Person = require('../models/person')
const User = require('../models/user')
const Admin = require('../models/admin')
const Product = require('../models/products')
const {auth, adminAuth} = require('../middlewares/auth')


//Add Product
router.post("/admin/addProduct", auth, adminAuth, async(req, res) => {
    try {
        const product = new Product(req.body)

        await product.save()
        res.status(200).send({
            product
        })
    } catch (e) {
        res.status(500).send(e)
    }
})


//Update Product
router.patch("/admin/updateProduct/:id", auth, adminAuth, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(400).send({
                error: 'Product does not exist'
            })
        }
        
        const updates = Object.keys(req.body)
        const allowedUpdates = ['productName', 'productPrice']
        const isValid = updates.every((update) => {
            return allowedUpdates.includes(update)
        })

        if(!isValid) {
            return res.status(400).send({
                error: 'Invalid updates'
            })
        }

        updates.forEach((update) => {
            product[update] = req.body[update]
        })

        await product.save()

        res.status(200).send({
            product
        })

    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/admin/deleteProduct/:id', auth, adminAuth, async(req, res) => {
    try {
        const product = await Product.findOneAndDelete({_id: req.params.id});

        if(!product) {
            return res.status(400).send({
                error: 'Product does not exist'
            })
        }

        res.status(200).send()

    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router