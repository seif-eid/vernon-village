// @ts-nocheck
import { COMMUNITY_GROUP_CONTENT_MODEL } from '$model/communityGroup';
import { readContentData } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load = async function () {
  return {
    groups: (await readContentData(COMMUNITY_GROUP_CONTENT_MODEL, true))
      .map(it => {
        return {
          _id: it._id.toString(),
          group: it.content.group,
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