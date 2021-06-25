import {createPreviewSubscriptionHook,createCurrentUserHook,} from 'next-sanity';

const client = {
   
    dataset: process.env.SANITY_DATASET,
    projectId: process.env.SANITY_PROJECT_ID,
    apiVersion: '2021-06-03',
    ignoreBrowserTokenWarning: true,
    useCdn: false,
  }
export const usePreviewSubscription = createPreviewSubscriptionHook(client);

export const useCurrentUser = createCurrentUserHook(client)