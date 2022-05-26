import {
    GraphQLResolveInfo,
    GraphQLScalarType,
    GraphQLScalarTypeConfig
} from "graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ChannelMessageCount = {
  __typename?: "ChannelMessageCount";
  channelId: Scalars["String"];
  messageCount: Scalars["Int"];
};

export type DiscordActivity = {
  __typename?: "DiscordActivity";
  messages: DiscordMessageActivity;
  voiceMinute: Scalars["Int"];
};

export type DiscordMessageActivity = {
  __typename?: "DiscordMessageActivity";
  monthCount: Scalars["Int"];
  perChannel: Array<Maybe<ChannelMessageCount>>;
  totalCount: Scalars["Int"];
};

export type MainChannel = {
  __typename?: "MainChannel";
  category: Scalars["String"];
  channelId: Scalars["ID"];
};

export type MainRole = {
  __typename?: "MainRole";
  category: Scalars["String"];
  roleId: Scalars["ID"];
};

export type Member = {
  __typename?: "Member";
  _id: Scalars["String"];
  activity: DiscordActivity;
  isOnServer: Scalars["Boolean"];
  profilePicture: Scalars["String"];
  username: Scalars["String"];
};

export type MemberInput = {
  isOnServer?: InputMaybe<Scalars["Boolean"]>;
  profilePicture?: InputMaybe<Scalars["String"]>;
  username?: InputMaybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addChannel: Scalars["Boolean"];
  addRole: Scalars["Boolean"];
  createMember?: Maybe<Member>;
  incMemberDiscordActivityChannel: Scalars["Boolean"];
  incMemberDiscordVoiceMinute: Scalars["Boolean"];
  removeChannel: Scalars["Boolean"];
  removeRole: Scalars["Boolean"];
  setServerActivityMemberCount: Scalars["Boolean"];
  updateMember: Scalars["Boolean"];
};

export type MutationAddChannelArgs = {
  category: Scalars["String"];
  channelId: Scalars["ID"];
};

export type MutationAddRoleArgs = {
  category: Scalars["String"];
  roleId: Scalars["ID"];
};

export type MutationCreateMemberArgs = {
  id: Scalars["ID"];
  isOnServer?: InputMaybe<Scalars["Boolean"]>;
  profilePicture: Scalars["String"];
  username: Scalars["String"];
};

export type MutationIncMemberDiscordActivityChannelArgs = {
  channelId: Scalars["ID"];
  id: Scalars["ID"];
};

export type MutationIncMemberDiscordVoiceMinuteArgs = {
  id: Scalars["ID"];
};

export type MutationRemoveChannelArgs = {
  channelId: Scalars["ID"];
};

export type MutationRemoveRoleArgs = {
  roleId: Scalars["ID"];
};

export type MutationSetServerActivityMemberCountArgs = {
  count: Scalars["Int"];
};

export type MutationUpdateMemberArgs = {
  id: Scalars["ID"];
  input: MemberInput;
};

export type Query = {
  __typename?: "Query";
  channels?: Maybe<Array<Maybe<MainChannel>>>;
  member?: Maybe<Member>;
  members: Array<Maybe<Member>>;
  roles?: Maybe<Array<Maybe<MainRole>>>;
  serverActivity: Array<Maybe<ServerActivity>>;
  todayServerActivity: ServerActivity;
};

export type QueryMemberArgs = {
  id: Scalars["ID"];
};

export type QueryServerActivityArgs = {
  historyCount: Scalars["Int"];
};

