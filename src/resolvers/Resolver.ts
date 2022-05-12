import { Resolvers } from "../interfaces/GraphQL.js";
import Mutation from "./Mutation.js";
import Query from "./Query.js";

const resolvers: Resolvers = {
  Query, Mutation
}

export default resolvers;