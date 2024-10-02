import { Router } from "express";
import {getPatients, getPatientByID} from "../db_functions/patientHelper.js";

const patientsRouter = Router();

patientsRouter.get("/", async (req, res) => {
    const patients = await getPatients();
    res.status(200).json(patients);
});

patientsRouter.get("/:user_id", async (req, res) =>{
    const id = req.params.user_id;
    const patient = await getPatientByID(id);
    res.status(200).json(patient);
});

patientsRouter.get("/:user_id/Observations", async (req, res) =>{

});

patientsRouter.get("/:user_id/Conditions", async (req, res) =>{

});

patientsRouter.get("/:user_id/Encounters", async (req, res) =>{

});

patientsRouter.get("/:user_id/AllergyIntolerances", async (req, res) =>{

});

patientsRouter.get("/:user_id/DiagnosticReports", async (req, res) =>{

});

export {patientsRouter};