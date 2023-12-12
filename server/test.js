const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb+srv://koki:ldOaIdvRqDunMgTM@cluster0.0zoucrt.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {});

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const database = client.db("test"); // Replace 'test' with your database name if you want to test a specific database
    const collection = database.collection("test"); // Replace 'test' with your collection name if needed
    // Perform some operations here if you want to test reading/writing
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
