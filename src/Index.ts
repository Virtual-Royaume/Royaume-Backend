import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import path from "path";
import resolvers from "./resolvers/Resolver.js";

// Create and start the server :
const schemas = await loadSchema(path.resolve() + "/resources/graphql/**/*.gql", {
  loaders: [new GraphQLFileLoader()]
});

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers, csrfPrevention: true
});

await server.listen({ port: 3000 });
console.log("Server started, listen at port 3000...");