import type { ContentModel } from "$server/interfaces";


/**
 * Represents a Home Business
 */
export const HOME_BUSINESS_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Home Business",
    htmlName: "home-business",
    isAdminContent: true,
    isUserContent: true,
    fields: [
        {
            name: "business",
            displayName: "Business Name",
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
            displayName: "Business Overview",
            type: { name: "text" }
        },
        {
            name: "phone",
            displayName: "Contact Phone",
            type: { name: "text" }
        },
        {
            name: "email",
            displayName: "Contact Email",
            type: { name: "text"}
        }
    ]
}