const User = require("../models/user")
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Message = require("../models/message");

function generateAccessToken(id, email, name) {
    return jwt.sign({ userId: id, email: email, name: name }, "seiuhn3o4it8y34953n4v5o345");//secret key
}

exports.signupPage = async (req, res, next) => {
    const string = path.join(__dirname, '..', '/public', '/signUpPage.html');
    res.sendFile(string);
}


exports.signup = async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    const ExistingUser = await User.findOne({ where: { email: email } });
    if (ExistingUser) {
        console.log('User Already Exists');
        return res.json({ error: "User already exists", success: false });
    }

    try {
        bcrypt.hash(password, 10, async (err, hash) => {
            const isDataCreated = await User.create({ name, email, password: hash, phone })
            if (isDataCreated) {
                return res.status(201).json({ success: true });
            } else {
                throw new Error("User cannot be created");
            }
        });

    } catch (err) {
        return res.status(500).json({ error: "error in signing up" });
    }


};


exports.loginPage = async (req, res, next) => {
    const string = path.join(__dirname, '..', '/public', '/loginPage.html');
    res.sendFile(string);
}

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            res.json({ error: "User not found", code: 404 });
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = generateAccessToken(user.id, user.email, user.name);
                    console.log(token);
                    res.json({ message: "Password match", code: 200, token: token });
                } else {
                    res.json({ error: "Password doesn't match", code: 401 });
                }
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred while processing the request" });
    }
};

exports.getRoomPage = async (req,res) =>{
    const string = path.join(__dirname, '..', '/public', '/index.html');
    res.sendFile(string);
}