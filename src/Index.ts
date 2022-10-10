import "dotenv/config";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import { readdirSync } from "fs";
import { resolvers } from "$core/resolvers/Resolver";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

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

        if (token !== process.env.API_TOKEN) throw new Error("Invalid token in authorization header");
    },

    typeDefs: schemas,
    resolvers,
    cache: "bounded",
    csrfPrevention: true,
    plugins: [ApolloServerPluginLandingPageLocalDefault]
});

server.listen({ url: "0.0.0.0", port: process.env.PORT ?? 3000 }).then(serverInfo => {
    console.log(`Server started, listen at port ${serverInfo.port}...`);
});