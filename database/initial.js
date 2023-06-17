import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(
    "mongodb+srv://GautamKumar:gautam@cluster0.ilezkie.mongodb.net/maayajaal?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((res) => console.log("DataBase Connected successfully"))
  .catch((err) => console.log("Database Connection Failed", err));
