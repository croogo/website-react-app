const apiConfig = {
  token: process.env.REACT_APP_API_TOKEN,
  baseUrl: process.env.REACT_APP_API_BASEURL + '/api/v1.0',
  jwksUrl: process.env.REACT_APP_API_BASEURL + '/.well-known/jwks.json',
  verifyOptions: {
    algorithm: 'RS256',
    issuer: 'croogo-website-api',
  }
};

export default {
  site: {
    name: 'Croogo',
    title: 'Croogo - The CakePHP powered Content Management System',
  },
  ga: {
    propertyId: process.env.REACT_APP_GA_PROPERTY_ID,
  },
  api: { ...apiConfig }
}
