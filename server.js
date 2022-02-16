import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// GraphQl Schema
let schema = buildSchema(`
    type Query {
        product(id: Int!): Product
        products(brand: String): [Product]
    },
    type Product {
        id: Int!,
        brand: String,
        productName: String,
        color: String,
        description: String,
        price: Int!,
        amount: Int!
    }
`);

var productsData = [
    {
        id: 1,
        brand: 'Apple',
        productName: 'IPhone 11',
        color: 'red',
        description: 'Lorem Ipsum',
        price: 345,
        amount: 1
    },
    {
        id: 2,
        brand: 'Apple',
        productName: 'IPhone 11',
        color: 'red',
        description: 'Lorem Ipsum',
        price: 345,
        amount: 1
    },
    {
        id: 3,
        brand: 'Apple',
        productName: 'IPhone 11',
        color: 'red',
        description: 'Lorem Ipsum',
        price: 345,
        amount: 1
    }
];

let getProduct = function(args) {
    let id = args.id;
    return productsData.filter(product => {
        return product.id == id
    })[0];
};

let getProducts = function(args) {
    if(args.brand) {
        let brand = args.brand;
        return productsData.filter(product => product.brand === brand);
    } else {
        return productsData;
    }
};
 
// Root resolver 
var root = {
    product: getProduct,
    products: getProducts
};

// Create express server and a GraphQl endpoint
let app = express();
app.use('/malwarebytes-graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log("Express GraphQl Server is running on localhost:4000/malwarebytes-graphql"));