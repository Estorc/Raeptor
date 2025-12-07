
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/about"
  },
  {
    "renderMode": 2,
    "route": "/works"
  },
  {
    "renderMode": 2,
    "route": "/works/2DFluidSimulation"
  },
  {
    "renderMode": 2,
    "route": "/works/3DSoftBody"
  },
  {
    "renderMode": 2,
    "route": "/works/3DSoftBodyPureJS"
  },
  {
    "renderMode": 2,
    "route": "/works/In-the-hall-of-the-King-Kong"
  },
  {
    "renderMode": 2,
    "route": "/works/museum"
  },
  {
    "renderMode": 2,
    "route": "/works/Welcome-to-Red-Zone"
  },
  {
    "renderMode": 2,
    "route": "/works/You-gonna-be-eaten-by-a-fish"
  },
  {
    "renderMode": 2,
    "route": "/works/You-gonna-have-a-Genophobia"
  },
  {
    "renderMode": 2,
    "route": "/works/old"
  },
  {
    "renderMode": 2,
    "route": "/works/old/Les voleurs d'esprit"
  },
  {
    "renderMode": 2,
    "route": "/works/old/Oujnish Game"
  },
  {
    "renderMode": 2,
    "route": "/works/old/The Dark Storm"
  },
  {
    "renderMode": 0,
    "route": "/works/*"
  },
  {
    "renderMode": 0,
    "route": "/works/*/*"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 3179, hash: 'b787bcc01297a4e2032e444197182bbb03f14246fa705760899d1ff65b23bdc5', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1092, hash: 'e4b26b4913c03a1435d2a3acf68c4a45bd8d1354d5c7858916249d4632e475ab', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 61991, hash: '0225ba7a8217006756517d924c7ceaecacabc6897144c71531c11cc7ebf0b6a8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19941, hash: '556e31743be106fa6118275c9100795f8c7c574db98e8c76eae03d3ca75d85be', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'works/3DSoftBody/index.html': {size: 7011, hash: '01b11947eab180edabe9b6514b58f4fcd2d40c669d199445d159159ca6b74128', text: () => import('./assets-chunks/works_3DSoftBody_index_html.mjs').then(m => m.default)},
    'works/In-the-hall-of-the-King-Kong/index.html': {size: 7029, hash: '53290c536a47c3e7866ff236d9b7b2806c3dc13446c8ab3b15100c54fbf94e49', text: () => import('./assets-chunks/works_In-the-hall-of-the-King-Kong_index_html.mjs').then(m => m.default)},
    'works/3DSoftBodyPureJS/index.html': {size: 7017, hash: 'e6e3266c9884c10c4d7c8c7dcbe6e10a112327c1908b164eab871b2ecac5ef44', text: () => import('./assets-chunks/works_3DSoftBodyPureJS_index_html.mjs').then(m => m.default)},
    'works/Welcome-to-Red-Zone/index.html': {size: 7020, hash: '7534f7751cdf063c38c23d392cd263dd33ba5572ee6fda9d868e9d7a64875b47', text: () => import('./assets-chunks/works_Welcome-to-Red-Zone_index_html.mjs').then(m => m.default)},
    'works/museum/index.html': {size: 7018, hash: '6fd28e92a408e3556792c1292038639ff74e3b8163cf74eea662382c56fc1e5f', text: () => import('./assets-chunks/works_museum_index_html.mjs').then(m => m.default)},
    'works/You-gonna-be-eaten-by-a-fish/index.html': {size: 7029, hash: '949c454e51bafe6bc3f825e25f17a322897c5466a34bbba098a7975084293e80', text: () => import('./assets-chunks/works_You-gonna-be-eaten-by-a-fish_index_html.mjs').then(m => m.default)},
    'works/You-gonna-have-a-Genophobia/index.html': {size: 7028, hash: '2f29a6ea82ac2447f7ab60bc64119a6558476289666b23249d50fb93d40d777f', text: () => import('./assets-chunks/works_You-gonna-have-a-Genophobia_index_html.mjs').then(m => m.default)},
    'works/2DFluidSimulation/index.html': {size: 7018, hash: 'c63b80feeb3e0b8f419645afe0ea1a259433195b9b272a48ed85dc676d21a4fa', text: () => import('./assets-chunks/works_2DFluidSimulation_index_html.mjs').then(m => m.default)},
    'works/index.html': {size: 24095, hash: '3159e3e317ef937a45d79be9e382af86df1ae3ec17bed616bcf89d05533d7228', text: () => import('./assets-chunks/works_index_html.mjs').then(m => m.default)},
    'works/old/Les voleurs d'esprit/index.html': {size: 7025, hash: '18000f8e25a44a5905f1d88febe82f25dcab1ca9b50406747beca9e708c93004', text: () => import('./assets-chunks/works_old_Les voleurs d'esprit_index_html.mjs').then(m => m.default)},
    'works/old/index.html': {size: 7004, hash: 'e07207ecab74710761bb1fbc975c9edda3161cb1d3d38149870c0057a1327e0a', text: () => import('./assets-chunks/works_old_index_html.mjs').then(m => m.default)},
    'works/old/Oujnish Game/index.html': {size: 7017, hash: '15708326e09244c6ee60be8258c1e042870cd4583cb8bf366638e1edde65604b', text: () => import('./assets-chunks/works_old_Oujnish Game_index_html.mjs').then(m => m.default)},
    'works/old/The Dark Storm/index.html': {size: 7019, hash: 'c809847958a70273e77ab1403896dc64a737daf40d2b8721cab76c15f6a75fb9', text: () => import('./assets-chunks/works_old_The Dark Storm_index_html.mjs').then(m => m.default)},
    'styles-22NTZXPI.css': {size: 201603, hash: 'OWIs7XJ4Svg', text: () => import('./assets-chunks/styles-22NTZXPI_css.mjs').then(m => m.default)}
  },
};
