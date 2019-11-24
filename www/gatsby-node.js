const crypto = require("crypto");

const MeshType = "Mesh"
const DefaultNodeSettings = {
  language: "en",
  status: "draft",
  indexfile: "index"
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
      type ${MeshType} implements Node {
        title: String!
        language: String!
        slug: String
        created: Date! @dateformat
        updated: Date! @dateformat
        status: String
        component: String
      }
    `

  createTypes(typeDefs)
}

const onCreateFile = async ({ node, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;
  const id = createNodeId(`MESH:${node.id}`)
  const [title, language] = node.name.split(".");
  const slug = title === DefaultNodeSettings.indexfile ? "" : title;

  const meshNode = {
    id,
    children: [],
    parent: node.id,
    internal: {
      type: MeshType,
    },
    title,
    language: language || DefaultNodeSettings.language,
    slug: `${node.relativeDirectory}/${slug}`, //WORK:
    created: node.birthTime,
    updated: node.changeTime
  }

  meshNode.internal.contentDigest = crypto
    .createHash("md5")
    .update(JSON.stringify(meshNode))
    .digest("hex");

  await createNode(meshNode);
  await createParentChildLink({ parent: node, child: meshNode });
}

const onCreateMdx = ({ node, getNode, getNodesByType }) => {
  const fileNode = getNode(node.parent);
  const [meshNode] = getNodesByType(MeshType)
    .filter(mesh => mesh.parent === node.parent)
    ;

  Object.assign(meshNode, {
    title: node.frontmatter.title || meshNode.title,
    slug: node.frontmatter.slug || meshNode.slug,
    status: node.frontmatter.status || DefaultNodeSettings.status,
    component: fileNode.absolutePath,
  });
}

const handlers = {
  "File": onCreateFile,
  "Mdx": onCreateMdx
}

exports.onCreateNode = async (context) => {
  const handler = handlers[context.node.internal.type];
  handler && handler(context);
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const { data: { allMesh: { edges } } } = await graphql(`
    query {
      allMesh(filter: {status: {ne: null}}) {
        edges {
          node {
            id
            title
            language
            slug
            component
            status
          }
        }
      }
    }
  `)

  edges.forEach(async ({ node }, index) => {
    const page = {
      path: `${node.language}/${node.slug}`, //WORK:
      component: node.component,
      context: { mesh: node },
    };

    await createPage(page);
  })
};
