// @ts-nocheck
import { CONTACT_FORM_CONTENT_MODEL } from "$lib/model/contactForm";
import { getUserContentModels } from "$lib/server/content"
import { loadContent } from "$lib/server/contentNav";
import type { ContentModel } from "$lib/server/interfaces"
import type { LayoutServerLoad } from "./$types";

export const load = async ({ params }: Parameters<LayoutServerLoad>[0]) => {

    const contentModelHtmlName: string | undefined = params.contentModelHtmlName
    const contentModels: ContentModel[] = (await getUserContentModels()).filter(it => {
        return it.htmlName !== CONTACT_FORM_CONTENT_MODEL.htmlName
    })

    return loadContent(contentModelHtmlName, contentModels, "/admin/approve/")
}