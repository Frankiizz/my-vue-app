const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        // 为所有 Sass 文件添加全局变量、mixin 或函数
        additionalData: `
          @import "@/assets/styles.scss";
        `,
      },
    },
  },
  devServer: {
    historyApiFallback: true, // 支持 history 模式的路由
  },
});
