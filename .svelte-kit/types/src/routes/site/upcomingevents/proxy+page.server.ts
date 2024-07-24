// @ts-nocheck
import { UPCOMING_EVENT_CONTENT_MODEL } from '$model/upcomingEvent';
import { readContentData } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load = async () => {
  return {
    events: (await readContentData(UPCOMING_EVENT_CONTENT_MODEL, true))
      .map(it => {
        return {
          _id: it._id.toString(),
          event: it.content.event,
          date: it.content.date,
          time: it.content.time,
          description: it.content.description,
          recurrence: it.content.recurrence,
          image: it.content.image,
          imagedesc: it.content.imagedesc
        }
      })
  }
};null as any as PageServerLoad;