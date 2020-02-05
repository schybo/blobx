const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "hello@robin.com",
      password: "rwieruch",
      role: "ADMIN",
      messages: [
        {
          text: "Published the Road to learn React"
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
  await models.User.create(
    {
      username: "schybo",
      email: "brent.scheibelhut@gmail.com",
      firstName: "Brent",
      password: "test1234",
      role: "ADMIN",
      messages: [
        {
          text: "Blah Blah Blah"
        }
      ],
      finance: {
        rent: 1000,
        savings: 2000,
        income: 7000,
        utilities: 52,
        timespan: 'year'
      }
    },
    {
      include: [models.Message, models.Finance]
    }
  );
  await models.User.create(
    {
      username: "ddavids",
      email: "hello@david.com",
      password: "ddavids",
      messages: [
        {
          text: "Happy to release ..."
        },
        {
          text: "Published a complete ..."
        }
      ]
    },
    {
      include: [models.Message]
    }
  );
};

export default createUsersWithMessages
