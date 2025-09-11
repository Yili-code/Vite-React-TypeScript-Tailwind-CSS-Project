import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // 載入環境變數
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react({
        // 啟用 React 快速刷新
        fastRefresh: true,
        // 啟用 JSX 轉換
        jsxImportSource: 'react',
        // 啟用 babel 插件
        babel: {
          plugins: [
            // 可以添加額外的 babel 插件
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@pages': resolve(__dirname, 'src/pages'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@types': resolve(__dirname, 'src/types'),
        '@hooks': resolve(__dirname, 'src/hooks'),
      },
    },
    build: {
      // 優化建構輸出
      target: 'esnext',
      minify: command === 'build' ? 'esbuild' : false,
      sourcemap: command === 'build' ? false : true,
      // 優化建構大小
      rollupOptions: {
        output: {
          manualChunks: id => {
            // 核心 React 庫
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            // 路由庫
            if (id.includes('react-router')) {
              return 'router-vendor';
            }
            // 錯誤邊界
            if (id.includes('react-error-boundary')) {
              return 'error-vendor';
            }
            // 工具庫
            if (id.includes('node_modules')) {
              return 'vendor';
            }
            // 組件庫
            if (id.includes('src/components')) {
              return 'components';
            }
            // Hooks
            if (id.includes('src/hooks')) {
              return 'hooks';
            }
            // 頁面
            if (id.includes('src/pages')) {
              return 'pages';
            }
          },
          // 優化檔案命名
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
        // 外部依賴（如果使用 CDN）
        external: [],
        // 優化 tree shaking
        treeshake: {
          moduleSideEffects: false,
        },
      },
      // 優化 chunk 大小警告閾值
      chunkSizeWarningLimit: 1000,
      // 啟用 CSS 代碼分割
      cssCodeSplit: true,
      // 優化依賴預構建
      commonjsOptions: {
        include: [/node_modules/],
      },
      // 優化建構性能
      reportCompressedSize: false,
    },
    server: {
      // 開發伺服器配置
      port: parseInt(env.VITE_PORT || '3000'),
      host: env.VITE_HOST || 'localhost',
      open: env.VITE_OPEN === 'true',
      cors: true,
      // 代理配置
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
      // 熱更新配置
      hmr: {
        overlay: true,
      },
    },
    preview: {
      port: parseInt(env.VITE_PREVIEW_PORT || '4173'),
      host: env.VITE_HOST || 'localhost',
      open: env.VITE_OPEN === 'true',
    },
    css: {
      // CSS 預處理器配置
      devSourcemap: true,
      // PostCSS 配置
      postcss: {
        plugins: [
          // 可以添加 PostCSS 插件
        ],
      },
    },
    optimizeDeps: {
      // 預構建依賴優化
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'react-error-boundary',
      ],
      // 排除的依賴
      exclude: [],
      // 強制預構建
      force: command === 'build',
    },
    // 環境變數配置
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
    },
    // 實驗性功能
    experimental: {
      // 啟用新的依賴預構建
      renderBuiltUrl: (filename: string) => {
        return `/${filename}`;
      },
    },
  };
});
