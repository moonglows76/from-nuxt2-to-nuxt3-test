# Nuxt2からNuxt3への移行テスト

## セットアップ

### 必要なモジュールのインストール

```bash
# yarn
yarn install
```

### Visual Studio Codeの拡張機能のチェック

1. VScodeのサイドバーにある拡張機能ボタンをクリック
2. 上部のテキストボックスで「Vetur」を検索
3. 「Vetur」の歯車アイコンをクリックして「無効にする（ワークスペース）」をクリック
4. VScodeを再起動するように促されるので、OKする
5. （Vue - Official（旧Volar）をインストールしていなかったら）[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)にアクセスしてInstallボタンからインストール


## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn build
```

Locally preview production build:

```bash
# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
