import path from "path";
import fs from "fs";

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import mathRoutes from "./routes/math";
import planetRoutes from "./routes/planet";
import { get404 } from "./controllers/error";
import { calculatePi } from "./models/pi";
import { initIOSocket } from "./util/socket";

const app = express();

// Logging middleware
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

// Routes available
app.use("/math", mathRoutes);
app.use("/planet", planetRoutes);
app.use(get404);

const server = app.listen({ port: 8080 });
const io = initIOSocket(server);
io.on("connection", (socket) => {
  console.log("Client Connected");
});
console.log("Server startup Done");

calculatePi();
