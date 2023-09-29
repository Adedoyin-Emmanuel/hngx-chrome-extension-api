const mongoose = require("mongoose");
const config = require("config");

const connectToDb = async () => {
  const dbUrl = config.get("App.database-url");
  try {
    await mongoose.connect(dbUrl);
    console.log(`Connected to MongoDb successfully at ${dbUrl}`);
  } catch (error) {
    console.error(`An error occured while connecting to MongoDb ${error}`);
  }
};

module.exports = connectToDb;
