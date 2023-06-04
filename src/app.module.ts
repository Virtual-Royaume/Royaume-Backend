import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { APIModule } from "#/api/api.module";

@Module({
  imports: [
    // GraphQL setup:
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),

    // API module:
    APIModule
  ]
})
export class AppModule {}