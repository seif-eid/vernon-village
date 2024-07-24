// @ts-nocheck
import {  getUserContentModels } from "$lib/server/content"
import { loadContent } from "$lib/server/contentNav";
import type { ContentModel } from "$lib/server/interfaces"
import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = async ({ params }: Parameters<LayoutServerLoad>[0]) => {

    const contentModelHtmlName: string | undefined = params.contentModelHtmlName
    const contentModels: ContentModel[] = await getUserContentModels()

    return loadContent(contentModelHtmlName, contentModels, "/site/submit/")
}