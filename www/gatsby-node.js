const crypto = require("crypto");

const MeshType = "Mesh"
const DefaultNodeSettings = {
  status: "draft",
  indexfile: "index"
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
      type ${MeshType} implements Node {
        path: String!
        title: String!
        language: String
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
  const [name, language] = node.name.split(".");

  let path = node.relativeDirectory.replace(/^\/+|\/+$/g, '');
  let slug = name;
  if (name === DefaultNodeSettings.indexfile) {
    slug = path.split("/").pop();
  } else {
    path = `${path}/${name}`
  }

  const meshNode = {
    id,
    children: [],
    parent: node.id,
    internal: {
      type: MeshType,
    },

    path,
    slug,
    title: slug,
    language,
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

exports.createPages = async ({ getNodesByType, actions }) => {
  const { createPage } = actions;
  const mesh = getNodesByType(MeshType)
    .filter(node => node.component && node.status)
    .sort((prev, next) =>
      prev.path.localeCompare(next.path) * 10
      + (prev.language || "").localeCompare(next.language || "")
    );

  mesh.forEach(async (node, index) => {
    const path = node.language ? `/${node.language}/${node.slug}` : `/${node.slug}`;

    const page = {
      path,
      component: node.component,
      context: { mesh: node },
    };

    console.log(`${page.path} (${node.language}:${node.path}) ${node.title} ${node.component}`); //WORK:

    await createPage(page);
  })
};
