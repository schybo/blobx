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
      async (parent, { text }, { models, me }) => {
        return await models.Finance.create({
          text,
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
    )
  },
  Finance: {
    user: async (finance, args, { models }) => {
      return await models.User.findByPk(finance.userId);
    }
  }
};
