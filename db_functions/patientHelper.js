import {init, close} from "./connectionSingleton.js"

async function getPatient(patient_id){
    let patient;
    try{
        
        const db = await init();
        const patientsCollection = db.collection("Patients");

        //find and return specific patient
        patient = await patientsCollection.findOne({"id": patient_id});

    }
    catch (err){
        console.error("error trying to access database", err);
    }
    finally{
        return patient;
    }
    
}

async function getPatients(){
    let patients = null;

    try{
        const db = await init();
        const patientsCollection = db.collection("Patients");
        patients = await patientsCollection.find({}).toArray();

    }
    catch(error){
        console.error("error trying to access database", error);
    }
    return patients;
}
export {getPatient, getPatients}