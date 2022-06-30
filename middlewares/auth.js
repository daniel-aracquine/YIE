const jwt = require('jsonwebtoken')
const Person = require('../models/person')
const User = require('../models/user')
const Admin = require('../models/admin')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')

        if(!token) {
            throw new Error()
        }

        const decoded = jwt.verify(token, process.env.secret_key)
        const person  = await Person.findOne({
            _id:decoded._id, 
            'tokens.token': token
        })

        if(!person) {
            throw new Error()
        }

        req.token = token
        req.person = person

        if(person.user) {
            req.isUser = true
            const user = await User.findById(person.user)
            req.user = user
        } else {
            req.isUser = false
            const admin = await Admin.findById(person.admin)
            req.admin = admin
        }

        next()

    } catch (e) {
        res.status(404).send({
            error: 'Authentication Failed'
        })
    }
}

const adminAuth = async(req,res,next) => {
    try {
        if(req.isUser) {
            throw new Error
        }

        next()
    } catch (e) {
        res.status(404).send({
            error: 'You do not have permission for this.'
        })
    }
}

module.exports = {
    auth,
    adminAuth,
}