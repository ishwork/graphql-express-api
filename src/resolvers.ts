import { books, users } from "./data";

const Query = {
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
  }
};

const Mutation = {
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

export const root = {
  ...Query,
  ...Mutation
};
