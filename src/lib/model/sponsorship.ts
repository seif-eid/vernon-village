import type { ContentModel } from "$server/interfaces";


/**
 * Represents a Sponsorship
 */
export const SPONSORSHIP_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Sponsorship",
    htmlName: "sponsorship",
    isAdminContent: true,
    isUserContent: false,
    fields: [
        {
            name: "sponsor",
            displayName: "Sponsor",
            type: { name: "text" }
        },
        {
            name: "image",
            displayName: "Image",
            type: { name: "file" }
        },
        {
            name: "imagedesc",
            displayName: "Image Description",
            type: { name: "text" }
        },
        {
            name: "description",
            displayName: "Sponsor Description",
            type: { name: "text" }
        }
    ]
}