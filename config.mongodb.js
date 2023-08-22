const { MongoClient, ServerApiVersion } = require("mongodb");
const password = process.env.MONGODB_PASSWORD;

const uri = `mongodb+srv://students:${password}@students.djkwv1o.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

(async () => {
  try {
    await client.connect();
    console.log("MongoDB is working");
  } catch (err) {
    console.log(err);
  }
})();

const db = client.db("students");

module.exports = db;
