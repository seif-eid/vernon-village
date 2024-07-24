// @ts-nocheck
import { error, type Actions } from "@sveltejs/kit"
import { authenticateUser, checkSessionId } from "$server/auth"
import { SESSION_TIMEOUT } from "$env/static/private";
import db from '$server/mongo';
import type { PageServerLoad } from "../$types";

export const load = async ({ cookies }: Parameters<PageServerLoad>[0]) => {
    let authenticated = false;
    if(cookies.get('Session ID')){
        if(await checkSessionId(cookies.get('Session ID')!)) {
                authenticated = true;
        }
    }
    return {authenticated: authenticated};
}
export const actions = {

    authenticate: async ({ request, cookies }: import('./$types').RequestEvent) => {
        const formData = await request.formData()

        if (formData.get('email') && formData.get('password')) {
            if(await authenticateUser(formData.get('email')!.toString(), formData.get('password')!.toString())) {
                const sessionId = crypto.randomUUID();
                const expireDate = new Date(Date.now() + parseInt(SESSION_TIMEOUT));
                const currentDate = new Date(Date.now());
                cookies.set('Session ID', sessionId, {
                    path: '/',
                    expires: expireDate
                })
                await db.collection("Session").insertOne({"sessionId": sessionId, "lastModifiedDate": currentDate})

            } else {
                throw error(500, "Please enter a valid username and password");
            }
        } else {
            throw error(500, "Please enter a username and password");
        }
    },

    logout: async ({ cookies }: import('./$types').RequestEvent) => {
        cookies.delete('Session ID')
    }
};null as any as Actions;