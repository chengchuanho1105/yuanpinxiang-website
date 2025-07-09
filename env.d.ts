/// <reference types="vite/client" />
// vite-plugin-pages 虛擬模組型別宣告
declare module 'virtual:generated-pages' {
  import type { RouteRecordRaw } from 'vue-router'
  const routes: RouteRecordRaw[]
  export default routes
}
