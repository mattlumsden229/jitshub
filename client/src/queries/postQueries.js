import { gql } from "@apollo/client";

const GET_POSTS = gql`
    query getPosts {
        posts {
            id
            title
            description
            forum
            createdAt
            user {
                id
                username
                email
            }
        }
    }
`;

const GET_POST = gql`
    query getPost($id: ID!) {
        post(id: $id) {
            id
            title
            description
            forum
            createdAt
            user {
                id
                username
                email
            }
        }
    }
`;

export { GET_POSTS, GET_POST };