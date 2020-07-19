import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLDateTime } from 'graphql-iso-date';
import serviceLocator from '../../libs/di';
import { UserService } from '.';

const userService = serviceLocator.get<UserService>('UserService');

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'The user schema',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLDateTime },
    updatedAt: { type: GraphQLDateTime },
  }),
});

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'User Input schema',
  fields: () => ({
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export default {
  users: {
    type: new GraphQLList(UserType),
    resolve: async () => userService.findAll(),
  },
};

export const mutations = () => ({
  createUser: {
    type: UserType,
    description: 'Create user mutation',
    resolve: async () => {
      userService.createUser({ firstName: 'kelly' });
    },
  },
});
