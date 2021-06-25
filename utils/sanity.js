const sanityClient = require('@sanity/client')


export const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2021-06-03', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_API_KEY, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
  ignoreBrowserTokenWarning: true
})



export const clientRead = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: '2021-06-03', // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
})


