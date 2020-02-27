const { models } = require("../models");

const createFixtureUsers = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "hello@robin.com",
      password: "rwieruch",
      role: "ADMIN",
    }
  );
  await models.User.create(
    {
      username: "schybo",
      email: "brent.scheibelhut@gmail.com",
      firstName: "Brent",
      password: "test1234",
      role: "ADMIN",
      finances: [
        {
          title: 'Rent',
          amount: 1000,
          currency: 'CAD',
          type: 'debit',
          timespan: 'month',
          active: true,
          tracked: false
        },
        {
          title: 'Savings',
          amount: 2000,
          currency: 'CAD',
          type: 'savings',
          timespan: 'month',
          active: true,
          tracked: false
        },
        {
          title: 'Income',
          amount: 7000,
          currency: 'CAD',
          type: 'credit',
          timespan: 'month',
          active: true,
          tracked: false
        },
        {
          title: 'Utilities',
          amount: 52,
          currency: 'CAD',
          type: 'debit',
          timespan: 'month',
          active: true,
          tracked: false
        }
      ]
    },
    {
      include: [models.Finance]
    }
  );
  await models.User.create(
    {
      username: "ddavids",
      email: "hello@david.com",
      password: "ddavids",
    }
  );
};

module.exports = createFixtureUsers;
