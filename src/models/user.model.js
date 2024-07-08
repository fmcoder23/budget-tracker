const bcrypt = require('bcrypt');
const {v4:uuid} = require('uuid');

class User {
    constructor(fullname, phone, password, photo) {
        this.id = uuid();
        this.fullname = fullname;
        this.phone = phone;
        this.password = bcrypt.hashSync(password, 12);
        this.photo = photo;
    }
}

module.exports = User;