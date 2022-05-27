import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import { readdirSync } from "fs";
import resolvers from "./resolvers/Resolver";
import secret from "../resources/auth/secret.json";

// Load tasks :
readdirSync(`${__dirname}/tasks`).forEach(
    (file) => import(`./tasks/${file.substring(0, file.length - 3)}`)
);

// Create and start the server :
const schemas = loadSchemaSync(
    `${__dirname}/../resources/graphql/**/*.gql`,
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

server.listen({ port: 3006 }).then(serverInfo => {
    console.log(`Server started, listen at port ${serverInfo.port}...`);
});