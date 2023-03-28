const Post = require("../models/Post");
const User = require("../models/User");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLScalarType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
  GraphQLInt,
  GraphQLInputObjectType,
} = require("graphql");

// Date Scalar
const DateType = new GraphQLScalarType({
  name: "Date",
  parseValue(value) {
    return moment(value);
  },
  serialize(value) {
    return moment(value).format("MM/DD/YYYY");
  },
});

// Post Type
const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    forum: { type: GraphQLString },
    createdAt: { type: DateType },
    user: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.userId);
      },
    },
  }),
});

// User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString, unique: true },
    email: { type: GraphQLString, unique: true },
    password: { type: GraphQLString },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find({ userId: parent.id });
      },
    },
  }),
});

// Auth Type
const AuthType = new GraphQLObjectType({
  name: "AuthData",
  fields: () => ({
    userId: { type: GraphQLID },
    token: { type: GraphQLString },
    tokenExpiration: { type: GraphQLInt },
  }),
});

// Post Input
const PostInput = new GraphQLInputObjectType({
  name: "PostInput",
  fields: {
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    forum: { type: GraphQLString },
  },
});

// User Input
const UserInput = new GraphQLInputObjectType({
  name: "UserInput",
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    confirmPassword: { type: GraphQLString },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    posts: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        return Post.find();
      },
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Post.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find();
      },
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    login: {
      type: AuthType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ email: args.email });
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isEqual = await bcrypt.compare(args.password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect");
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          "somesupersecretkey",
          {
            expiresIn: "1h",
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1 };
      },
    },
  },
});

// Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    registerUser: {
      type: UserType,
      args: {
        userInput: { type: UserInput },
      },
      resolve: async (parent, args) => {
        try {
          const existingEmail = await User.findOne({
            email: args.userInput.email,
          });
          if (existingEmail) {
            throw new Error("Email already been used.");
          }
          const existingUsername = await User.findOne({
            username: args.userInput.username,
          });
          if (existingUsername) {
            throw new Error("Username is taken.");
          }
          const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

          const user = new User({
            username: args.userInput.username,
            email: args.userInput.email,
            password: hashedPassword,
          });

          const result = await user.save();

          return { ...result._doc, password: null, id: result.id };
        } catch (err) {
          throw err;
        }
      },
    },
    // Create a post
    createPost: {
      type: PostType,
      args: {
        postInput: { type: PostInput },
      },
      resolve: async (parent, args, req) => {
        if (!req.isAuth) {
          throw new Error("Unauthenticated!");
        }
        const post = new Post({
          title: args.postInput.title,
          description: args.postInput.description,
          forum: args.postInput.forum,
          userId: req.userId,
        });
        let createdPost;
        try {
          const result = await post.save();
          createdPost = result;
          const userId = await User.findById(req.userId);

          if (!userId) {
            throw new Error("User not found.");
          }
          userId.posts.push(createdPost);
          await userId.save();

          return createdPost;
        } catch (err) {
          console.log(err);
          throw err;
        }
      },
    },
    // Delete a post
    deletePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Post.findByIdAndRemove(args.id);
      },
    },
    // Update a post
    updatePost: {
      type: PostType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        forum: {
          type: new GraphQLEnumType({
            name: "PostForumUpdate",
            values: {
              general: { value: "General" },
              tournaments: { value: "Tournaments" },
            },
          }),
        },
      },
      resolve(parent, args) {
        return Post.findByIdAndUpdate(
          args.id,
          {
            $set: {
              title: args.title,
              description: args.description,
              forum: args.forum,
            },
          },
          { new: true }
        );
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
