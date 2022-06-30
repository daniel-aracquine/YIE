const express = require("express");
const mongoose = require('mongoose')
const router = new express.Router();
const Person = require('../models/person')
const User = require('../models/user')
const Admin = require('../models/admin')
const {auth, adminAuth} = require('../middlewares/auth')

//users signup
router.post("/signup", async(req, res) => {
    try {
        const {username, password, ...userObject} = req.body
        const user = new User(userObject)
        const person = new Person({
            username: req.body.username,
            password: req.body.password,
            user: user._id
        })

        await user.save()
        await person.save()

        const token = await person.generateAuthToken()
        res.status(200).send({
            user,
            token,
            username: person.username
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

//creating Admin
router.post("/createAdmin", async (req, res) => {
    try {
        const {username, password, ...adminObject} = req.body
        const admin = new Admin(adminObject)
        const person = new Person({
            username: req.body.username,
            password: req.body.password,
            admin: admin._id
        })

        await admin.save()
        await person.save()

        const token = await person.generateAuthToken()
        res.status(200).send({
            admin,
            token,
            username: person.username
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

//Login
router.post("/login", async(req, res) => {
    try {
        const person = await Person.findByCredentials(
            req.body.username,
            req.body.password
        )
        const token = await person.generateAuthToken()
        let isUser
        let user

        if(person.user) {
            isUser = true
            user = await User.findById(person.user)
        } else {
            isUser = false
            user = await Admin.findById(person.admin)
        }

        res.status(200).send({
            user,
            token,
            isUser,
            username: person.username
        })
    } catch (e) {
        res.status(e.message ? 401 : 500).send(e.message)
    }
})

//Logout
router.post('/logout', auth, async(req, res) => {
    try {
        req.person.tokens = req.person.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.person.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

//Logout from all devices
router.post('/logoutAll', auth, async(req, res) => {
    try {
        req.person.tokens = []

        await req.person.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router