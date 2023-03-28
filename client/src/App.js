import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import Home from "./pages/Home";
import GeneralForum from "./pages/GeneralForum";
import TournamentsForum from "./pages/TournamentsForum";
import Error from "./pages/Error";
import Post from "./pages/Post";
import UserProfile from "./pages/UserProfile";
import UserPosts from "./pages/UserPosts";
import Users from "./pages/Users";
import Groups from "./pages/Groups";
import Register from "./pages/Register";
import Login from "./pages/Login";

const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        posts: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function App() {
  return (
    <>
      <AuthProvider>
        <ApolloProvider client={client}>
          <Router>
            <Header />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="/forums/general" element={<GeneralForum />} />
                <Route
                  path="/forums/tournaments"
                  element={<TournamentsForum />}
                />
                <Route path="/posts/:id" element={<Post />} />
                <Route path="/users/:id" element={<UserProfile />} />
                <Route path="/users/:id/posts" element={<UserPosts />} />
                <Route path="/users" element={<Users />} />
                <Route path="/groups" element={<Groups />} />
                <Route path="*" element={<Error />} />
              </Routes>
            </div>
          </Router>
        </ApolloProvider>
      </AuthProvider>
    </>
  );
}

export default App;
