const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000; // You can use any port number you prefer
const path = require("path");

// Set the 'views' directory as the location for Pug templates
app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

const MongoClient = require('mongodb').MongoClient;
const mongoURI = 'mongodb://localhost:27017/';

// Connect to MongoDB
// MongoClient.connect(mongoURI, { useUnifiedTopology: true }, (err, client) => {
//   if (err) {
//     console.log('Error connecting to MongoDB:', err);
//     return;
//   }
//   console.log('Connected to MongoDB!');
//   const db = client.db('mydb'); // Replace 'mydb' with your desired database name

  // ...

  // Add MongoDB-related code here (e.g., creating collections, inserting data, etc.)
// });

// Define a route to render the Pug template with a form
app.get("/form", (req, res) => {
  res.render("form", { title: "Form Example" });
});

// Define a route to handle form submission
app.post("/submit", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  res.send(`Hello, ${name}! Your form was submitted successfully.`);
});

app.get("/data", (req, res) => {
  const data = {
    title: "Dynamic Data Example",
    message: "This data is coming from the backend.",
    items: ["Item 1", "Item 2", "Item 3"],
  };
  res.render("data", data);
});

// Define a route to render the Pug template
app.get("/", (req, res) => {
  res.render("index", { title: "Simple Pug Template" });
});

// Define an error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Define a route to render a list of products using the 'products' template
app.get('/products', (req, res) => {
  const products = [
    { name: 'Product 1', price: 10.99, category: 'Category 1' },
    { name: 'Product 2', price: 19.99, category: 'Category 2' },
    { name: 'Product 3', price: 7.49, category: 'Category 1' },
  ];

  res.render('products', { title: 'Product List', products });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
