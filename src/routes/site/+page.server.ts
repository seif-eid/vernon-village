import { PHOTO_GALLERY_CONTENT_MODEL } from '$model/photoGallery';
import { readContentData } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {
    photos: (await readContentData(PHOTO_GALLERY_CONTENT_MODEL, true))
      .map(it => {
        return {
          _id: it._id.toString(),
          image: it.content.image,
          imagedesc: it.content.imagedesc,
          time: it.content.date
        }
      })
  }
}