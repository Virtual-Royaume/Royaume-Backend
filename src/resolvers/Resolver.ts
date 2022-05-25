import { Resolvers } from "../interfaces/ServerSchema.js";
import Mutation from "./mutations/Index.js";
import Query from "./queries/Index.js";
import { date } from "./Scalar.js";

const resolvers: Resolvers = {
  Date: date,
  Query,
  Mutation,
};

export default resolvers;
