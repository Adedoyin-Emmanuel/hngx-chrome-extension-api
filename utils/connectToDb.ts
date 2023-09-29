import config from "config";
import mongoose from "mongoose";

const connectToDb = async () => {
  const dbUrl: string = config.get("App.database-url");
  try {
    await mongoose.connect(dbUrl);
    console.log(`Connected to MongoDb successfully at ${dbUrl}`);
  } catch (error) {
    console.error(`An error occured while connecting to MongoDb ${error}`);
  }
};

export default connectToDb;
