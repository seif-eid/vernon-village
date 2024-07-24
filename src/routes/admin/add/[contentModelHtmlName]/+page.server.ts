import { error, type Actions } from "@sveltejs/kit"
import { defaultFormSubmit } from "$lib/server/forms"

export const actions: Actions = {
    default: async ({ request, params }) => {
        const contentModelHtmlName = params.contentModelHtmlName
        const formData = await request.formData()

        if (contentModelHtmlName) {
            defaultFormSubmit(contentModelHtmlName, formData, true)
        } else {
            throw error(500, "Could not upload data")
        }
    }
}