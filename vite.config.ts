import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import UnoCSS from 'unocss/vite';
import monkey from 'vite-plugin-monkey';
export default defineConfig({
  plugins: [
    solidPlugin(),
    UnoCSS({
      rules: [
        // [/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) / 4}rem` })],
        // [/^p-(\d+)$/, match => ({ padding: `${Number(match[1]) / 4}rem` })],
      ],
    }),
    monkey({
      entry: 'src/index.tsx',
      userscript: {
        icon: 'https://vitejs.dev/logo.svg',
        name: 'Friendly TronClass',
        namespace: 'https://github.com/jason9294',
        version: '0.2.0',
        description: 'Lets you use TronClass more comfortably',
        author: 'jason9294',
        match: [
          'https://eclass.yuntech.edu.tw/*',
          'https://tronclass.com.tw/*',
        ],
        grant: [
          'GM_setValue',      // 存儲設置
          'GM_getValue',      // 獲取設置
          'GM_registerMenuCommand', // 註冊菜單命令
        ],
        license: 'MIT',
      },

    }),
  ],
});
