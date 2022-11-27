import { Module } from "@nestjs/common";
import { GraphQLMainModule } from "./graphql/graphql.module";
import { RestModule } from "./rest/rest.module";

@Module({
  imports: [GraphQLMainModule, RestModule]
})
export class APIModule {}