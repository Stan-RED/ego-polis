const fs = require("fs");
const crypto = require("crypto");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
      type Mesh implements Node {
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
      type: "Mesh",
    },
  }

  meshNode.internal.contentDigest = crypto
    .createHash("md5")
    .update(JSON.stringify(meshNode))
    .digest("hex");

  createNode(meshNode);
  createParentChildLink({ parent: node, child: meshNode });
}

const handlers = {
  "File": onCreateFile
}

exports.onCreateNode = (context) => {
  const handler = handlers[context.node.internal.type];
  handler && handler(context);
}
