const userResolvers = require("./user");
const messageResolvers = require("./messages");
const financeResolvers = require("./finances");
module.exports = [userResolvers, messageResolvers, financeResolvers];
