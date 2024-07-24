import type { ContentModel } from "$server/interfaces";


/**
 * Represents a Community Group
 */
export const COMMUNITY_GROUP_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Community Group",
    htmlName: "community-group",
    isAdminContent: true,
    isUserContent: true,
    fields: [
        {
            name: "group",
            displayName: "Community Group",
            type: { name: "text" }
        },
        {
            name: "description",
            displayName: "Group Description",
            type: { name: "text" }
        },
        {
            name: "image",
            displayName: "Image",
            type: { name: "file"}
        },
        {
            name: "imagedesc",
            displayName: "Image Description",
            type: { name: "text" }
        },
        {
            name: "link",
            displayName: "Group Website",
            type: { name: "text"}
        },
        {
            name: "phone",
            displayName: "Contact Phone",
            type: { name: "text" }
        },
        {
            name: "email",
            displayName: "Contact Email",
            type: { name: "text" }
        }
    ]
}