import { GraphQLScalarType, Kind } from "graphql";
import { Resolvers } from "$core/interfaces/ServerSchema";
import { getDateWithoutTime } from "$core/utils/Date";
import { DayJS } from "$core/utils/DayJS";

export const date: Resolvers["Date"] = new GraphQLScalarType({
  name: "Date",
  description: "Date without time",

  serialize(value) {
    return getDateWithoutTime(DayJS(value as Date)).valueOf();
  },
  parseValue(value) {
    return getDateWithoutTime(DayJS(Number(value)));
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT || ast.kind === Kind.FLOAT) return getDateWithoutTime(DayJS(Number(ast.value)));
    return null;
  }
});