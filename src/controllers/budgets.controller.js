const Io = require('../utils/io');

const budgetsDB = new Io(`${process.cwd()}/database/budgets.json`);
const Budget = require('../models/budget.model');

const create = async (req, res) => {
    try {
        const { category, type, amount } = req.body;
        const budgets = await budgetsDB.read();

        let time = new Date().toLocaleString();
        let totalBalance = 0;

        let personalBudget = budgets.filter(budget => budget.userID == req.user.id);
        if (personalBudget.length > 0) {
            totalBalance = personalBudget[personalBudget.length - 1].totalBalance;
        }

        if (type === 'expense') {
            totalBalance -= Number(amount);
        } else {
            totalBalance += Number(amount);
        }

        let newBudget = new Budget(category, type, amount, req.user.id, time, totalBalance);
        budgets.push(newBudget);
        await budgetsDB.write(budgets);
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
        console.log(error);
    }
};


const edit = async (req, res) => {
    const { id } = req.params;
    const { category, type, amount } = req.body;

    const budgets = await budgetsDB.read();
    let findBudget = budgets.find((el) => el.id == id);

    if (!findBudget) {
        return res.status(404).json({ message: "Budget not found" });
    }

    const originalAmount = Number(findBudget.amount);
    const newAmount = Number(amount);
    let difference;

    if (findBudget.type === 'expense') {
        difference = originalAmount - newAmount; 
    } else {
        difference = newAmount - originalAmount; 
    }

    if (findBudget.type === 'expense') {
        findBudget.totalBalance += difference; 
    } else {
        findBudget.totalBalance -= difference; 
    }

    findBudget.category = category;
    findBudget.type = type;
    findBudget.amount = amount;

    if (findBudget.type !== type) {
        if (type === 'expense') {
            findBudget.totalBalance -= newAmount; 
        } else {
            findBudget.totalBalance += newAmount; 
        }
    }

    await budgetsDB.write(budgets);
    res.redirect('/');
};



const remove = async (req, res) => {
    const { id } = req.params;

    let budgets = await budgetsDB.read();
    let findBudget = budgets.find(el => el.id == id);

    if (!findBudget) {
        return res.status(404).json({ message: "Budget not found" });
    }

    if (findBudget.type === 'expense') {
        findBudget.totalBalance += Number(findBudget.amount); 
    } else {
        findBudget.totalBalance -= Number(findBudget.amount); 
    }

    budgets = budgets.filter(el => el.id !== id);
    await budgetsDB.write(budgets);
    res.redirect('/');
};


module.exports = {
    create,
    edit,
    remove,
};