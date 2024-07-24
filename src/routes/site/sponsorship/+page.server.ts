import { SPONSORSHIP_CONTENT_MODEL } from '$model/sponsorship';
import { readContentData } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function () {
  return {
    sponsors: (await readContentData(SPONSORSHIP_CONTENT_MODEL, true))
      .map(it => {
        return {
          _id: it._id.toString(),
          sponsor: it.content.sponsor,
          description: it.content.description,
          image: it.content.image,
          imagedesc: it.content.imagedesc,
        }
      })
  }
}