import express from "express";
import AuthRoutes from "./routes/auth.route.js";
import bodyParser from "body-parser";

import "./database/initial.js";
import dotenv from "dotenv";
import cors from "cors";
import ProfileRoutes from "./routes/user.routes.js";
import PostRoutes from "./routes/post.route.js";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser({ limit: "50mb" }));

app.use(express.json());

const port = 4848;

app.use("/api/maaya", AuthRoutes);
app.use("/api/maaya", ProfileRoutes);
app.use("/api/maaya", PostRoutes);

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});
