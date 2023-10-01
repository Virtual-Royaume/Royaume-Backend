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
    return getDateWithoutTime(DayJS(value as string));
  },
  parseLiteral(ast) {
    return ast.kind === Kind.STRING
      ? getDateWithoutTime(DayJS(Number(ast.value)))
      : null;
  }
});