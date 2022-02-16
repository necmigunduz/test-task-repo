import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";

// GraphQl Schema
let schema = buildSchema(`
    type Query {
        product(id: Int!): Product
        products(brand: String): [Product]
    },
    type Mutation {
        updateBrand(id: Int!, brand: String): Product
        updateProductName(id: Int!, productName: String): Product
        updateColor(id: Int!, color: String): Product
        updateDescription(id: Int!, description: String): Product
        updatePrice(id: Int!, price: Int): Product
        updateAmount(id: Int!, amount: Int): Product
    },
    type Product {
        id: Int!,
        brand: String,
        productName: String,
        color: String,
        description: String,
        price: Int,
        amount: Int
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

let updateBrand = function({id, brand}) {
    productsData.map(product => {
        if(product.id === id) {
            product.brand = brand;
            return product;
        }
    })
    return productsData.filter(product => product.id === id)[0];
};

let updateProductName = function({id, productName}) {
    productsData.map(product => {
        if(product.id === id) {
            product.productName = productName;
            return product;
        }
    })
    return productsData.filter(product => product.id === id)[0];
};

let updateColor = function({id, color}) {
    productsData.map(product => {
        if(product.id === id) {
            product.color = color;
            return product;
        }
    })
    return productsData.filter(product => product.id === id)[0];
};

let updateDescription = function({id, description}) {
    productsData.map(product => {
        if(product.id === id) {
            product.description = description;
            return product;
        }
    })
    return productsData.filter(product => product.id === id)[0];
};

let updatePrice = function({id, price}) {
    productsData.map(product => {
        if(product.id === id) {
            product.price = price;
            return product;
        }
    })
    return productsData.filter(product => product.id === id)[0];
};

let updateAmount = function({id, amount}) {
    productsData.map(product => {
        if(product.id === id) {
            product.amount = amount;
            return product;
        }
    })
    return productsData.filter(product => product.id === id)[0];
};
 
// Root resolver 
var root = {
    product: getProduct,
    products: getProducts,
    updateBrand: updateBrand,
    updateProductName: updateProductName,
    updateColor: updateColor,
    updateDescription: updateDescription,
    updatePrice: updatePrice,
    updateAmount: updateAmount
};

// Create express server and a GraphQl endpoint
let app = express();
app.use('/malwarebytes-graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log("Express GraphQl Server is running on localhost:4000/malwarebytes-graphql"));