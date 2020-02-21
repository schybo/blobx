const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: true
  }
});

const models = {
  User: sequelize.import("./user"),
  Finance: sequelize.import("./finance"),
  FinanceCategory: sequelize.import("./financeCategory")
};
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  models
};
