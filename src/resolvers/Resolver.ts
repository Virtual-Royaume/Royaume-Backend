import { Resolvers } from "../interfaces/GraphQL.js";
import Mutation from "./Mutation.js";
import Query from "./Query.js";
import { date } from "./Scalar.js";

const resolvers: Resolvers = {
  Date: date,
  Query,
  Mutation,
};

export default resolvers;
