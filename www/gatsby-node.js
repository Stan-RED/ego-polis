const fs = require("fs");
const crypto = require("crypto");

const MeshType = "Mesh"

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
      type ${MeshType} implements Node {
        slug: String
        language: String
      }
    `

  createTypes(typeDefs)
}

const onCreateFile = ({ node, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;
  const id = createNodeId(`MESH:${node.id}`)

  const meshNode = {
    id,
    children: [],
    parent: node.id,
    internal: {
      type: MeshType,
    },
    language: "en" //WORK:Default settings
  }

  meshNode.internal.contentDigest = crypto
    .createHash("md5")
    .update(JSON.stringify(meshNode))
    .digest("hex");

  createNode(meshNode);
  createParentChildLink({ parent: node, child: meshNode });
}

const onCreateMdx = ({ node, getNodesByType }) => {
  const [meshNode] = getNodesByType(MeshType)
    .filter(mesh => mesh.parent === node.parent)
    ;

  meshNode.language = "ru"; //WORK:
  console.log("meshNode", meshNode);
}

const handlers = {
  "File": onCreateFile,
  "Mdx": onCreateMdx
}

exports.onCreateNode = (context) => {
  const handler = handlers[context.node.internal.type];
  handler && handler(context);
}
