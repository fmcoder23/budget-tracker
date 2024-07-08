const {v4:uuid} = require('uuid');

class Budget {
    constructor(category, type, amount, userID, time, totalBalance) {
        this.id = uuid();
        this.category = category;
        this.type = type;
        this.amount = amount;
        this.userID = userID;
        this.time = time;
        this.totalBalance = totalBalance;
    }

    balanceUp() {
        this.totalBalance += Number(this.amount);
    }
    balanceDown() {
        this.totalBalance -= Number(this.amount);
    }
}

module.exports = Budget;