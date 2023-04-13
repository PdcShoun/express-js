import mongoose, { connect, connection } from "mongoose";
import config from "./config";

const uri = config.DATABASE_URL;

async function main() {
  // Connect the client to the server
  await connect(uri);
  // Send a ping to confirm a successful connection
  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  return connection;
}
const db = main();

export default db;
