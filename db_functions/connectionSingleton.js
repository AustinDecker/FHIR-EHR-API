import { MongoClient } from "mongodb";

let client;
let db;
export const DataBaseSingleton = {
    init: async function(){
        if(!client){
            client = new MongoClient(process.env.MONGO_DB);     
        }
    
        if(!db){
            await client.connect();
            db = client.db("dev");
        }
        return db;
    },

    close: async function(){
        if(client){
            await client.close();
            client = null;
            db = null;
        }
    }
};
