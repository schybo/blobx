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

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   # This "Book" type defines the queryable fields for every book in our data source.
//   type Book {
//     title: String
//     author: String
//   }

//   # The "Query" type is special: it lists all of the available queries that
//   # clients can execute, along with the return type for each. In this
//   # case, the "books" query returns an array of zero or more Books (defined above).
//   type Query {
//     books: [Book]
//   }
// `;

// const books = [
//   {
//     title: "Harry Potter and the Chamber of Secrets",
//     author: "J.K. Rowling"
//   },
//   {
//     title: "Jurassic Park",
//     author: "Michael Crichton"
//   }
// ];

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async () => ({
    models,
    me: await models.User.findByLogin("rwieruch")
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
