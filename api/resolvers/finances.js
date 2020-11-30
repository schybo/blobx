const { UserInputError } = require("apollo-server");
const { combineResolvers } = require("graphql-resolvers");
const { isAuthenticated, isFinanceOwner, isAdmin } = require("./authorization");

module.exports = {
  Query: {
    finances: combineResolvers(
      isAuthenticated,
      isAdmin,
      async (parent, args, { models }) => {
        return await models.Finance.findAll();
      }
    ),
    finance: combineResolvers(
      isAuthenticated,
      isFinanceOwner,
      async (parent, { id }, { models }) => {
        return await models.Finance.findByPk(id);
      }
    )
  },
  Mutation: {
    createFinance: combineResolvers(
      isAuthenticated,
      async (parent, { finance }, { models, me }) => {
        return await models.Finance.create({
          ...finance,
          userId: me.id
        });
      }
    ),
    deleteFinance: combineResolvers(
      isAuthenticated,
      isFinanceOwner,
      async (parent, { id }, { models }) => {
        return await models.Finance.destroy({ where: { id } });
      }
    ),
    updateFinance: combineResolvers(
      isAuthenticated,
      isFinanceOwner,
      async (parent, { finance }, { models, me }) => {
        try {
          console.log(finance)
          result = await models.Finance.update(
            { ...finance },
            {
              where: { id: finance.id },
              returning: true
            }
          )
          return result[1][0].dataValues
        } catch (err) {
          throw new UserInputError("Update of finance information failed.");
        }
      }
    )
  },
  Finance: {
    user: async (finance, args, { models }) => {
      return await models.User.findByPk(finance.userId);
    }
  }
};
