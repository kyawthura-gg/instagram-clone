import React, { ReactNode, useMemo } from "react";
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
import { useAuthContext } from "../contexts/auth-context";

const url = appSyncConfig.aws_appsync_graphqlEndpoint;

const region = appSyncConfig.aws_appsync_region;

const httpLink = new HttpLink({ uri: url });

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

interface IClient {
  children: ReactNode;
}

export const Client = ({ children }: IClient) => {
  const { user } = useAuthContext();

  const client = useMemo(() => {
    const jwtToken =
      user?.getSignInUserSession()?.getAccessToken().getJwtToken() || "";

    const auth: AuthOptions = {
      type: appSyncConfig.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken,
    };

    const link = ApolloLink.from([
      createAuthLink({ url, region, auth }),
      createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
    ]);

    return new ApolloClient({
      link,
      cache: new InMemoryCache({ typePolicies }),
    });
  }, [user]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
