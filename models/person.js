const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const personSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
    },
    admin:{
        type: mongoose.Schema.Types.ObjectId,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
}, {
    timestamps: true,
})

personSchema.methods.generateAuthToken = async function () {
    const person = this;
    const token = jwt.sign({ _id: person._id.toString()}, process.env.secret_key);
    person.tokens = person.tokens.concat({ token });
    await person.save();
    return token;
};

personSchema.statics.findByCredentials = async (username, password) => {
    const person = await Person.findOne({
        username
    })

    if(!person) {
        throw new Error("Username not found. Sign up instead.");
    }

    const isMatch = await bcrypt.compare(password, person.password);

    if(!isMatch) {
        throw new Error("Wrong username or password");
    }

    return person;

}

personSchema.pre("save", async function (next) {
    const person = this

    if(person.isModified("password")) {
        person.password = await bcrypt.hash(person.password, 8);
    }

    next()
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person