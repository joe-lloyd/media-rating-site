import type { GatsbyConfig } from 'gatsby';
import remarkGfm from 'remark-gfm';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Media Rating Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        'icon': `${__dirname}/src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            remarkGfm,
          ],
        },
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 80,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'images',
        'path': `${__dirname}/src/content/images/`,
      },
      __key: 'images',
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'movies',
        'path': `${__dirname}/src/content/movies`,
      },
      __key: 'movies',
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'video-games',
        'path': `${__dirname}/src/content/video-games`,
      },
      __key: 'video-games',
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'albums',
        'path': `${__dirname}/src/content/albums`,
      },
      __key: 'albums',
    }, {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'tv-series',
        'path': `${__dirname}/src/content/tv-series`,
      },
      __key: 'tv-series',
    }],
};

export default config;
