import express from "express";
import dotenv from "dotenv";
import { patientsRouter } from "./routes/patients.js";
import {init, close} from "./db_functions/connectionSingleton.js"

dotenv.config({path: "./.env"})

const app = express();
const PORT = process.env.SERVER_PORT || "8080";

//middleware
app.use(express.json())

//routes
app.use("/patients", patientsRouter);

async function start(){
    await init();
    app.listen(PORT, () =>{
        console.log(`API Server Listening on Port ${PORT}`);
    });

    process.on("SIGINT", async ()=>{
        await close();
        console.log("server closing gracefully...");
        process.exit(0);
    })
}

start();