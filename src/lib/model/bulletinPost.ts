import type { ContentModel } from "$server/interfaces";
import db from "$lib/server/mongo"

/**
 * Represents a Bulletin Post for the Digital Bulletin Board
 */

export const bulletinPost = db.collection('Bulletin Post');

export const BULLETIN_POST_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Bulletin Post",
    htmlName: "bulletin-post",
    isAdminContent: true,
    isUserContent: true,
    fields: [
        {
            name: "image",
            displayName: "Bulletin Post Image",
            type: { name: "file" }
        },
        {
            name: "imagedesc",
            displayName: "Bulletin Post Description",
            type: { name: "text" }
        },
        {
            name: "description",
            displayName: "Detailed Description",
            type: { name: "text" }
        },
        {
            name: 'email',
            displayName: "Your Email Address",
            type: { name: "text" }
        },
        {
            name: "expiryDate",
            displayName: "Post Expiry Date",
            type: { name: "date" }
        }
    ]
}

