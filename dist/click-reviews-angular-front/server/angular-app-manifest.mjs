
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 23474, hash: 'd8388b415c666de35ed9d9bf10feb102db402f6418dbd955ed0f2aec928a9ad3', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17093, hash: 'f830cfce7fdb2e1be8670c7e74d1514dfc62e918ed687def5f974453185cbdfb', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 91960, hash: 'fecc0c80509dd7463634ac937b164b62e360c8485bd216a332062086eb845f04', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-Z5UYKNDX.css': {size: 6934, hash: 'VxIyzD7LHG8', text: () => import('./assets-chunks/styles-Z5UYKNDX_css.mjs').then(m => m.default)}
  },
};
