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