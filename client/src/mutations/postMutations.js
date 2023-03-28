import { gql } from "@apollo/client";

const ADD_POST = gql`
    mutation AddPost(
        $title: String!
        $description: String!
        $forum: PostForum!
        $userId: ID!
    ) {
        addPost(
            title: $title
            description: $description
            forum: $forum
            userId: $userId
        ) {
            id
            title
            description
            forum
            createdAt
            user {
                id
                username
            }
        }
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($id: ID!) {
        deletePost(id: $id){
            id
        }
    }
`;

const UPDATE_POST = gql`
    mutation UpdatePost(
        $id: ID!
        $title: String!
        $description: String!
        $forum: PostForumUpdate!
    ) {
        updatePost(
            id: $id
            title: $title
            description: $description
            forum: $forum
        ) {
            id
            title
            description
            forum
            createdAt
            user {
                id
                username
            }
        }
    }
`;

export { ADD_POST, DELETE_POST, UPDATE_POST };