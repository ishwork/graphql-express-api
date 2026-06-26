import { buildSchema } from "graphql";

const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    books: [Book!]!
  }

  type Book {
    id: ID!
    title: String!
    author: String!
    user: User
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
    books: [Book!]!
    user(id: ID!): User
    book(id: ID!): Book
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;

export const schema = buildSchema(typeDefs);
