import express from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { books, users } from "./data";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

const schema = buildSchema(`
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
`);

const root = {
  users: () => users.map((user) => ({ ...user, books: books.filter((book) => book.userId === user.id) })),
  books: () => books.map((book) => ({ ...book, user: users.find((user) => user.id === book.userId) })),
  user: ({ id }: { id: string }) => {
    const user = users.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return {
      ...user,
      books: books.filter((book) => book.userId === user.id)
    };
  },
  book: ({ id }: { id: string }) => {
    const book = books.find((item) => item.id === id);

    if (!book) {
      return null;
    }

    return {
      ...book,
      user: users.find((user) => user.id === book.userId)
    };
  },
  createUser: ({ input }: { input: { name: string; email: string } }) => {
    const user = {
      id: String(users.length + 1),
      name: input.name,
      email: input.email
    };

    users.push(user);

    return {
      ...user,
      books: []
    };
  }
};

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.use(
  "/graphql",
  createHandler({
    schema,
    rootValue: root
  })
);

app.listen(port, () => {
  console.log(`GraphQL endpoint ready at http://localhost:${port}/graphql`);
});
