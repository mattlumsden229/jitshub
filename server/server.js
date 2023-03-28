const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const connectDB = require("./config/db");
const schema = require("./schema/schema");
const port = process.env.PORT || 3001;
const isAuth = require("./middleware/auth");

const app = express();

app.use(bodyParser.json());

connectDB();

app.use(isAuth);

app.use(cors());

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
