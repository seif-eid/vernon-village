// @ts-nocheck
import { error, redirect, type Actions } from "@sveltejs/kit"
import { editFormSubmit } from "$lib/server/forms"
import type { ContentModel } from "$lib/server/interfaces"
import { getContentById } from "$lib/server/content"
import { getAdminContentModels } from "$lib/server/content"
import { loadContent } from "$lib/server/contentNav";
import type { PageServerLoad } from "./$types"

export const load = async ({ params, url }: Parameters<PageServerLoad>[0]) => {

    const contentModelHtmlName: string | undefined = params.contentModelHtmlName
    const contentModels: ContentModel[] = await getAdminContentModels()
    
    let id = (url.searchParams.get('id'));
    let name = (url.searchParams.get('name'));
    const record = await getContentById(name!, id!);
    let fields = record?.content;
    
    return loadContent(contentModelHtmlName, contentModels, "/admin/edit/", fields);

}

export const actions = {
    default: async ({ request, params, url }: import('./$types').RequestEvent) => {
        const contentModelHtmlName = params.contentModelHtmlName
        const formData = await request.formData();
        const id = url.searchParams.get('id');
        if (contentModelHtmlName) {
            await editFormSubmit(contentModelHtmlName, formData, id);
            throw redirect(303, '/admin/read/'+contentModelHtmlName);
        } else {
            throw error(500, "Could not upload data");
        }
    }
};null as any as Actions;