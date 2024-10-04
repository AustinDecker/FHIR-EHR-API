import express from "express";
import dotenv from "dotenv";
import { patientsRouter } from "./routes/patients.js";
import { observationsRouter } from "./routes/observations.js";
import {getDatabaseConnectionPool, closeDatabaseConnectionPool} from "./db_functions/connectionSingleton.js";

dotenv.config({path: "./.env"})

const app = express();
const PORT = process.env.SERVER_PORT || "8080";

//middleware
app.use(express.json());

//routes
app.use("/patients", patientsRouter);
app.use("/observations", observationsRouter);

async function start(){
    await getDatabaseConnectionPool();
    app.listen(PORT, () =>{
        console.log(`API Server Listening on Port ${PORT}`);
    });

    process.on("SIGINT", async ()=>{
        await closeDatabaseConnectionPool();
        console.log("server closing gracefully...");
        process.exit(0);
    })

}
start();