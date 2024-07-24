/** Basic MonoDB setup and utility functions
 * 
 * The MONGO_URL environment variable must be entered into the .env file in
 * the `/vernon-village` directory, and should be set to the URL of your MongoDB
 * server, and MONGO_DB should be set to the name of the database.
 */

import { Collection, MongoClient } from 'mongodb'
import type { Document } from 'mongodb'
import { MONGO_URL, MONGO_DB, SYS_DATATYPES, SYS_MODELS } from '$env/static/private'
import type { ContentModel, SysDataType } from '$server/interfaces'


const client = new MongoClient(MONGO_URL)

export function startMongo() : Promise<MongoClient> {
    return client.connect()
}

export default client.db(MONGO_DB)

export async function pingMongo(): Promise<boolean> {
    const ping: Document = await client.db(MONGO_DB).command( { ping: 1 } )
    return ping.ok && ping.ok == 1
}

