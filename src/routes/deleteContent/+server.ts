import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { deleteContentDataById, getContentById } from '$lib/server/content';  // Adjust the path as necessary

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.formData();
        const cardBodyId = data.get('cardBodyId')?.toString();
        const subject = data.get('subject')?.toString();
        const message = data.get('message')?.toString();
        const phone = data.get('phone')?.toString();
        const email = data.get('email')?.toString();

        console.log('Delete request received with the following data:');
        console.log(`cardBodyId: ${cardBodyId}`);
        console.log(`subject: ${subject}`);
        console.log(`message: ${message}`);
        console.log(`phone: ${phone}`);
        console.log(`email: ${email}`);

        const modelName = 'Contact Message'; // Ensure this is correct
        console.log(`Deleting from collection: ${modelName} with id: ${cardBodyId}`);

        if (cardBodyId) {
            await deleteContentDataById(modelName, cardBodyId);

            // Verify deletion
            const deletedDocument = await getContentById(modelName, cardBodyId);
            if (deletedDocument) {
                console.error(`Failed to delete document with id: ${cardBodyId}`);
                return json({ success: false, error: 'Failed to delete message' }, { status: 500 });
            } else {
                return json({ success: true });
            }
        } else {
            return json({ success: false, error: 'Invalid cardBodyId' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error handling delete request:', error);
        return json({ success: false, error: 'Failed to delete message' }, { status: 500 });
    }
    
};
