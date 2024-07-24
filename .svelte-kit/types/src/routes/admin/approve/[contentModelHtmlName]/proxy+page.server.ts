// @ts-nocheck
import { getContentModelByHtmlName, readContentData, deleteContentDataById, approveContentById } from "$lib/server/content"
import type { ContentModel } from "$lib/server/interfaces"
import type { Document, WithId } from "mongodb"
import type { LayoutServerLoad } from "../$types"
import type { Actions } from "./$types"

export const load = async ({ params }: Parameters<LayoutServerLoad>[0]) => {
    // TODO
    const contentModelHtmlName: string | undefined = params.contentModelHtmlName
    
    if (contentModelHtmlName) {
        const activeContentModel: ContentModel | null = await getContentModelByHtmlName(contentModelHtmlName)
        if (activeContentModel) {
            const mongoDocuments: WithId<Document>[] = await readContentData(activeContentModel, false)
            const mongoMaps= mongoDocuments.map(it => {
                return new Map(Object.entries(JSON.parse(JSON.stringify(it))))
            })
            return {
                activeContentModel: activeContentModel, 
                mongoDocuments: mongoMaps
            }
        }
    } 

    
}

export const actions = {
    rejectContent: async ( {request}: import('./$types').RequestEvent ) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const name = formData.get('name');
        if (name && id) {
            deleteContentDataById(name.toString(), id.toString());
        }
        return;
    },
    approveContent: async ( {request}: import('./$types').RequestEvent ) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const name = formData.get('name');
        console.log(id);
        if (name && id) {
            approveContentById(name.toString(), id.toString());
        }
        return;
    }

};null as any as Actions;