import { MongoClient } from "mongodb";

/*
let client;
let db;
const DataBaseSingleton = {
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
*/


async function DatabaseConnectionPool(connections){
    const inactiveConnections = [];
    const activeConnections = [];
    

    const init = async function(){
        for (let i = 0; i < connections; i++) {
            const conn = await MongoClient.connect(process.env.MONGO_DB);

            //add event listeners
            
            //pushing the new client connection to the list of inactive connections
            inactiveConnections.push(conn);
        }
    }

    const deInit = async function(){
        await Promise.all(inactiveConnections.map(async (conn) => conn.close()));
        await Promise.all(activeConnections.map(async (conn) => conn.close()));
    }

    await init();

    let DatabaseConnectionPoolInstance = {
        getConnection: async function(){
            let conn = inactiveConnections.pop();

            if(conn === undefined){
                await new Promise((resolve) => setTimeout(resolve, 500));
                return await this.getConnection();
            }
            activeConnections.push(conn);
            return conn;
        },

        returnConnection: function(finishedConn){
            if(!finishedConn){
                return
            }

            if(activeConnections.length === 0)
                return;

            let activeConnCount = 0; 
            let totalActiveConnectionsCount = activeConnections.length;

            while(conn !== undefined && activeConnCount < totalActiveConnectionsCount){
            let conn = activeConnections.pop();
                if (conn === finishedConn){
                    inactiveConnections.push(conn)
                }
                else{
                    activeConnections.push(conn);
                }
                activeConnCount++;
            }
        },

        destroyConnectionPool: async function(){
            await deInit();
        }

    }
    return DatabaseConnectionPoolInstance
}

let connectionPool = null;
async function getDatabaseConnectionPool(){
    if(connectionPool === null){
        connectionPool = await DatabaseConnectionPool(10);
    } 
    return connectionPool;
}

async function closeDatabaseConnectionPool(){
    if(connectionPool)
        await connectionPool.destroyConnectionPool();
}

export {getDatabaseConnectionPool, closeDatabaseConnectionPool};
