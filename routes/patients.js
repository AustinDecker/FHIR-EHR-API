import { Router } from "express";
import {getPatients, getPatientByID} from "../db_functions/patientHelper.js";

const patientsRouter = Router();

patientsRouter.get("/", async (req, res) => {
    const patients = await getPatients();
    res.status(200).json(patients);
});

patientsRouter.get("/:patient_id", async (req, res) =>{
    const id = req.params.patient_id;
    const patient = await getPatientByID(id);
    res.status(200).json(patient);
});

patientsRouter.post("/search", async (req, res) =>{
    
});



export {patientsRouter};