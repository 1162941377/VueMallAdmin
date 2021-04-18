module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mallapi.duyiedu.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
