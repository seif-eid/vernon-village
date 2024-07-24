import { deleteContentDataById, getContentModelByHtmlName, readContentData } from "$lib/server/content"
import type { ContentModel } from "$lib/server/interfaces"
import type { Document, WithId } from "mongodb"
import type { LayoutServerLoad } from "../$types"
import type { Actions } from "./$types"

export const load: LayoutServerLoad = async ({ params }) => {
    // TODO
    const contentModelHtmlName: string | undefined = params.contentModelHtmlName
    
    if (contentModelHtmlName) {
        const activeContentModel: ContentModel | null = await getContentModelByHtmlName(contentModelHtmlName)
        if (activeContentModel) {
            const mongoDocuments: WithId<Document>[] = await readContentData(activeContentModel, true)
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

export const actions: Actions = {
    deleteContent: async ( {request} ) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const name = formData.get('name');
        if (name && id) {
            deleteContentDataById(name.toString(), id.toString());
        }
        return;
    },
    editContent: async ( {request} ) => {
        const formData = await request.formData();
        const id = formData.get('id');
        const name = formData.get('name');
        return;
    }

}