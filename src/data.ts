export type User = {
  id: string;
  name: string;
  email: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  userId: string;
};

export const users: User[] = [
  { id: "1", name: "Alice", email: "alice@example.com" },
  { id: "2", name: "Bob", email: "bob@example.com" },
  { id: "3", name: "Charlie", email: "charlie@example.com" }
];

export const books: Book[] = [
  { id: "101", title: "GraphQL Basics", author: "John Doe", userId: "1" },
  { id: "102", title: "Node.js in Action", author: "Jane Smith", userId: "2" },
  { id: "103", title: "TypeScript Essentials", author: "Alex Johnson", userId: "1" }
];
