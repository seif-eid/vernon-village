import type { ContentModel } from "$server/interfaces";


/**
 * Represents a Photo Gallery photo
 */
export const PHOTO_GALLERY_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Photo",
    htmlName: "photo",
    isAdminContent: true,
    isUserContent: true,
    fields: [
        {
            name: "image",
            displayName: "Photo",
            type: { name: "file" }
        },
        {
            name: "imagedesc",
            displayName: "Photo Description",
            type: { name: "text" }
        },
        {
            name: "date",
            displayName: "Date Taken",
            type: { name: "date" }
        }
    ]
}