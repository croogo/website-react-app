const prod = {
  token: '',
  baseUrl: '',
  jwksUrl: '',
  verifyOptions: {
    algorithm: 'RS256',
    issuer: '',
  }
};

const local = {
  token: '',
  baseUrl: 'http://croogo-website.test/api/v1.0',
  jwksUrl: 'http://croogo.website.test/.well-known/jwks.json',
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
    propertyId: '',
  },
  api: { ...prod }
}
