export default function ({ title, url, description, image }) {
  let imageSrc = image?.src
  if (image && image.src && image.src.match(/^\/\//)) {
    imageSrc = `https:${image.src}`
  }
  const _description = description || process.env.description
  const _title = title.replace(/<br>/g, '')

  let _url = url
  if (!_url.match(/\/$/)) {
    _url = `${_url}/`
  }

  return {
    title: _title,
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: _description,
      },
      { hid: 'ogTitle', property: 'og:title', content: _title },
      { hid: 'ogUrl', property: 'og:url', content: _url },
      {
        hid: 'ogDescription',
        property: 'og:description',
        content: _description,
      },
      { hid: 'twitterSite', name: 'twitter:site', content: _title },
      { hid: 'twitterTitle', name: 'twitter:title', content: _title },
      {
        hid: 'twitterDescription',
        name: 'twitter:description',
        content: _description,
      },
    ].concat(
      image
        ? [
            { hid: 'ogImage', property: 'og:image', content: imageSrc },
            {
              property: 'og:image:width',
              content: image.width,
            },
            {
              property: 'og:image:height',
              content: image.height,
            },
            {
              hid: 'twitterImageSrc',
              name: 'twitter:image:src',
              content: imageSrc,
            },
          ]
        : []
    ),
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: _url,
      },
    ],
  }
}
