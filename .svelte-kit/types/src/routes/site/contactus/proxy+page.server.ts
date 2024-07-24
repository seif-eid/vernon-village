// @ts-nocheck
import { CONTACT_FORM_CONTENT_MODEL } from "$lib/model/contactForm"
import { getContentModelByHtmlName } from "$lib/server/content"
import { defaultFormSubmit } from "$lib/server/forms"
import type { ContentModel } from "$lib/server/interfaces"
import { error, type Actions } from "@sveltejs/kit"
import type { LayoutServerLoad } from "../submit/$types"

export const load = async ({ params }: Parameters<LayoutServerLoad>[0]) => {

    const contentModelHtmlName: string = CONTACT_FORM_CONTENT_MODEL.htmlName
    const contactFormModel: ContentModel | null = await getContentModelByHtmlName(contentModelHtmlName)

    if (contactFormModel) {
        return {
            contactFormModel: contactFormModel
        }
    } else {
        throw error(500, "Could not load Contact Form content model")
    }
}

export const actions = {
    default: async ({ request }: import('./$types').RequestEvent) => {
        const contentModelHtmlName = CONTACT_FORM_CONTENT_MODEL.htmlName
        const formData = await request.formData()
        
        if (contentModelHtmlName) {
            defaultFormSubmit(contentModelHtmlName, formData, false)
        } else {
            throw error(500, "Unable to contact the administrators")
        }
    }
};null as any as Actions;