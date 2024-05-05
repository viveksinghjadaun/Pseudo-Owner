import react from '@vitejs/plugin-react-swc';
// import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://pseudo-owner.onrender.com',
        secure: false,
      },
    },
  },

  plugins: [react()]
  // plugins: [vue({
  //   template: {
  //     compilerOptions: {
  //       isCustomElement: tag => tag.startsWith('my-')
  //     }
  //   }
  // })]
});
