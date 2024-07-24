import { SYS_DATATYPES, SYS_MODELS } from '$env/static/private';
import db from '$server/mongo'
import type { Document, WithId } from 'mongodb';
import type { ContentData, ContentMetaData, ContentModel, SysDataType } from "$server/interfaces";
import { CONTACT_FORM_CONTENT_MODEL } from '$lib/model/contactForm';
import {ObjectId} from 'mongodb';
import bcrypt from 'bcrypt';


/**
 * @returns The system data types
 */
export async function getSysDatatypes(): Promise<SysDataType[]> {
    return await db.collection(SYS_DATATYPES).find()
        .map(it => {
            return {
                name: it.name
            }
        }
    ).toArray()
}

/**
 * Helper function to convert a document into a ContentModel
 * @param document the MongoDB document to convert
 * @returns a ContentModel
 */
function extractContentModelFromDocument(document: Document): ContentModel {
    return { 
        _id: document._id.toString(),
        name: document.name,
        htmlName: document.htmlName,
        isAdminContent: document.isAdminContent,
        isUserContent: document.isUserContent,
        fields: document.fields
    }
}

/**
 * @returns All ContentModels
 */
export async function getContentModels(): Promise<ContentModel[]> {
    return await db.collection(SYS_MODELS).find()
        .map(it => extractContentModelFromDocument(it)).toArray()
}

/**
 * @returns ContentModels where users can submit data
 */
export async function getUserContentModels(): Promise<ContentModel[]> {
    return await db.collection(SYS_MODELS).find(
        { isUserContent: true }
    ).map(it => extractContentModelFromDocument(it)).toArray()
}

/**
 * @returns ContentModels where admins can submit data (i.e., not contact admin forms)
 */
export async function getAdminContentModels(): Promise<ContentModel[]> {
    return await db.collection(SYS_MODELS).find(
        { isAdminContent: true }
    ).map(it => extractContentModelFromDocument(it)).toArray()
}

/**
 * @param htmlName the html-safe content model name
 * @returns the ContentModel associated with that name, or null if there is none
 */
export async function getContentModelByHtmlName(htmlName: string): Promise<ContentModel | null> {
    const document = await db.collection(SYS_MODELS).findOne( { htmlName: htmlName } )
    return document ? extractContentModelFromDocument(document) : null
}

/**
 * Adds a ContentModel to the SYS_MODELS collection
 * @param model the ContentModel to be added
 */
export function createContentModel(model: ContentModel) {
    const document = {
        name: model.name,
        htmlName: model.htmlName,
        isAdminContent: model.isAdminContent,
        isUserContent: model.isUserContent,
        fields: model.fields
    }
    db.collection(SYS_MODELS).insertOne(document)
}

/**
 * Inserts content into the database
 * @param model The content type that is being inserted
 * @param content The content to be inserted
 * @param isApproved An optional argument indicating if the content is approved for display
 */
export async function createContentData(model: ContentModel, content: {[key: string]: any}, isApproved: boolean | null) {
    if(model.name == "Administrator Contact"){
        content["password"] = bcrypt.hashSync(content["password"], 10);
    }
    const meta: ContentMetaData = {
        isApproved: isApproved? isApproved : false
    }
    const contentData = {
        meta: meta,
        content: content
    }
    await db.collection(model.name).insertOne(contentData)
}

/**
 * Reads content data based on if it is approved
 * @param model The ContentModel we want to read data from
 * @param isApproved Whether that data has been approved for user submission
 * @returns an array of mongodb Documents
 */
export async function readContentData(model: ContentModel, isApproved: boolean | null): Promise<WithId<Document>[]> {
    const query = isApproved !== null? { "meta.isApproved": isApproved } : {}
    var query2 : {};
    if (model.name === "Upcoming Event") {
        let todayFullDate = new Date();
        let todayDate = todayFullDate.getDate().toString().length===2?todayFullDate.getDate().toString():"0"+todayFullDate.getDate().toString();
        let todayMonth = todayFullDate.getMonth().toString().length===2?(todayFullDate.getMonth()+1).toString():"0"+(todayFullDate.getMonth()+1).toString();
        let todayYear = todayFullDate.getFullYear();
        query2 = { "content.date" : { $gte : todayYear+"-"+todayMonth+"-"+todayDate }};

        return await db.collection(model.name).find({
            $and: [
                query,
                query2
            ]
        }).sort("content.date", 1).toArray();
    } else {

        return await db.collection(model.name).find(query).toArray();
    }
}
/**
 * reads all contact messages from the database
 * @returns list of contact messages
 */
export async function readContactMessages(): Promise<WithId<Document>[]> {
    return await db.collection(CONTACT_FORM_CONTENT_MODEL.name).find().toArray()
}
/**
 * Updates the content identifieed by ID and content model.
 * @param id unique identifier of specific content record
 * @param model type of content (upcoming event, community group, etc.) used to specify which collection to query
 * @param content The updated data for the content
 */
export async function updateContentDataById(id: string, model: ContentModel, content: any) {
    const contentToBeUpdated = await db.collection(model.name).findOne( { "_id": new ObjectId(id)})
    //Hashes updated password before storage
    if(content["password" as keyof typeof content]) {
        content["password" as keyof typeof content] = bcrypt.hashSync(content["password" as keyof typeof content], 10);
    }
    //Logic to allow admins to delete images (using the checkbox in update form)
    if(content["deleteImage" as keyof typeof content] == "delete") {
        db.collection(model.name).updateOne(
            { _id: new ObjectId(id) },
            { $set: { "content.image": "", "content.imagedesc": "" } }
        );
    }
    for(var field of model.fields) {
        //Prevents images from being deleted when the field is left empty on submission (and the delete checkbox is not selected)
        if(field.name == "image" && content[field.name as keyof typeof content] == "empty") {
        } else if (content[field.name as keyof typeof content] != contentToBeUpdated?.content[field.name]) {
            db.collection(model.name).updateOne(
                { _id: new ObjectId(id) },
                { $set: { ["content."+field.name]: content[field.name as keyof typeof content] } }
            );
        }
    }
}
/**
 * Deletes a document from the specified collection by its ID.
 * @param modelName type of content used to delete from the correct collection
 * @param contentId id of specific record to delete
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export async function deleteContentDataById(modelName: string, contentId: string): Promise<void> {
    try {
        const result = await db.collection(modelName).findOneAndDelete({ "_id": new ObjectId(contentId) });
        if (result.value) {
            console.log(`Successfully deleted document with id: ${contentId}`);
        } else {
            console.error(`Failed to find and delete document with id: ${contentId}`);
        }
    } catch (error) {
        console.error(`Error deleting document with id: ${contentId}`, error);
    }
}
/**
 * gets a specific content record
 * @param modelName type of content used to delete from the correct collection
 * @param contentId id of specific record to get
 * @returns JSON object containing all fields for that specific record
 */
export function getContentById(modelName: string, contentId: string) {
    return db.collection(modelName).findOne( { "_id": new ObjectId(contentId)})
}
/**
 * sets the isApproved flag to true so content can be displayed on site.
 * @param modelName type of content used to delete from the correct collection
 * @param contentId id of specific record to approve
 */
export function approveContentById(modelName: string, contentId: string) {
    db.collection(modelName).updateOne(
        { _id: new ObjectId(contentId) },
        { $set: { "meta.isApproved": true } }
    );
}

