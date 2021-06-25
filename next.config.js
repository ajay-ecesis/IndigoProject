
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
      
    ]
  },
}

