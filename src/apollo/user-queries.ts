import { gql } from "@apollo/client";

export const getUser = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      name
      bio
      image
      website
      nofPosts
      nofFollowers
      nofFollowings
      Posts {
        nextToken
        startedAt
        items {
          id
          image
          images
          video
        }
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;

export const listUsers = gql`
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        username
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
