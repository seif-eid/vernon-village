import { createContentData, getContentModelByHtmlName, updateContentDataById } from "$server/content"
import { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } from '$env/static/private';
import type { ContentModel } from "$server/interfaces"
import { error } from "@sveltejs/kit"
import { writeFileSync } from "fs"
import crypto from "crypto"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
})
export async function defaultFormSubmit(
    contentModelHtmlName: string, 
    formData: FormData,
    isApproved: boolean) {

        //If form has image field
        if(!Object.is(formData.get('image'), null)) {
            const file = formData.get('image') as File;
            if(file.size > 0) {
                const arrayBuffer = await ((formData.get('image') as File).arrayBuffer());
                const buffer = Buffer.from(arrayBuffer);
                await cloudinary.uploader
                .upload('data:;base64,'+buffer.toString('base64'))
                .then(result=> formData.set('image', result.url))
                .catch( (error) => {
                    console.log(error);
                })
                .catch(err => console.error(err));
            } else {
                formData.set('image', "");
            }
        }
    // fetch the appropriate content model
    let contentModel: ContentModel | null = contentModelHtmlName ?
        await getContentModelByHtmlName(contentModelHtmlName) : null

    if (contentModel) {
        // create the content object from the form
        const content = Object.fromEntries(formData)
        // content data NOT approved initially
        createContentData(contentModel, content, isApproved)
    } else {
        throw error(500, "Could not upload data")
    }
}

export async function editFormSubmit(
    contentModelHtmlName: string, 
    formData: FormData,
    id: string | null = null) {
        
        //If form has image field
        if(!Object.is(formData.get('image'), null)) {
            const file = formData.get('image') as File;
            if(file.size > 0) {
                const arrayBuffer = await ((formData.get('image') as File).arrayBuffer());
                const buffer = Buffer.from(arrayBuffer);
                await cloudinary.uploader
                .upload('data:;base64,'+buffer.toString('base64'))
                .then(result=> formData.set('image', result.url))
                .catch( (error) => {
                    console.log(error);
                })
                .catch(err => console.error(err));
            } else {
                formData.set('image', "empty");
            }
        }
    // fetch the appropriate content model
    let contentModel: ContentModel | null = contentModelHtmlName ?
        await getContentModelByHtmlName(contentModelHtmlName) : null
    
    if (contentModel) {
                
        // create the content object from the form
        const content = Object.fromEntries(formData)

        updateContentDataById(id!, contentModel, content)
    } else {
        throw error(500, "Could not upload data")
    }
}