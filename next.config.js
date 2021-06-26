
module.exports = {
  reactStrictMode: true,
  env:{
      SANITY_API_KEY :process.env.SANITY_API_KEY,
      SANITY_PROJECT_ID:process.env.SANITY_PROJECT_ID,
      SANITY_DATASET:process.env.SANITY_DATASET,
  },
  async rewrites() {
    return [
      {
        source: '/api/login',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/login`,
      },
      {
        source: '/api/createBrand',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/brand`,
      },
      {
        source: '/api/createSupplier',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/manufacturer`,
      },
      {
        source: '/api/auth',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/auth`,
      },
      {
        source: '/api/logout',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/logout`,
      },
      {
        source: '/api/users/list',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/users/list`,
      },
      {
        source: '/api/user/id',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/user/id`,
      },
      {
        source: '/api/googlelogin',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/googlelogin`,
      },
      {
        source: '/api/brandRegGoogle',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/brand-reg-google`,
      },
      {
        source: '/api/manufactureGoogleReg',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/manufacturer-reg-google`,
      },
      {
        source: '/api/update/user',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/update/user`,
      },
      {
        source: '/api/update/user/status',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/update/user/status`,
      },
      {
        source: '/api/createComment',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/comment`,
      },
      {
        source: '/api/getComments',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/comments`,
      },
      {
        source: '/api/createReplyComment',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/reply/comment`,
      },
      {
        source: '/api/getReplyComments',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/reply/comments`,
      },
      {
        source: '/api/userlikedposts',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/userlikedposts`,
      },
      {
        source: '/api/likeblogpost',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/likepost`,
      },
      {
        source: '/api/unlikeblogposts',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/unlike`,
      },
      {
        source: '/api/likefromlist',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/likefromlist`,
      },
      {
        source:'/api/getManufacturers',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getManufacturers`
      },
      {
        source:'/api/getBrands',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getBrands`
      },
      {
        source:'/api/getManufacturerById',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getManufacturerById`
      },
      {
        source:'/api/getBrandById',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getBrandById`
      },
      {
        source:'/api/update/manufacturer',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/updateManufacturer` 
      },
      {
        source:'/api/update/brand',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/updateBrand` 
      },
      {
        source:'/api/save/post',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/save/post` 
      },
      {
        source:'/api/user/saved/posts',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/user/saved/posts` 
      },
      {
        source:'/api/user/remove/saved/post',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/user/remove/saved/post` 
      }
    ]
  },
}

