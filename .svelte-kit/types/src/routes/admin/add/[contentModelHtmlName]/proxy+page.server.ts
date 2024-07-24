// @ts-nocheck
import { error, type Actions } from "@sveltejs/kit"
import { defaultFormSubmit } from "$lib/server/forms"

export const actions = {
    default: async ({ request, params }: import('./$types').RequestEvent) => {
        const contentModelHtmlName = params.contentModelHtmlName
        const formData = await request.formData()

        if (contentModelHtmlName) {
            defaultFormSubmit(contentModelHtmlName, formData, true)
        } else {
            throw error(500, "Could not upload data")
        }
    }
};null as any as Actions;