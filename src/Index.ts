import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import resolvers from "./resolvers/Resolver.js";

// Create and start the server :
const server = new ApolloServer({
  typeDefs: readFileSync(path.resolve() + "/resources/schema.gql", "utf-8"),
  resolvers, csrfPrevention: true
});

await server.listen({ port: 3000 });
console.log("Server started, listen at port 3000...");