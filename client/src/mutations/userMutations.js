import { gql } from "@apollo/client";

const REGISTER_USER = gql`
  mutation RegisterUser($userInput: UserInput) {
    registerUser(userInput: $userInput) {
      username
      email
    }
  }
`;

export { REGISTER_USER };
