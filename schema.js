const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLSchema,
} = require('graphql');
const axios = require('axios');

// Joke at all categories
const AnyJoke = new GraphQLObjectType({
  name: 'randomJoke',
  fields: () => ({
    value: { type: GraphQLString },
  }),
});

// Random joke at given Category

const categoryJoke = new GraphQLObjectType({
  name: 'randomCategoryJoke',
  fields: () => ({
    category: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

//   Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    random: {
      type: AnyJoke,
      args: {
        value: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(`https://api.chucknorris.io/jokes/random`)
          .then((res) => res.data);
      },
    },
    randomByCategory: {
      type: categoryJoke,
      args: {
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.chucknorris.io/jokes/random?category=${args.category}`
          )
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
