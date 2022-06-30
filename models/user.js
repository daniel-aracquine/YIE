const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },

    //other details can be stored here
})

const User = mongoose.model("User",userSchema)

module.exports = User