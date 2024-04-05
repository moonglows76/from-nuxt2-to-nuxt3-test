<template>
  <div class="container">
    <firstview2
      :name="role"
      :titles="titles"
      background="/images/index/work_picture_1.jpg"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <article-content :content="content" />
    </background-layer>

    <other-links />
  </div>
</template>

<script>
import breadcrumb from '@/components/molecules/breadcrumb'
import articleContent from '@/components/organisms/articleContent'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import firstview2 from '@/components/organisms/firstview2'
import variables from '@/variables'
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'

export default {
  components: {
    breadcrumb,
    articleContent,
    backgroundLayer,
    firstview2,
    otherLinks,
  },
  data() {
    return {
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの技術',
          link: '/technology/',
        },
        {
          title: 'シナプスの技術力',
          link: '/technology/skills/',
        },
      ],
      titles: ['シナプスの技術力'],
      role: 'Skills',
      content: `
<h2>【１】ネットワークに関する技術</h2>
<h3>鹿児島のインターネットライフを支える、県内最大の高速・大容量のバックボーンを運用</h3>

<p>
鹿児島県最大規模の高速・大容量のバックボーンネットワークを構築・運用し、高品質なインターネット接続環境を提供しています。<br>
また、堅牢なファシリティとサーバ／インフラ、そしてバックボーンネットワークを、自社データセンターにて24時間365日有人監視し、鹿児島のインターネットライフを品質と安全性の両面から日々お守りしています。
</p>

<h4>事例</h4>

<h5>日常的な業務</h5>
<p>
自社データセンターは24時間365日有人監視しています。何らかの異常が発生したら、スタッフが即座に対応します。<br>
<br>
<img src="/images/about/picture_2.jpg" alt="">
</p>

<h5>イベント会場でのWi-Fi提供</h5>
<p>
鹿児島で開催される大規模イベントの会場へWi-Fiを提供しています。来場者が安心安全かつ、快適にインターネット接続できる環境を整備します。
<p>

<h2>【２】システムに関する技術</h2>

<h3>新しい技術を取り入れ、様々な分野のシステム構築に注力</h3>

<p>
ネットワーク／サーバの安定運用はもちろんのこと、サービス開発にも力を入れています。エンジニアが新しい技術を試しながら、基幹システム、電話システム、Webアプリケーションなど様々な分野のシステム構築を行なっています。<br>
鹿児島のみなさまの生活がさらに便利になるよう、これからより広い分野のシステム構築に関わっていきます。
</p>

<h4>事例</h4>

<h5>お客様サービスカウンター</h5>
<p>
契約情報やご利用サービスの確認や変更を行えるWeb上のコントロールパネルです。少しでも使いやすいインターフェイスを目指し、エンジニアが日々改善に努めています。<br>
</p>
<h5>クラウドPBX</h5>
<p>
IP-PBXをクラウド上で提供するビジネス系の光電話サービスです。一般的なオフィスの内線電話網や、コールセンターに最適です。
</p>

<h2>【３】Webに関する技術</h2>

<h3>お客様視点と技術的視点の両面からWebサイトを構築</h3>

<p>
めまぐるしく変化するWebデザインや技術のトレンドにアンテナを張り巡らせ、自社サイトの構築に取り入れています。シナプスのサービスをお客様に伝えることはもちろん、鹿児島の毎日の情報を分かりやすくお届けしています。
</p>

<h4>事例</h4>

<h5>シナプスサービス紹介サイト</h5>
<p>
シナプスが提供している接続サービス、安全安心サービス、会員サポートコンテンツなどを網羅したサイトです。
</p>

<h5>カゴシマガジン</h5>
<p>
シナプスが運営するWebマガジンです。鹿児島県の各地域の、日々のあらゆるシーンで役立つ・楽しい・生の情報を提供しています。
</p>

<h2>【４】サポートに関する技術</h2>

<h3>お客様のお困りごとを親身に解決するカスタマーサポート</h3>

<p>
シナプスでは、ICT（情報通信技術）に精通し様々なシチュエーションに対応できるコールセンターや直接窓口で相談できる「シナプス・ステーション」など、万全なカスタマーサポート体制を整えています。鹿児島の地域密着型のインターネットサービスプロバイダとして、「鹿児島弁」が通じるのも大きな特長。高度で難解な技術を、シンプルで親しみやすい言葉に変えてお客様のお困りごとを解決します。
</p>

<h4>事例</h4>

<h5>コールセンター</h5>
<p>
困ったときにすぐに繋がるコールセンターです。あらゆる情報や知識を網羅したスタッフがお客様をサポートします。<br>
<img src="/images/job/picture_2.jpg" alt="">
</p>

<h5>シナプス・ステーション</h5>
<p>
鹿児島中央駅から徒歩5分の位置にあるカスタマーサポート窓口です。インターネットに関するさまざまなご相談をお受けします。<br>
<img src="/images/about/picture_4.jpg" alt="">
</p>

<h2>【５】勉強会</h2>

<h3>社外勉強会や技術関連イベントに積極的に参加</h3>

<p>
シナプスのメンバーは幅広い領域での勉強会や技術関連イベントに積極的に参加、主催しています。<br>
社内に蓄積された知識やエンジニアのメンバーが持つナレッジをオープンにし、同業他社やフリーランスのエンジニアと共有し学び合うことで、鹿児島県全体の技術力の向上に努めています。
</p>

<h4>事例</h4>
<ul>
<li>さくらじまハウス</li>
<li>q-tech Meeting</li>
<li>Kagoshima WordPress Meetup</li>
</ul>
      `,
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.titles.join('')),
      url: `${process.env.url}${this.$route.path.slice(1)}`,
    })
  },
  mounted() {
    this.$store.commit('updateFirstviewColor', '#FFFFFF')
    this.fontReload()
  },
  destroyed() {
    this.$store.commit('updateFirstviewColor', variables['color-black-1'])
  },
}
</script>

<style scoped lang="scss">
.container {
  :deep(.breadcrumb) {
    top: 460px;
    background-color: $color-gray-2;
  }

  :deep(.background-layer) {
    padding: 80px 0;
  }
}

@include smartphone {
  .container {
    :deep(.breadcrumb) {
      top: 328px;
    }
  }
}
</style>
