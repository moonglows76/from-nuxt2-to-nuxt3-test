export default defineNuxtRouteMiddleware((to, from) => {
  // サーバーサイドでは何もしない
  if (import.meta.server) return
  // パスの最後にスラッシュがない場合、スラッシュありのパスにリダイレクトする
  if (!to.path.endsWith('/')) {
    const { pathname, search, hash } = new URL(to.fullPath, 'https://example.com')
    return navigateTo(`${pathname}/${search}${hash}`)
  }
})

// 元のコード
// export default function ({ route, redirect }) {
//   if (route.path.slice(-1) !== '/') {
//     redirect(301, route.fullPath.replace(route.path, route.path + '/'))
//   }
// }
