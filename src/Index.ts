import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchema } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import { readdirSync } from "fs";
import path from "path";
import resolvers from "./resolvers/Resolver.js";
import secret from "../resources/auth/secret.json" assert { type: "json" };

// Load tasks :
readdirSync(path.resolve() + "/src/tasks").forEach(
    (file) => import(`./tasks/${file.substring(0, file.length - 3)}.js`)
);

// Create and start the server :
const schemas = await loadSchema(
    path.resolve() + "/resources/graphql/**/*.gql",
    {
        loaders: [new GraphQLFileLoader()]
    }
);

const server = new ApolloServer({
    context: ({ req }) => {
        const token = req.headers.authorization || "";

        if (token !== secret.token) throw new Error("Invalid token in authorization header");
    },
    typeDefs: schemas,
    resolvers,
    csrfPrevention: true
});

const port = 3006;

await server.listen({ port: port });
console.log(`Server started, listen at port ${port}...`);