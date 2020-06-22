import path from "path";
import fs from "fs";

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import mathRoutes from "./routes/math";
import { get404 } from "./controllers/error";
import { calculatePi } from "./models/pi";

const app = express();

// Logging middleware
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.listen({ port: 3000 });
console.log("Server startup Done");

calculatePi();
