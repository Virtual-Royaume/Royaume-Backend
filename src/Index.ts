import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import path from "path";
import memberCollection from "./database/collections/Member";

const resolvers = {
  Query: {
    members: async () => await memberCollection.find().toArray()
  }
}

// Create and start the server :
const server = new ApolloServer({
  typeDefs: readFileSync(path.resolve() + "/resources/schema.gql", { encoding: "utf8" }),
  resolvers,
  csrfPrevention: true
});

await server.listen({ port: 3000 });
console.log("Server started, listen at port 3000...");