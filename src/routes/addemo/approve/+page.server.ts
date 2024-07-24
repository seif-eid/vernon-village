import { MongoClient, ObjectId, type WithId } from "mongodb";
import dotenv from 'dotenv';
import type { PageServerLoad } from "./$types";
import { bulletinPost } from "$lib/model/bulletinPost";
import type { Actions } from "./$types"

dotenv.config();

const url = process.env.MONGO_URL || '';
if (!url) {
    throw new Error("Please define the MONGO_URL environment variable");
}

const client = new MongoClient(url);

export const load: PageServerLoad = async function(): Promise<{bulletinPost: any}> {
    const records = await bulletinPost.find({"meta.isApproved": false}).toArray();
    const recordsForJSON = records.map(record => ({...record, _id: record._id.toString()}));

    console.log("Found records: ", recordsForJSON)
    return {
        bulletinPost: recordsForJSON
    }
}

export const actions = {
    approve: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        const result = await client.db("vernonvillage")
        .collection("Bulletin Post")
        .updateOne(
            { "_id": new ObjectId(id?.toString()) },
            {
                $set:{"meta.isApproved":true}
            }    
        );
        console.log(id)
        console.log(result)
    },
    reject: async ({ request }) => {
        const data = await request.formData();
        const id = data.get("id");
        const result = await client.db("vernonvillage").collection("Bulletin Post").deleteOne({ "_id": new ObjectId(id?.toString()) });
        console.log(id)
        console.log(result)
    }
} satisfies Actions;
