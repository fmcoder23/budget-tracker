const Io = require('../utils/io');
const usersDB = new Io(`${process.cwd()}/database/users.json`);
const budgetsDB = new Io(`${process.cwd()}/database/budgets.json`);

const homePage = async (req, res) => {
    let users = await usersDB.read();
    let budgets = await budgetsDB.read();
    let findUser = users.find((el) => el.id == req.user.id);

    let personalBudget = budgets.filter(budget => budget.userID == req.user.id);

    let totalBalance = 0;
    if (personalBudget.length > 0) {
        personalBudget.forEach(budget => {
            if (budget.type === 'income') {
                totalBalance += Number(budget.amount);
            } else if (budget.type === 'expense') {
                totalBalance -= Number(budget.amount);
            }
        });
    }

    let groupedBudgets = {};
    for (let i = 0; i < personalBudget.length; i++) {
        let budget = personalBudget[i];
        if (!groupedBudgets[budget.category]) {
            groupedBudgets[budget.category] = {
                category: budget.category,
                transactions: []
            };
        }
        groupedBudgets[budget.category].transactions.push(budget);
    }

    let categories = [];
    for (let i = 0; i < personalBudget.length; i++) {
        if (!categories.includes(personalBudget[i].category)) {
            categories.push(personalBudget[i].category);
        }
    }
    console.log(categories);

    res.render('index', { findUser, groupedBudgets, totalBalance, categories, personalBudget });
};


const loginPage = (req, res) => {
    res.render('login');
};

const registerPage = (req, res) => {
    res.render('register');
};

const usersPage = async (req, res) => {
    const users = await usersDB.read();
    res.render('users', {users});
};

module.exports = {
    homePage,
    loginPage,
    registerPage,
    usersPage,
};
