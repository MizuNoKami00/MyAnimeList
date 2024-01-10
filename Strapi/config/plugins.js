module.exports = ({ env }) => ({
    upload: {
      config: {
        provider: 'cloudinary',
        providerOptions: {
          cloud_name: env('img'),
          api_key: env("963946317165425"),
          api_secret: env('W-w1v03N7pQa4i4Zf09NEl0lQFs'),
        },
        actionOptions: {
          upload: {},
          delete: {},
        },
      },
    }
  });