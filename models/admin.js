const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    //other details can be stored here
})

const Admin = mongoose.model("Admin",adminSchema)

module.exports = Admin