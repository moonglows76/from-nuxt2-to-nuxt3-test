// module.exports = {
export default {
  apps : [{
    name   : "app",
    script : './node_modules/nuxt/bin/nuxt.js',
    args: 'start', // 'start'を指定してNuxt.jsを本番モードで起動
    autorestart: true
  }]
}
