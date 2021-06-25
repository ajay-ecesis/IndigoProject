
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
        source: '/api/auth',
        destination: `${process.env.EXTERNAL_RESOLVER}/api/auth`,
      },
    ]
  },
}

