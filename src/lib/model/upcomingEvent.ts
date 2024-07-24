import type { ContentModel } from "$server/interfaces";


/**
 * Represents an Upcoming Event
 */
export const UPCOMING_EVENT_CONTENT_MODEL: ContentModel = {
    _id: "",
    name: "Upcoming Event",
    htmlName: "upcoming-event",
    isAdminContent: true,
    isUserContent: true,
    fields: [
        {
            name: "event",
            displayName: "Event",
            type: { name: "text" }
        },
        {
            name: "date",
            displayName: "Date",
            type: { name: "date" }
        },
        {
            name: "time",
            displayName: "Time",
            type: { name: "time" }
        },
        {
            name: "description",
            displayName: "Description",
            type: { name: "text" }
        },
        {
            name: "recurrence",
            displayName: "Reccurence",
            type: { name: "text" }
        },
        {
            name: "image",
            displayName: "Promotional Image",
            type: { name: "file"}
        },
        {
            name: "imagedesc",
            displayName: "Image Description",
            type: { name: "text" }
        }
    ]
}