import db, { pingMongo, startMongo } from "$server/mongo"
import { contentDataTypes } from '$server/datatypes'
import { UPCOMING_EVENT_CONTENT_MODEL } from '$lib/model/upcomingEvent'
import { CONTACT_FORM_CONTENT_MODEL } from '$lib/model/contactForm'
import { PHOTO_GALLERY_CONTENT_MODEL } from '$lib/model/photoGallery'
import { SPONSORSHIP_CONTENT_MODEL } from '$lib/model/sponsorship'
import { HOME_BUSINESS_CONTENT_MODEL } from '$lib/model/homeBusiness'
import { COMMUNITY_GROUP_CONTENT_MODEL } from '$lib/model/communityGroup'
import { CONTACT_LIST_CONTENT_MODEL } from '$lib/model/contactList'
import type { ContentModel } from '$server/interfaces'
import { SYS_MODELS, SYS_DATATYPES, SESSION_TIMEOUT, ADMIN_EMAIL, ADMIN_PASSWORD } from "$env/static/private"
import bcrypt from 'bcrypt';


async function createSysDataTypesCollection() {
    const sysDataTypesCollection = db.collection(SYS_DATATYPES)
    // TODO: Exception handling
    await sysDataTypesCollection.createIndex( { name: 1 }, { unique: true } )
}

async function createSessionCollection() {
    const sessionCollection = db.collection("Session")
    await sessionCollection.createIndex( { "lastModifiedDate": 1 }, { expireAfterSeconds: parseInt(SESSION_TIMEOUT)/1000})
}

async function populateSysDataTypesCollection() {
    const sysDataTypesCollection = db.collection(SYS_DATATYPES)
    // TODO: Exception handling
    await sysDataTypesCollection.insertMany(contentDataTypes)
}

async function createContentModelsCollection() {
    const sysContentModelsCollection = db.collection(SYS_MODELS)
    // TODO: Exception handling
    await sysContentModelsCollection.createIndex( { name: 1 }, { unique: true } )
    await sysContentModelsCollection.createIndex( { htmlName: 1 }, { unique: true })
}

async function populateContentModelsCollection() {
    const sysContentModelsCollection = db.collection(SYS_MODELS)

    const models: Array<ContentModel> = [
        UPCOMING_EVENT_CONTENT_MODEL,
        CONTACT_FORM_CONTENT_MODEL,
        PHOTO_GALLERY_CONTENT_MODEL,
        SPONSORSHIP_CONTENT_MODEL,
        HOME_BUSINESS_CONTENT_MODEL,
        COMMUNITY_GROUP_CONTENT_MODEL,
        CONTACT_LIST_CONTENT_MODEL
    ]

    models.forEach(async it => {
        // TODO: Exception handling

        // copy the model, and remove the _id field
        // a little hacky, but we only do this once
        const model: any = it
        delete model["_id"]

        await sysContentModelsCollection.insertOne(model)
    })
    
}

/**
 * Starts up the DB, and initializes as necessary.
 */
export async function initDatabase() {
    console.log("Starting up MongoDB")
    await startMongo()

    if (await pingMongo()) {
        console.log("Database connection successful")
    } else {
        console.log("Could not connect to database")
    }

    const collectionNames: Array<string> = (await db.collections()).map(it => it.collectionName)

    if (!collectionNames.includes(SYS_DATATYPES)) {
        console.log("Creating system datatypes")
        await createSysDataTypesCollection()
        await populateSysDataTypesCollection()
    }

    if (!collectionNames.includes(SYS_MODELS)) {
        console.log("Creating content models")
        await createContentModelsCollection()
        await populateContentModelsCollection()
    }

    if(!collectionNames.includes("Session")) {
        console.log("Creating session collection")
        await createSessionCollection()
        await db.createCollection("Administrator Contact");
        const password = bcrypt.hashSync(ADMIN_PASSWORD, 10);

        
        await db.collection("Administrator Contact").insertOne(
            {meta: {isApproved: true}, content: {name:'admin', email:ADMIN_EMAIL, password:password}}
        );
    }
}