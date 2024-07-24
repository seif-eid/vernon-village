import bcrypt from 'bcrypt';
import db from '$server/mongo';

/**
 * Checks the the user-entered password against a hashed password belonging to an Administrator Contact record
 * with an email that matches the user-entered email.
 * @param email email/username entered by user at login
 * @param password password entereed by user at login
 * @returns true if email and password match, false if email or password do not match
 */
export async function authenticateUser(email: string, password: string) {
    try {
        const normalizedEmail = email.toLowerCase(); // normalize email
        const user = await db.collection('Administrator Contact').findOne({"content.email": normalizedEmail});

        if (user && user.content && user.content.password) {
            if(await bcrypt.compare(password, user.content.password)) {
                return true;
            }
        }
    } catch (error) {
        console.error('Error during authentication', error);
    }

    return false;
}
/**
 * Checks if the session ID stored in user's cookies matches any session ID in the database.
 * @param sessionId unique session ID for user, generated upon successful login (admin)
 */
export async function checkSessionId(sessionId: string) {
    const session = await db.collection('Session').findOne({'sessionId': sessionId});
    if(session){
        return true;
    } else {
        return false;
    }
}
/**
 * Inserts or updates a session stored in the database with the configured expire time.
 * @param sessionId unique session ID for user, generated upon successful login (admin)
 * @param expireTime current time to be passed to database (database will expire record based on expireTime + SESSION_TIMEOUT env variable)
 */
export async function refreshSession(sessionId: string, expireTime: Date) {
    db.collection('Session').updateOne(
        { "sessionId": sessionId },
        { $set: { "lastModifiedDate": expireTime} }
    );
}