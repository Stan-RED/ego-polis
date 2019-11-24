const fs = require("fs");
const crypto = require("crypto");

const MeshType = "Mesh"
const DefaultNodeSettings = {
  language: "en",
  indexfile: "index"
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
      type ${MeshType} implements Node {
        title: String!
        language: String!
        slug: String
        created: Date!
        updated: Date!
      }
    `

  createTypes(typeDefs)
}

const onCreateFile = ({ node, actions, createNodeId }) => {
  const { createNode, createParentChildLink } = actions;
  const id = createNodeId(`MESH:${node.id}`)

  /*WORK:
  {
    id: '5adad60d-c47e-562b-a639-fe23144139a1',
    children: [ '8436ea16-fb7a-59bb-ae3e-a5de14c66b09' ],
    parent: null,
    internal: {
      contentDigest: '27154e83f8a278cc886ea29c39c05e1e',
      type: 'File',
      mediaType: 'text/mdx',
      description: 'File "src\\pages\\sandbox\\egonomics\\index.ru.mdx"',
      counter: 56,
      owner: 'gatsby-source-filesystem',
      fieldOwners: { slug: 'gatsby-plugin-i18n' }
    },
    sourceInstanceName: 'pages',
    absolutePath: 'C:/Projects/ego-polis/www/src/pages/sandbox/egonomics/index.ru.mdx',
    relativePath: 'sandbox/egonomics/index.ru.mdx',
    extension: 'mdx',
    size: 6772,
    prettySize: '6.77 kB',
    modifiedTime: '2019-11-29T13:19:46.868Z',
    accessTime: '2019-11-30T08:07:52.987Z',
    changeTime: '2019-11-29T13:19:46.868Z',
    birthTime: '2019-10-24T05:22:07.085Z',
    root: 'C:/',
    dir: 'C:/Projects/ego-polis/www/src/pages/sandbox/egonomics',
    base: 'index.ru.mdx',
    ext: '.mdx',
    name: 'index.ru',
    relativeDirectory: 'sandbox/egonomics',
    dev: 2686118167,
    mode: 33206,
    nlink: 1,
    uid: 0,
    gid: 0,
    rdev: 0,
    blksize: 4096,
    ino: 3377699720572357,
    blocks: 16,
    atimeMs: 1575101272987.3286,
    mtimeMs: 1575033586867.6792,
    ctimeMs: 1575033586867.6792,
    birthtimeMs: 1571894527084.6943,
    atime: '2019-11-30T08:07:52.987Z',
    mtime: '2019-11-29T13:19:46.868Z',
    ctime: '2019-11-29T13:19:46.868Z',
    birthtime: '2019-10-24T05:22:07.085Z',
    fields: { slug: '/ru/sandbox/egonomics/' }
  }
  */
  const [title, language] = node.name.split(".");

  const meshNode = {
    id,
    children: [],
    parent: node.id,
    internal: {
      type: MeshType,
    },
    title: title,
    language: language || DefaultNodeSettings.language,
    slug: `${node.relativeDirectory}`,
    created: node.birthTime,
    updated: node.changeTime
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

  meshNode.title = node.frontmatter.title || meshNode.title;
}

const handlers = {
  "File": onCreateFile,
  "Mdx": onCreateMdx
}

exports.onCreateNode = (context) => {
  const handler = handlers[context.node.internal.type];
  handler && handler(context);
}
