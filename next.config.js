
module.exports = {
  reactStrictMode: true,
  env:{
      SANITY_API_KEY :process.env.SANITY_API_KEY,
      SANITY_PROJECT_ID:process.env.SANITY_PROJECT_ID,
      SANITY_DATASET:process.env.SANITY_DATASET,
      INDIGO_PWD:process.env.INDIGO_PWD
  },
  async rewrites() {
    return [
      // Login, Registration Section START
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
      // Login, Registration Section END

      // Manage Users Section START
      {
        source: '/api/users/list',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/users/list`,
      },
      {
        source: '/api/user/id',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/user/id`,
      },
      {
        source: '/api/update/user',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/update/user`,
      },
      {
        source: '/api/update/user/status',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/update/user/status`,
      },
      // Manage Users Section END

      // POST Section START
        // Comment Section START
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
        // Comment Section END

        // Like Section START
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
        // Like Section END

        // Saved Post Section START
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
      },
        // Saved Post Section END
      // POST Section END

      // Manage Manufacturers Section START
      {
        source:'/api/getManufacturers',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getManufacturers`
      },
      {
        source:'/api/getManufacturerById',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getManufacturerById`
      },
      {
        source:'/api/update/manufacturer',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/updateManufacturer` 
      },
      // Manage Manufacturers Section END

      // Manage Brands Section START
      {
        source:'/api/getBrands',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getBrands`
      },
      
      {
        source:'/api/getBrandById',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/getBrandById`
      },
      
      {
        source:'/api/update/brand',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/updateBrand` 
      },
      // Manage Brands Section END

      // Manage Comments Section START
      {
        source:'/api/getAllComments',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/comments` 
      },
      {
        source:'/api/getUserComment',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/user/comment` 
      },
      {
        source:'/api/remove/comment',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/remove/comment` 
      },
      {
        source:'/api/remove/reply/comment',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/remove/reply/comment` 
      },
      // Manage Comments Section END

      // Category Section START
      {
        source:'/api/create/category',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/category`
      },
      {
        source:'/api/get/categories',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/category`
      },
      {
        source:'/api/get/active/categories',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/active/category`
      },
      {
        source:'/api/update/category',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/category`
      },
      {
        source:'/api/get/category',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/get/category`
      },
      {
        source:'/api/remove/category',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/category/status`
      },
      // Category Section END

      // Market Section START
      {
        source:'/api/create/market',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/market`
      },
      {
        source:'/api/get/markets',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/market`
      },
      {
        source:'/api/get/active/markets',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/active/markets`
      },
      {
        source:'/api/update/market',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/market`
      },
      {
        source:'/api/get/market',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/get/market`
      },
      {
        source:'/api/remove/market',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/market/status`
      },
      // Market Section END

      // Manage Newsletter Section START
      {
        source:'/api/create/newsletter',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/newsletter`
      },
      {
        source:'/api/get/newsletter',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/newsletter`
      },
      {
        source:'/api/remove/newsletter',
        destination:`${process.env.EXTERNAL_RESOLVER}/api/remove/newsletter`
      },

      // Manage Newsletter Section END
    ]
  },
}

