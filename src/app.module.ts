import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypegooseModule } from "@m8a/nestjs-typegoose";
import { APIModule } from "#/api/api.module";
import { environmentVariable } from "#/config/environment-variable";

@Module({
  imports: [
    // Load environment variables :
    ConfigModule.forRoot(),

    // Connect to MongoDB :
    TypegooseModule.forRoot(environmentVariable().mongoUrl, {
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