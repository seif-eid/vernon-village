import type { ContentModel } from "$server/interfaces";


/**
 * Represents a Contact
 */
export const CONTACT_LIST_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Administrator Contact",
    htmlName: "admin-contact",
    isAdminContent: true,
    isUserContent: false,
    fields: [
        {
            name: "name",
            displayName: "Administrator Name",
            type: { name: "text" }
        },
        {
            name: "email",
            displayName: "Contact Email",
            type: { name: "text" }
        },
        {
            name: "password",
            displayName: "Password",
            type: { name: "text" }
        }
    ]
}