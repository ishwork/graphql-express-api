# GraphQL API

A simple GraphQL endpoint built with Node.js, Express, and GraphQL.

## Setup

```bash
npm install
```

## Run in development (with nodemon)

```bash
npm run dev
```

Server starts at:

- `http://localhost:4000`
- GraphQL endpoint: `http://localhost:4000/graphql`

## Run in production mode

```bash
npm start
```

## Test the GraphQL endpoint

### Option 1: cURL

```bash
curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ users { id name email books { id title author } } }"}'
```

### Option 2: Postman

- Method: `POST`
- URL: `http://localhost:4000/graphql`
- Header: `Content-Type: application/json`
- Body (raw JSON):

```json
{
  "query": "{ books { id title author user { id name email } } }"
}
```

### Option 3: GraphiQL (Browser UI)

Open your browser and go to:

```
http://localhost:4000/
```

You'll see the GraphiQL interface — an in-browser IDE with autocomplete and syntax highlighting. Type your query and hit the **Play (▶)** button to run it.

Example queries to try:

```graphql
# Get all users with their books
{
  users {
    id
    name
    email
    books {
      title
    }
  }
}
```

```graphql
# Get a single user by ID
{
  user(id: "1") {
    name
    email
    books {
      title
    }
  }
}
```

## Sample Data

Sample users and books are defined in `src/data.ts`.

### Resources

- [Running an Express GraphQL Server](https://www.graphql-js.org/docs/running-an-express-graphql-server/)
- [Ruru](https://github.com/graphql/graphiql/tree/main/packages/ruru) — in-browser GraphQL IDE (served at `/`)
