import { SESSION_TIMEOUT } from "$env/static/private";
import { checkSessionId, refreshSession } from "$lib/server/auth";
import { initDatabase } from "$lib/server/init";
import type { Handle } from "@sveltejs/kit";

/** IMPORTANT:
 * 
 * The hooks.server.ts file behaves differently in production than 
 * in dev mode (with HMR). In particular, this function will ONLY
 * run on APP STARTUP in production. In dev (HMR), it ONLY runs upon the
 * first REQUEST.
 * 
 * Hence, the database will be set up before the first request in 
 * production.
 */
await initDatabase()
/**
 * Runs session check every time a request is made to the server, 
 * ensuring that the user is redirected to the login screen if the 
 * session times out (or they haven't logged in).
 */
export const handle: Handle = async ({ event, resolve }) => {
    if (event.url.pathname.startsWith('/admin')) {
        const sessionId = event.cookies.get('Session ID');
        if(sessionId) {
            if(await checkSessionId(sessionId)) {
                const expireDate = new Date(Date.now() + parseInt(SESSION_TIMEOUT))
                const currentDate = new Date(Date.now());
                refreshSession(sessionId, currentDate);
                event.cookies.set('Session ID', sessionId, {
                    path: "/",
                    expires: expireDate
                })
            } else {
                return new Response ('Redirect', {status: 303, headers: { Location: '/login'}});
            }
        } else {
            return new Response ('Redirect', {status: 303, headers: { Location: '/login'}});
        }
    }
   
    const response = await resolve(event);
    return response;
}