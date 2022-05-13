import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import { readdirSync } from "fs";
import path from "path";
import resolvers from "./resolvers/Resolver.js";

// Load tasks :
readdirSync(path.resolve() + "/src/tasks").forEach(file => import(`./tasks/${file.substring(0, file.length - 3)}.js`));

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