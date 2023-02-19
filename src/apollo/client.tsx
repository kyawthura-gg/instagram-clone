import React, { ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  TypePolicies,
} from "@apollo/client";
import { AuthOptions, AUTH_TYPE, createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import appSyncConfig from "../aws-exports";

const url = appSyncConfig.aws_appsync_graphqlEndpoint;

const region = appSyncConfig.aws_appsync_region;

const auth: AuthOptions = {
  type: appSyncConfig.aws_appsync_authenticationType as AUTH_TYPE.API_KEY,
  apiKey: appSyncConfig.aws_appsync_apiKey,
};

const httpLink = new HttpLink({ uri: url });

const link = ApolloLink.from([
  createAuthLink({ url, region, auth }),
  createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
]);

const mergeLists = (existing = { items: [] }, incoming = { items: [] }) => {
  return {
    ...existing,
    ...incoming,
    items: [...(existing.items || []), ...incoming.items],
  };
};

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      commentsByPost: {
        keyArgs: ["postID", "createdAt", "sortDirection", "filter"],
        merge: mergeLists,
      },
      postsByDate: {
        keyArgs: ["type", "createdAt", "sortDirection", "filter"],
        merge: mergeLists,
      },
    },
  },
};

const client = new ApolloClient({
  link,
  cache: new InMemoryCache({ typePolicies }),
});

interface IClient {
  children: ReactNode;
}

export const Client = ({ children }: IClient) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
