require("dotenv").config();

const { ApolloServer } = require("apollo-server");
const schema = require("./schema");
const resolvers = require("./resolvers");
const { models, sequelize } = require("./models");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");
    return {
      ...error,
      message
    };
  },
  context: async () => ({
    models,
    me: await models.User.findByLogin("rwieruch"),
    secret: process.env.SERVER_SECRET
  }),
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: process.env.NODE_ENV
  }
});

const eraseDatabaseOnSync = true;
// Creates the tables as necessary. May want to use migrations instead for production
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    createUsersWithMessages();
  }
  // The `listen` method launches a web server.
  server.listen({ port: process.env.SERVER_PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});

const createUsersWithMessages = async () => {
  await models.User.create(
    {
      username: "rwieruch",
      email: "hello@robin.com",
      password: "rwieruch",
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
