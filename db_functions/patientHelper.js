import { getDatabaseConnectionPool } from "./connectionSingleton.js"

async function getPatientByID(patient_id){
    let patient;
    try{
        
        const connectionPool = await getDatabaseConnectionPool();
        const connection = await connectionPool.getConnection();
        const db = connection.db("dev");

        const patientsCollection = db.collection("Patients");

        //find and return specific patient
        patient = await patientsCollection.findOne({"id": patient_id});

    }
    catch (err){
        console.error("error trying to access database", err);
    }
    finally{
        connectionPool.returnConnection(connection);
        return patient;
    }
    
}

async function getPatients(page=1, amount=100, filter={}){
    let patients = null;

    try{
        const connectionPool = await getDatabaseConnectionPool();
        const connection = await connectionPool.getConnection();
        const db = connection.db("dev");

        const patientsCollection = db.collection("Patients");

        patients = await patientsCollection.find(filter,  {
            limit: amount,
            skip: ((page -1) * amount)

        }).toArray();

    }
    catch(error){
        console.error("error trying to access database", error);
    }
    
    connectionPool.returnConnection(connection);
    return patients;
}
export {getPatientByID, getPatients}