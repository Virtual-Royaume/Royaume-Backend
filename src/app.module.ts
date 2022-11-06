import { GraphQLMainModule } from "$graphql/graphql.module";
import { getStringEnv } from "$utils/env-variable";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypegooseModule } from "@m8a/nestjs-typegoose";

@Module({
  imports: [
    // Load environment variables :
    ConfigModule.forRoot(),

    // Connect to MongoDB :
    TypegooseModule.forRoot(getStringEnv("MONGO_LINK"), {
      dbName: "royaume"
    }),

    // GraphQL setup :
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true
    }),

    // GraphQL main module :
    GraphQLMainModule
  ]
})
export class AppModule {}