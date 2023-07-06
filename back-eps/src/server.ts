import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors());

const mongoString = process.env.MONGO_URI as string;
const port = process.env.PORT as string;
const host = process.env.HOST as string;

console.log(mongoString);
console.log(port);
console.log(host);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database connected");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server started at ${port}`);
  console.log(`Go to http://${host}:${port}`);
});
