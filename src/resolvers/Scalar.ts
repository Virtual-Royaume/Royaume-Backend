import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../interfaces/ServerSchema.js";
import { getDateWithoutTime } from "../utils/Date.js";

export const date: Resolvers["Date"] = new GraphQLScalarType({
    name: "Date",
    description: "Date without time",

    serialize(value) {
        return getDateWithoutTime(value as Date).getTime();
    },
    parseValue(value) {
        return getDateWithoutTime(new Date(value as string));
    },
    parseLiteral(ast) {
        return ast.kind === Kind.STRING ? getDateWithoutTime(new Date(ast.value)) : null;
    }
});