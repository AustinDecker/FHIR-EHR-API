import { Router } from "express";
import {getObservations, getObservationByID} from "../db_functions/observationsHelper.js";

const observationsRouter = Router();

observationsRouter.get("/", async (req, res) =>{
    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const amount = req.query.amount === undefined ? 100 : parseInt(req.query.amount);
    const observations = await getObservations(page, amount);
    
    res.status(200).json(observations);
});

observationsRouter.get("/:observation_id", async (req, res) => {
    const observation = await getObservationByID(req.params.observation_id);
    res.status(200).json(observation);
});

export {observationsRouter}