export type ServerActivity = {
  __typename?: "ServerActivity";
  date: Scalars["Date"];
  memberCount: Scalars["Int"];
  messageCount: Scalars["Int"];
  voiceMinute: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  ChannelMessageCount: ResolverTypeWrapper<ChannelMessageCount>;
  Date: ResolverTypeWrapper<Scalars["Date"]>;
  DiscordActivity: ResolverTypeWrapper<DiscordActivity>;
  DiscordMessageActivity: ResolverTypeWrapper<DiscordMessageActivity>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  MainChannel: ResolverTypeWrapper<MainChannel>;
  MainRole: ResolverTypeWrapper<MainRole>;
  Member: ResolverTypeWrapper<Member>;
  MemberInput: MemberInput;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  ServerActivity: ResolverTypeWrapper<ServerActivity>;
  String: ResolverTypeWrapper<Scalars["String"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  ChannelMessageCount: ChannelMessageCount;
  Date: Scalars["Date"];
  DiscordActivity: DiscordActivity;
  DiscordMessageActivity: DiscordMessageActivity;
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  MainChannel: MainChannel;
  MainRole: MainRole;
  Member: Member;
  MemberInput: MemberInput;
  Mutation: {};
  Query: {};
  ServerActivity: ServerActivity;
  String: Scalars["String"];
};

export type ChannelMessageCountResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ChannelMessageCount"] = ResolversParentTypes["ChannelMessageCount"]
> = {
  channelId?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  messageCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes["Date"], any> {
  name: "Date";
}

export type DiscordActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DiscordActivity"] = ResolversParentTypes["DiscordActivity"]
> = {
  messages?: Resolver<
    ResolversTypes["DiscordMessageActivity"],
    ParentType,
    ContextType
  >;
  voiceMinute?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiscordMessageActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["DiscordMessageActivity"] = ResolversParentTypes["DiscordMessageActivity"]
> = {
  monthCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  perChannel?: Resolver<
    Array<Maybe<ResolversTypes["ChannelMessageCount"]>>,
    ParentType,
    ContextType
  >;
  totalCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MainChannelResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MainChannel"] = ResolversParentTypes["MainChannel"]
> = {
  category?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  channelId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MainRoleResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["MainRole"] = ResolversParentTypes["MainRole"]
> = {
  category?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MemberResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Member"] = ResolversParentTypes["Member"]
> = {
  _id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  activity?: Resolver<
    ResolversTypes["DiscordActivity"],
    ParentType,
    ContextType
  >;
  isOnServer?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  profilePicture?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  addChannel?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationAddChannelArgs, "category" | "channelId">
  >;
  addRole?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationAddRoleArgs, "category" | "roleId">
  >;
  createMember?: Resolver<
    Maybe<ResolversTypes["Member"]>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateMemberArgs, "id" | "profilePicture" | "username">
  >;
  incMemberDiscordActivityChannel?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<
      MutationIncMemberDiscordActivityChannelArgs,
      "channelId" | "id"
    >
  >;
  incMemberDiscordVoiceMinute?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationIncMemberDiscordVoiceMinuteArgs, "id">
  >;
  removeChannel?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveChannelArgs, "channelId">
  >;
  removeRole?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationRemoveRoleArgs, "roleId">
  >;
  setServerActivityMemberCount?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationSetServerActivityMemberCountArgs, "count">
  >;
  updateMember?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateMemberArgs, "id" | "input">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  channels?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MainChannel"]>>>,
    ParentType,
    ContextType
  >;
  member?: Resolver<
    Maybe<ResolversTypes["Member"]>,
    ParentType,
    ContextType,
    RequireFields<QueryMemberArgs, "id">
  >;
  members?: Resolver<
    Array<Maybe<ResolversTypes["Member"]>>,
    ParentType,
    ContextType
  >;
  roles?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["MainRole"]>>>,
    ParentType,
    ContextType
  >;
  serverActivity?: Resolver<
    Array<Maybe<ResolversTypes["ServerActivity"]>>,
    ParentType,
    ContextType,
    RequireFields<QueryServerActivityArgs, "historyCount">
  >;
  todayServerActivity?: Resolver<
    ResolversTypes["ServerActivity"],
    ParentType,
    ContextType
  >;
};

export type ServerActivityResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ServerActivity"] = ResolversParentTypes["ServerActivity"]
> = {
  date?: Resolver<ResolversTypes["Date"], ParentType, ContextType>;
  memberCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  messageCount?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  voiceMinute?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  ChannelMessageCount?: ChannelMessageCountResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DiscordActivity?: DiscordActivityResolvers<ContextType>;
  DiscordMessageActivity?: DiscordMessageActivityResolvers<ContextType>;
  MainChannel?: MainChannelResolvers<ContextType>;
  MainRole?: MainRoleResolvers<ContextType>;
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  ServerActivity?: ServerActivityResolvers<ContextType>;
};