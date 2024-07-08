const bcrypt = require('bcrypt');
const Io = require('../utils/io');

const usersDB = new Io(`${process.cwd()}/database/users.json`);

const edit = async(req, res) => {
    try {
        const {id} = req.params;
        const {password} = req.body;

        const users = await usersDB.read();
        const findUser = users.find((el) => el.id == id);
        findUser.password = await bcrypt.hashSync(password, 12);
        await usersDB.write(users);
        res.clearCookie("token");
        res.render('users', {users});

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}

const remove = async(req, res) => {
    try {
        const {id} = req.params;
        let users = await usersDB.read();
        users = users.filter(el => el.id !== id);
        await usersDB.write(users);
        res.clearCookie("token");
        res.render('users', {users});

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
}


module.exports = {
    edit,
    remove,
}