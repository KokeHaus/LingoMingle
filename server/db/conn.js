const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
console.log("MongoDB Connection String:", Db);
const client = new MongoClient(Db, {

});
 
var _db;
 
module.exports = {
    connectToServer: async function () {
        try {
          console.log('connecting to db...');
          await client.connect();
          _db = client.db("employees");
          console.log("Successfully connected to MongoDB.");
        } catch (err) {
          console.error("Error connecting to MongoDB", err);
          throw err; 
        }
      },
      
 
  getDb: function () {
    return _db;
  },
};