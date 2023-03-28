import { gql } from "@apollo/client";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      username
      email
      posts {
        id
        title
        description
      }
    }
  }
`;

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      password
      posts {
        id
        title
        description
      }
    }
  }
`;

export { GET_USERS, GET_USER };
