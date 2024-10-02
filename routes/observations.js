import { Router } from "express";
import {getObservations, getObservationByID} from "../db_functions/observationsHelper.js";

const observationsRouter = Router();

export {observationsRouter}