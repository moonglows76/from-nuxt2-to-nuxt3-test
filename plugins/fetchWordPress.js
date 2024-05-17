/*
WIP:
このプラグインはWordPressからデータを取得して返却する
未作業なのでいったん拡張子をtxtに変更
route　…　呼び出し元のURL情報が入っているオブジェクト
params　…　動的ルーティングの値を取り出す　
　　　　　　/technology/discussion/_id.vue なら URL「/technology/discussion/aaa」であるときの
　　　　　　「aaa」を「param.id」で取り出す
$axios　…　通信モジュール（$fetchで代用。引数からはずした）
base　…　親フォルダの名前を指定　ex) /app/pages/technology/discussion/_id.vue なら 'discussion' が入る
*/
export default defineNuxtPlugin (() => {

  // runtimeConfigの読み込み
  const config = useRuntimeConfig()

  return {
    provide: {
      async fetchWordpress({route, params, base}) {

        const isPreview = !!(route.query?.preview && config.wpAccessToken)

        const options = isPreview
          ? {
              headers: {
                Authorization: `Bearer ${config.wpAccessToken}`,
              },
            }
          : {}

        const data = await $fetch(
          `${config.public.apiEndpoint}${base}?_embed${
            isPreview
              ? '&status=future,draft,pending,private,trash,inherit,publish'
              : ''
          }`,
          options
        )

        const targetIndex = data?.findIndex?.((_data) => {
          return (
            (_data.status === 'draft' || _data.status === 'pending'
              ? `${_data.id}`
              : _data.slug?.toUpperCase()) ===
            encodeURIComponent(params?.id).toUpperCase()
          )
        })

        let targetLink
        let prevLink
        let nextLink

        if (targetIndex !== -1) {
          targetLink = data?.[targetIndex]
          prevLink = data?.[targetIndex - 1]
          nextLink = data?.[targetIndex + 1]
        }

        if (!targetLink) {
          const data = await $fetch(
            `${config.public.apiEndpoint}${base}/?slug=${encodeURIComponent(
              params?.id
            ).toUpperCase()}&_embed${
              isPreview
                ? '&status=future,draft,pending,private,trash,inherit,publish'
                : ''
            }`,
            options
          )
          targetLink = data?.[0]
        }

        // change to newest version using revisions
        if (isPreview && targetLink?.status === 'publish') {
          const _data = await $fetch(
            `${config.public.apiEndpoint}${base}/${targetLink?.id}/revisions?_embed`,
            options
          )

          if (_data && _data[0]) {
            targetLink = Object.assign(targetLink, _data[0])
          }
        }


        return {
          totalCount: data.length,
          targetIndex,
          targetLink,
          prevLink,
          nextLink,
        }
      }
    }
  }
})