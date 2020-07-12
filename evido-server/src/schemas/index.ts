import { userQuery } from '../modules/user';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    ...userQuery,
  },
});

export default new GraphQLSchema({ query });
