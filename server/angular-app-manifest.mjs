
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
    'index.csr.html': {size: 3179, hash: '4fbac214906026b418ea214a5478696e9e32d99a9955a610bf09d3f61fe7ccee', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1092, hash: 'e57610002e5b7fc349ea7664ba34d7f18599b2feb6022ee7262b8961aa904e80', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'about/index.html': {size: 19945, hash: '0aaf368858bd9995dc21b24fbaf7b6e41a828a41d00c8c1d4d2ac714b9c70b0c', text: () => import('./assets-chunks/about_index_html.mjs').then(m => m.default)},
    'works/index.html': {size: 24099, hash: 'c1211e28611e4f0d55da231ed142d045be06182105b7ee408e6d23772cd8cde5', text: () => import('./assets-chunks/works_index_html.mjs').then(m => m.default)},
    'works/3DSoftBodyPureJS/index.html': {size: 7021, hash: 'b350b6250e97657efdcb9d89dda68826e089519de2c7e6ac99d1252dc932e818', text: () => import('./assets-chunks/works_3DSoftBodyPureJS_index_html.mjs').then(m => m.default)},
    'works/3DSoftBody/index.html': {size: 7015, hash: 'b303705e657f0c124cf64ffdc157e8187ea0e46ab1083639ad35278adb02c307', text: () => import('./assets-chunks/works_3DSoftBody_index_html.mjs').then(m => m.default)},
    'works/2DFluidSimulation/index.html': {size: 7022, hash: 'ed9263f6c20161352e7befe12fe3d89bddb4f325bedbd5c0d274d6a99cf5c603', text: () => import('./assets-chunks/works_2DFluidSimulation_index_html.mjs').then(m => m.default)},
    'index.html': {size: 62010, hash: 'd7d8a2d96357cdd1e041f7cc12dabfe54f18dc74e6969a876fd2be4b5d4a45f8', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'works/museum/index.html': {size: 7022, hash: 'e38ff1005b5c596d3f5bfc81919b1b4d78597d5832303639eacd7fec5d01ec87', text: () => import('./assets-chunks/works_museum_index_html.mjs').then(m => m.default)},
    'works/In-the-hall-of-the-King-Kong/index.html': {size: 7033, hash: '3de597b75b96f26418ca70d654aecd7d1b631f411e97a9f6b29e7e1704f2daa8', text: () => import('./assets-chunks/works_In-the-hall-of-the-King-Kong_index_html.mjs').then(m => m.default)},
    'works/You-gonna-be-eaten-by-a-fish/index.html': {size: 7033, hash: '3a261867f2360f0ed8a4991bf0d5c14bedaf196a5852ccf0600967552a57ebd2', text: () => import('./assets-chunks/works_You-gonna-be-eaten-by-a-fish_index_html.mjs').then(m => m.default)},
    'works/Welcome-to-Red-Zone/index.html': {size: 7024, hash: 'dc103748d62200f27da225aa1e9068ed0b3750db1d5225a08fa0421c3689ff63', text: () => import('./assets-chunks/works_Welcome-to-Red-Zone_index_html.mjs').then(m => m.default)},
    'works/You-gonna-have-a-Genophobia/index.html': {size: 7032, hash: 'fdc7976f14fe2b134f8d71d19f57c8c2c40e7ad5b7c4c65d10e46dbd67763066', text: () => import('./assets-chunks/works_You-gonna-have-a-Genophobia_index_html.mjs').then(m => m.default)},
    'works/old/index.html': {size: 7008, hash: 'c29d90484ede128582f18b87e86ee56771085ae6698c066609e20a4a8d163a93', text: () => import('./assets-chunks/works_old_index_html.mjs').then(m => m.default)},
    'works/old/Les voleurs d'esprit/index.html': {size: 7029, hash: '7bc672239f53734386f88b0be25d52e2c267ed9868be6f5f44326f397fc02cae', text: () => import('./assets-chunks/works_old_Les voleurs d'esprit_index_html.mjs').then(m => m.default)},
    'works/old/Oujnish Game/index.html': {size: 7021, hash: 'a3723c1532ddbbbeb45070c6640b059cc1f0c3ada8893fb1c4dbe5245fe1093f', text: () => import('./assets-chunks/works_old_Oujnish Game_index_html.mjs').then(m => m.default)},
    'works/old/The Dark Storm/index.html': {size: 7023, hash: '0fb1c2cca143b6b20c9ac24c658b7c83f4711809111d9304be94efad67db123e', text: () => import('./assets-chunks/works_old_The Dark Storm_index_html.mjs').then(m => m.default)},
    'styles-DRWXG6UT.css': {size: 201603, hash: '62Wa7EV5qyg', text: () => import('./assets-chunks/styles-DRWXG6UT_css.mjs').then(m => m.default)}
  },
};
