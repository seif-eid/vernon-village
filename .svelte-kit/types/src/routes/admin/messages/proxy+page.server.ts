// @ts-nocheck
import { readContactMessages } from "$lib/server/content"
import type { LayoutServerLoad } from "../add/$types"

export const load = async () => {
    return {
        messages: (await readContactMessages()).map(it => {
            return {
                _id: it._id.toString(),
                subject: it.content.subject,
                message: it.content.message,
                phone: it.content.phone,
                email: it.content.email
            }
        })
    }
};null as any as LayoutServerLoad;