// @ts-nocheck
import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./admin/add/$types"

export const load = async ({ params }: Parameters<LayoutServerLoad>[0]) => {
    throw redirect(303, "/site")
}