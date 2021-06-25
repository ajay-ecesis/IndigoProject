import { client } from "../../utils/sanity"


//new handler

//the slug here is the document id

export default async function preview(req, res) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  console.log("the query",req.query)
  if (
    req.query.secret !== process.env.SANITY_PREVIEW_SECRET ||
    !req.query.slug
  ) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check if the page with the given `slug` exists
  const page = await client.fetch(`*[_id=="${req.query.slug}"]{_type,slug->}`)
 
  // console.log("this is the page",page)
  // If the slug doesn't exist prevent preview mode from being enabled
  if (page.length<1 || !page[0].slug) {
    return res.status(401).json({ message: 'Invalid slug try again ' })
  }
  // console.log("the slug is",page[0].slug.slug.current)
  // console.log("the page type",page[0]._type)
  // Enable Preview Mode by setting the cookies
  res.setPreviewData({})

  // Redirect to the path from the fetched post
  // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities

if(page[0]._type=='post'){
    res.writeHead(307, { Location: `/post/${page[0].slug.current}` })
}
else if(page[0]._type=='siteHome'){
  res.writeHead(307, { Location: `/` })
}
else{
  res.writeHead(307, { Location: `/${page[0].slug.slug.current}` })
}

  res.end()
}