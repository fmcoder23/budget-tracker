const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const path = require('path');

const Io = require('../utils/io');
const User = require('../models/user.model');
const { createToken } = require('../utils/jwt');

const usersDB = new Io(`${process.cwd()}/database/users.json`);


const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const users = await usersDB.read();
        const findUser = users.find((el) => el.phone == phone);

        if (!findUser) {
            return res.render("register");
        }

        const checkPassword = await bcrypt.compare(password, findUser.password);

        if (!checkPassword) {
            return res.render("login-failed");
        }

        const token = createToken({ id: findUser.id });
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 });

        res.redirect("/");


    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const register = async (req, res) => {
    try {
        const { fullname, phone, password } = req.body;
        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { photo } = req.files;

        const users = await usersDB.read();
        const findUser = users.find((el) => el.phone == phone);

        if (findUser) {
            return res.render("register-already");
        }

        const photoName = `${uuid()}${path.extname(photo.name)}`
        photo.mv(`${process.cwd()}/uploads/${photoName}`);

        const newUser = new User(fullname, phone, password, photoName);
        users.push(newUser);
        await usersDB.write(users);
        const token = createToken({ id: newUser.id });
        res.cookie("token", token, { maxAge: 1000 * 60 * 60 });
        return res.redirect("/");

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logout = async (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
}

module.exports = {
    login,
    register,
    logout
}