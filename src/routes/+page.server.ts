import { redirect } from "@sveltejs/kit"
import type { LayoutServerLoad } from "./admin/add/$types"

export const load: LayoutServerLoad = async ({ params }) => {
    throw redirect(303, "/site")
}