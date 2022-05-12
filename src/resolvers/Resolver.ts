import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "../interfaces/GraphQL.js";
import { getDateWithoutTime } from "../utils/Date.js";
import Mutation from "./Mutation.js";
import Query from "./Query.js";

const resolvers: Resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date without time",

    serialize(value){
      return getDateWithoutTime((value as Date)).getTime();
    },
    parseValue(value){
      return getDateWithoutTime(new Date(value as string));
    },
    parseLiteral(ast){
      return ast.kind === Kind.STRING ? getDateWithoutTime(new Date(ast.value)) : null;
    }
  }),
  Query, Mutation
}

export default resolvers;