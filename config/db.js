import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const dbcred = process.env.MONGO_DB_CNN;

export const dbConnect = async () => {
  try {
    await mongoose.connect(dbcred);
    console.log("DB online and ready");
  } catch (err) {
    console.log(err);
    throw new Error("DB conection failure");
  }
};
