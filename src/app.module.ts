import { getStringEnv } from "$utils/env-variable";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { APIModule } from "$api/api.module";

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

    // API module :
    APIModule
  ]
})
export class AppModule {}