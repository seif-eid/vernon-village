import { error, type Actions } from "@sveltejs/kit"
import { authenticateUser, checkSessionId } from "$server/auth"
import { SESSION_TIMEOUT } from "$env/static/private";
import db from '$server/mongo';
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ cookies }) => {
    let authenticated = false;
    if(cookies.get('Session ID')){
        if(await checkSessionId(cookies.get('Session ID')!)) {
            authenticated = true;
        }
    }
    return {authenticated: authenticated};
};

export const actions: Actions = {
    authenticate: async ({ request, cookies }) => {
        const formData = await request.formData()

        if (formData.get('email') && formData.get('password')) {
            const email = formData.get('email')!.toString();
            const password = formData.get('password')!.toString();

            if(await authenticateUser(email, password)) {
                const sessionId = crypto.randomUUID();
                const expireDate = new Date(Date.now() + parseInt(SESSION_TIMEOUT));
                const currentDate = new Date(Date.now());
                cookies.set('Session ID', sessionId, {
                    path: '/',
                    expires: expireDate
                })
                await db.collection("Session").insertOne({"sessionId": sessionId, "lastModifiedDate": currentDate})

                return { body: { message: "Authentication successful" } };
            } else {
                throw error(500, `Authentication failed. Email: ${email}, Password: ${password}`);
            }
        } else {
            throw error(500, "Please enter a username and password");
        }
    },
    logout: async ({ cookies }) => {
        cookies.delete('Session ID');
        return { body: { message: "Logout successful" } };
    },
};