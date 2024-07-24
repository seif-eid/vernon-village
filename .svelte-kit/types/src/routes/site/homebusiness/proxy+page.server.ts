// @ts-nocheck
import { HOME_BUSINESS_CONTENT_MODEL } from '$model/homeBusiness';
import { readContentData } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load = async function () {
  return {
    businesses: (await readContentData(HOME_BUSINESS_CONTENT_MODEL, true))
      .map(it => {
        return {
          _id: it._id.toString(),
          business: it.content.business,
          description: it.content.description,
          image: it.content.image,
          imagedesc: it.content.imagedesc,
          link: it.content.link,
          phone: it.content.phone,
          email: it.content.email
        }
      })
  }
};null as any as PageServerLoad;