import type { ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { GraphQLAPIModule } from "#/graphql/graphql.module";
import { DatabaseModule } from "./database";

@Module({
  imports: [
    // GraphQL setup:
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),

    // Database services:
    DatabaseModule,

    // GraphQL API module:
    GraphQLAPIModule
  ]
})
export class AppModule {}