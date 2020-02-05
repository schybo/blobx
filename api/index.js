require("dotenv").config();

const { ApolloServer, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
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

const getMe = async req => {
  const token = req.headers["x-token"];
  if (token && req.body.operationName != "SignIn") {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

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
  context: async ({ req }) => {
    const me = await getMe(req);
    console.log("MODELLSS");
    console.log(models);
    return {
      models,
      me,
      secret: process.env.SECRET
    };
  },
  engine: {
    apiKey: process.env.ENGINE_API_KEY,
    schemaTag: process.env.NODE_ENV
  }
});

const eraseDatabaseOnSync = false;
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

