const { ForbiddenError } = require("apollo-server");
const { combineResolvers, skip } = require("graphql-resolvers");
const isAuthenticated = (parent, args, { me }) =>
  me ? skip : new ForbiddenError("Not authenticated as user.");

const isAdmin = combineResolvers(
  isAuthenticated,
  (parent, args, { me: { role } }) =>
    role === "ADMIN" ? skip : new ForbiddenError("Not authorized as admin.")
);

const isMessageOwner = async (parent, { id }, { models, me }) => {
  const message = await models.Message.findByPk(id, { raw: true });
  if (message.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }
  return skip;
};

const isFinanceOwner = async (parent, args, { models, me }) => {
  console.log(models);
  console.log(me);
  const finance = await models.Finance.findOne({
    where: {userId: me.id},
    raw: true
  })
  if (finance.userId !== me.id) {
    throw new ForbiddenError("Not authenticated as owner.");
  }
  return skip;
};

module.exports = { isAuthenticated, isAdmin, isMessageOwner, isFinanceOwner };
