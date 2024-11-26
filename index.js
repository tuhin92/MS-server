const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());


/// mongodb
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ia4w5yl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


// Create a MongoClient
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const dbConnect = async () => {
  try {
    client.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.name, error.message);
  }
};

// call the function
dbConnect();

// api
app.get("/", (req, res) => {
  res.send("Mail Server is running");
});
app.listen(port, () => {
  console.log(`Mail Server is running on port, ${port}`);
});
