import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// GraphQl Schema
let schema = buildSchema(`
    type Query {
        message: String
    }
`);

// Root resolver 
var root = {
    message: () =>'Hello World!'
};

// Create express server and a GraphQl endpoint
let app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log("Express GraphQl Server is running on localhost:4000/graphql"));