import type { ContentModel } from "$server/interfaces";


/**
 * Represents a Contact Form submission
 */
export const CONTACT_FORM_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Contact Message",
    htmlName: "contact-message",
    isAdminContent: false,
    isUserContent: false,
    fields: [
        {
            name: "subject",
            displayName: "Subject",
            type: { name: "text" }
        },
        {
            name: "message",
            displayName: "Message",
            type: { name: "text" }
        },
        {
            name: "phone",
            displayName: "Phone Number",
            type: { name: "text" }
        },
        {
            name: "email",
            displayName: "Email",
            type: { name: "text" }
        }
    ]
}