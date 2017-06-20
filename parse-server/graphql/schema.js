import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Parse from 'parse/node';

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A simple user',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (obj) => obj.id
    },
    username: {
      type: GraphQLString,
      description: 'The username of the user.',
      resolve: (obj) => obj.get('username')
    },
    emailVerified: {
      type: GraphQLBoolean,
      description: 'Define if the user has validate his email.',
      resolve: (obj) => obj.get('emailVerified')
    },
    updatedAt: {
      type: GraphQLString,
      description: 'Last time user update data changes.',
      resolve: (obj) => obj.get('updatedAt').toString()
    },
    createdAt: {
      type: GraphQLString,
      description: 'Date when the user was created',
      resolve: (obj) => obj.get('createdAt').toString()
    }
  })
});

const user = {
  type: userType,
  args: {
    id: {
      description: 'The id of the user',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (root, { id }) => {
    return new Parse.Query(Parse.User).equalTo("objectId", id).first()
  }
}

const users = {
  type: new GraphQLList(userType),
  resolve: (root) => {
    return new Parse.Query(Parse.User).find()
  }
}


const createUser = {
  type: userType,
  description: 'Create a new user',
  args: {
    username: {
      type: GraphQLString,
      description: 'The username of the user.',
    },
    email: {
      type: GraphQLString,
      description: 'The email adress of the user.',
    },
    password: {
      type: GraphQLString,
      description: 'The password of the user.',
    }
  },
  resolve: (value, { username, email, password }) => {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    return user.signUp();
  }
}

var queryType = new GraphQLObjectType({
  name: "queries",
  description: "All Queries",
  fields: () => ({
    // Queries goes here
    user,
    users
  })
});
var mutationType = new GraphQLObjectType({
  name: "mutation",
  description: "All mutation",
  fields: () => ({
    // Mutations goes here
    createUser
  })
});

export default new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});