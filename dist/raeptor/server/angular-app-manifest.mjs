
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
    'index.csr.html': {size: 3179, hash: '18518b96f6d250a9253b5c53da7a3a66dc785c77f3980d4e0ed7db3161c1ce58', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1092, hash: '9a8150eab2b472ff84abb8bebe332770c2ac29be0d8cd537cdbafa58652e6c3b', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19941, hash: 'e5d3c5cd5764b26804e0885d34ba3a46959e0d1c28dd8a8946861d7c5b067b77', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'works/3DSoftBody/index.html': {size: 7000, hash: '544deee11c55323dd1e6d5338805deeb81fb04732e1d3942fec822a1c0460805', text: () => import('./assets-chunks/works_3DSoftBody_index_html.mjs').then(m => m.default)},
    'works/3DSoftBodyPureJS/index.html': {size: 7006, hash: 'ebadaaebf38531970855e98c994ec2d237f7d5cd913a995a3546e94903b76f6e', text: () => import('./assets-chunks/works_3DSoftBodyPureJS_index_html.mjs').then(m => m.default)},
    'works/2DFluidSimulation/index.html': {size: 7007, hash: '7e99a27393e166ba0eb64a8012c8d5f19618f3eaf4be9a8227b235ac2bcdf238', text: () => import('./assets-chunks/works_2DFluidSimulation_index_html.mjs').then(m => m.default)},
    'works/In-the-hall-of-the-King-Kong/index.html': {size: 7018, hash: 'bdec35eeafa289d1b565f413f9ad7c17b2782f00769aa115c83e45acffbcb141', text: () => import('./assets-chunks/works_In-the-hall-of-the-King-Kong_index_html.mjs').then(m => m.default)},
    'works/index.html': {size: 24095, hash: '7d3cbad02e31524a320e17125031c681e2b97b290dd04d64b4fd4c419abe5b0b', text: () => import('./assets-chunks/works_index_html.mjs').then(m => m.default)},
    'index.html': {size: 62006, hash: '36db0124ea812bf729a41802ecc22ac1351b126299bdd6b289bfe35e0850cd81', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'works/Welcome-to-Red-Zone/index.html': {size: 7009, hash: '26a52be67cc91f12bab47879735aca3b3fe283ecc985b24801cc16a766684b49', text: () => import('./assets-chunks/works_Welcome-to-Red-Zone_index_html.mjs').then(m => m.default)},
    'works/You-gonna-be-eaten-by-a-fish/index.html': {size: 7018, hash: '85519379c92ea2fafa01ef9f31d91ee824fdf33b3f1461c30f86bb3bb9ee827b', text: () => import('./assets-chunks/works_You-gonna-be-eaten-by-a-fish_index_html.mjs').then(m => m.default)},
    'works/museum/index.html': {size: 7007, hash: '6ef588308d0fc7d4b27bcfa2ce84abb0c34efc167657034c5febc837c9addd39', text: () => import('./assets-chunks/works_museum_index_html.mjs').then(m => m.default)},
    'works/You-gonna-have-a-Genophobia/index.html': {size: 7017, hash: '25bc02f62275c6ca989e916d726953ad55d81b7b15379c8fc2e38495da08d4c6', text: () => import('./assets-chunks/works_You-gonna-have-a-Genophobia_index_html.mjs').then(m => m.default)},
    'works/old/index.html': {size: 6993, hash: 'df0438168f524aa9a5d7c4f4e0a38851d9496a8f1faf97c7d070c23fcbd8dace', text: () => import('./assets-chunks/works_old_index_html.mjs').then(m => m.default)},
    'works/old/Les voleurs d'esprit/index.html': {size: 7014, hash: '00cb30d9ccf0bc61a880d6320190067f030d302d6c78c3e8720915f8c23a9bab', text: () => import('./assets-chunks/works_old_Les voleurs d'esprit_index_html.mjs').then(m => m.default)},
    'works/old/The Dark Storm/index.html': {size: 7008, hash: '33b0c888e2bb4c5427544a37b55d8b558559de23be7ba0e3a71d9c08d580a892', text: () => import('./assets-chunks/works_old_The Dark Storm_index_html.mjs').then(m => m.default)},
    'works/old/Oujnish Game/index.html': {size: 7006, hash: 'd591ed50c41eb3ceb26ef48e9a71ce2b3d256e140fcab84050ce9c8c506f0546', text: () => import('./assets-chunks/works_old_Oujnish Game_index_html.mjs').then(m => m.default)},
    'styles-DRWXG6UT.css': {size: 201603, hash: '62Wa7EV5qyg', text: () => import('./assets-chunks/styles-DRWXG6UT_css.mjs').then(m => m.default)}
  },
};
