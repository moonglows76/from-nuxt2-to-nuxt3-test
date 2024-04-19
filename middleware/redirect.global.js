export default defineNuxtRouteMiddleware((to, from) => {
  // パスの最後にスラッシュがない場合、スラッシュありのパスにリダイレクトする
  console.log('from', from)
  console.log('to', to)
  // 無限ループっぽくなるのでコメントアウト
  // if (to.path.slice(-1) !== '/') {
  //   return navigateTo({ path: to.path + '/' })
  // }
})

// 元のコード
// export default function ({ route, redirect }) {
//   if (route.path.slice(-1) !== '/') {
//     redirect(301, route.fullPath.replace(route.path, route.path + '/'))
//   }
// }
