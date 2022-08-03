import "dotenv/config";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { ApolloServer } from "apollo-server";
import { existsSync, readdirSync, readFileSync } from "fs";
import resolvers from "./resolvers/Resolver";

// Get token :
const tokenFile = `${__dirname}/../resources/token.txt`;

if (!existsSync(tokenFile)) throw new Error("No token found, generate the token with \"npm run gen-token\" command");

const secretToken = readFileSync(tokenFile, { encoding: "utf8" });

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

        if (token !== secretToken) throw new Error("Invalid token in authorization header");
    },

    typeDefs: schemas,
    resolvers,
    csrfPrevention: true
});

server.listen({ port: process.env.PORT_API ?? 3000 }).then(serverInfo => {
    console.log(`Server started, listen at port ${serverInfo.port}...`);
});