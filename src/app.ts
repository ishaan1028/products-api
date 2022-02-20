import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from 'dotenv';

import productRoute from "./routes/product.route";

dotenv.config();

const app=express();

app.use(express.json());

app.use(helmet());

app.use(cors());

app.use(morgan("common"));

app.use("/products",productRoute);

app.get("/",(req,res)=>res.send("Home"));

app.listen(process.env.PORT||3001);