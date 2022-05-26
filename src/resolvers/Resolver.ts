import { Resolvers } from "../interfaces/ServerSchema.js";
import Mutation from "./Mutation.js";
import Query from "./Query.js";
import { date } from "./Scalar.js";

const resolvers: Resolvers = {
    Date: date,
    Query,
    Mutation
};

export default resolvers;