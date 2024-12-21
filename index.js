const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tkh8w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const AllJobCollection = client.db("Job_Portal").collection("Jobs");

    // Get All Element
    app.get("/jobs", async (req, res) => {
      const cursor = AllJobCollection.find();
      const jobs = await cursor.toArray();
      res.send(jobs);
    });
    // Get Single Element
    // app.get("/", async (req, res) => {});

    // // Post Client Site to Database
    // app.post("/", async (req, res) => {});

    // // Delete for Database
    // app.delete("/", async (req, res) => {});

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Job is falling from the sky...");
});

app.listen(port, () => {
  console.log(`Express App Running port: ${port}`);
});
