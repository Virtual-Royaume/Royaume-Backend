import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";

@Module({
  imports: [
    // Environment variables :
    ConfigModule.forRoot(),

    // Connect to MongoDB :
    TypegooseModule.forRoot(getStringEnv("MONGO_LINK"), {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore : typing problem
      dbName: "royaume"
    }),

    // GraphQL setup :
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true
    })
  ]
})
export class AppModule {}