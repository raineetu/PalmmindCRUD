import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./db/connection.js";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from 'body-parser';



// Load environment variables
dotenv.config();
// console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const PORT = process.env.PORT || 3000;

//define routes
app.use("/api", userRoutes);

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is listening at port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database", err);
  });
