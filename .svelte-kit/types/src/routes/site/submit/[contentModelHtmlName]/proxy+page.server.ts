// @ts-nocheck
import { error, type Actions } from "@sveltejs/kit"
import { defaultFormSubmit } from "$lib/server/forms"
import { validate } from 'email-validator'

export const actions = {
    default: async ({ request, params }: import('./$types').RequestEvent) => {
        const contentModelHtmlName = params.contentModelHtmlName
        const formData = await request.formData()
        const email = formData.get('email')

        if (contentModelHtmlName) {
            if (email == "") return { badEmail: true }
            if (email && !validate(email.toString())) return { badEmail: true }
            await defaultFormSubmit(contentModelHtmlName, formData, false)
            return { success: true }
        } else {
            throw error(500, "Could not upload data")
        }
    }
};null as any as Actions;