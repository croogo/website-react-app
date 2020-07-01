export default {
  site: {
    title: 'Croogo - The CakePHP powered Content Management System'
  },
  ga: {
    propertyId: '',
  },
  api: {
    baseUrl: "http://croogo-website.test/api/v1.0",
    jwksUrl: "http://croogo-website.test/.well-known/jwks.json",
    verifyOptions: {
      algorithm: 'RS256',
      issuer: 'croogo-website-api',
    }
  }
}
