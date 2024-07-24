import { MongoClient, type WithId } from "mongodb";
import dotenv from 'dotenv';
import type { PageServerLoad } from "./$types";
import { bulletinPost } from "$lib/model/bulletinPost";

dotenv.config();

const url = process.env.MONGO_URL || '';
if (!url) {
    throw new Error("Please define the MONGO_URL environment variable");
}

const client = new MongoClient(url);

export const load: PageServerLoad = async function(): Promise<{bulletinPost: any}> {
    const records = await bulletinPost.find({"meta.isApproved": true}).toArray();
    const recordsForJSON = records.map(record => ({...record, _id: record._id.toString()}));

    console.log("Found records: ", recordsForJSON)
    return {
        bulletinPost: recordsForJSON
    }
}
