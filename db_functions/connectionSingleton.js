import { MongoClient } from "mongodb";

let client;
let db;

async function init(){
    if(!client){
        client = new MongoClient(process.env.MONGO_DB);     
    }

    if(!db){
        await client.connect();
        db = client.db("dev");
    }
    return db;
}
async function close(){
    if(client){
        await client.close();
        client = null;
        db = null;
    }
}
export {init, close}