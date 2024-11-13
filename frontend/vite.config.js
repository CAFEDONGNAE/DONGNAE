import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vanillaExtractPlugin()
  ],
  define: {
    global: 'window'
  },
  // server: {
  //   proxy: {
  //     '/members': { // 요청 경로가 '/members'로 시작하는 경우 프록시 적용
  //       target: 'http://localhost:8080', // 백엔드 서버 주소
  //       changeOrigin: true, // CORS 헤더를 자동으로 설정
  //     },
  //   },
  // },
});
