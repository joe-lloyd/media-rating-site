const { resolve } = require('node:path');
const path = require('node:path');

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }
    type Frontmatter {
      title: String
      date: Date
      slug: String
    }
  `)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  console.log("Creating pages")
  const { createPage } = actions

  const result = await graphql(`
      query {
          allMdx {
              nodes {
                  id
                  frontmatter {
                      slug
                  }
                  internal {
                      contentFilePath
                  }
              }
          }
      }
  `)

  if (result.errors) {
    reporter.panicOnBuild('Error loading MDX result', result.errors)
  }

  const posts = result.data.allMdx.nodes

  posts.forEach(node => {
    const [_, contentType, ...__] = node.internal.contentFilePath.split('/').reverse()
    const templatePath = path.resolve(`src/templates/${contentType}/[id].tsx`);

    const componentPath = resolve(`${templatePath}?__contentFilePath=${node.internal.contentFilePath}`)

    console.log(componentPath)

    createPage({
      // As mentioned above you could also query something else like frontmatter.title above and use a helper function
      // like slugify to create a slug
      path: `${contentType}/${node.frontmatter.slug}`,
      // Provide the path to the MDX content file so webpack can pick it up and transform it into JSX
      component: componentPath,
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    })
  })
}
