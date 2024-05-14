/** @type {import('next').NextConfig} */
const nextConfig = {
    // exportPathMap: async function () {
    //     return {
    //       '/': { page: '/file' }
    //     }
    // }
    plugins: ['@next/bundle-analyzer', '@next/font'],
    webpack: (config) => {
          config.resolve.alias.canvas = false;
        
          return config;
        },
}

module.exports = nextConfig

// module.exports = {
//     i18n: {
//       locales: ['en-US', 'fr', 'nl-NL'],
//       defaultLocale: 'nl-NL',
//     },
//   }