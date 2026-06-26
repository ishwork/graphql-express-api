import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { ruruHTML } from "ruru/server";
import { root } from "./resolvers";
import { schema } from "./schema";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

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
