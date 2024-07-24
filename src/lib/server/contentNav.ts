import type { ContentModel } from "$server/interfaces";
import { error, redirect } from "@sveltejs/kit";

export async function loadContent(
    contentModelHtmlName: string | undefined, 
    contentModels: ContentModel[],
    slugRoot: string,
    fields: JSON | undefined = undefined
) {
    let activeContentModel: ContentModel | null = null

    if (!contentModels) {
        throw error(404, "Could not load content models")
    } else if (!contentModelHtmlName) {
        throw redirect(303, slugRoot + contentModels[0].htmlName)
    }

    for (const contentModel of contentModels) {
        if (contentModel.htmlName === contentModelHtmlName) {
            activeContentModel = contentModel
            break;
        }
    }

    if (activeContentModel == null) {
        activeContentModel = contentModels[1]
    }

    return {
        activeContentModel: activeContentModel,
        contentModels: contentModels,
        fields: fields
    }
}