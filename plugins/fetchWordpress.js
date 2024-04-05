export default async function ({ route, params, $axios, base }) {
  const isPreview = !!(route.query?.preview && process.env.wpAccessToken)
  const options = isPreview
    ? {
        headers: {
          Authorization: `Bearer ${process.env.wpAccessToken}`,
        },
      }
    : {}

  const { data } = await $axios.get(
    `${process.env.apiEndpoint}${base}?_embed${
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
    const { data } = await $axios.get(
      `${process.env.apiEndpoint}${base}/?slug=${encodeURIComponent(
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
    const { data: _data } = await $axios.get(
      `${process.env.apiEndpoint}${base}/${targetLink?.id}/revisions?_embed`,
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
