<template>
  <div class="container">
    <firstview2 :role-en="roleEn" :titles="titles" :name="title" />

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
import otherLinks from '@/components/molecules/otherLinks'
import updateMeta from '@/plugins/updateMeta'

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
          title: 'シナプスについて',
          link: '/about/',
        },
        {
          title: 'シナプスの経営理念',
          link: '/vision/',
        },
      ],
      titles: ['ICTで、もっと魅力的な鹿児島を'],
      title: 'シナプスの経営理念',
      roleEn: 'Vision',
      content: `
<h2>鹿児島への思い</h2>
<h3>ICTで、もっと魅力的な鹿児島を</h3>

<p>
株式会社シナプスが提供するインターネット接続サービス「SYNAPSE」は、1995年、南九州初の地域系プロバイダとして誕生しました。 パソコンすら珍しい時代に創業者の高橋美博は、「インターネットで地方の時代が始まる。鹿児島が乗り遅れてはいけない」と、危機感と郷土愛を持って新事業に果敢に挑戦しました。
</p>

<p>
インターネット技術をベースとしたICT（情報通信技術）は、私たちの日常生活に入り込み、日進月歩で進化し続けています。ICTの利活用によって自らの魅力を再発見し高め、発信し続けることは鹿児島がこれからも豊かであり続けるために必要不可欠です。
</p>

<p>
私たちはこれまで培ったICTの技術力とお客様サポート力、そして県内随一のネットワークインフラを強みとして、鹿児島がもっと魅力的に、豊かになるように挑戦します。世界中から「鹿児島に行きたい」「鹿児島で働きたい」「鹿児島に住みたい」と思ってもらえる楽しい鹿児島コミュニティの実現こそが、私たちの願いであり、使命であると考えています。
</p>

<h2>シナプスの経営理念</h2>
<h3>シナプスミッション（使命）</h3>

<p class="strong">
インターネットで、<br>鹿児島の毎日を笑顔にします。
</p>

<h3>シナプスビジョン（実現すること）</h3>
<ul>
<li>鹿児島・お客様・仲間・家族・自分の豊かさを追求します。</li>
<li>鹿児島の生活が楽しく便利になるサービスを提供します。</li>
<li>鹿児島に、プロフェッショナルを育成し、その能力を発揮できる環境を作ります。</li>
</ul>

<h3>シナプスバリュー（価値観・行動指針）</h3>
<ul>
<li>私たちは、感謝の気持ちを大切にし「ありがとう」を伝えます。</li>
<li>私たちは、相手に寄り添ったコミュニケーションを心掛けます。</li>
<li>私たちは、多様な個性を尊重します。</li>
<li>私たちは、毎日一つ新しい発見をし、自ら成長します。</li>
<li>私たちは、チャレンジする気持ちと姿勢を持ち、失敗を恐れません。</li>
<li>私たちは、常識にとらわれず、何ごとにも創造的に取り組みます。</li>
<li>私たちは、幅広い視野を持って深い知識・技術の習得に努めます。</li>
</ul>
      `,
    }
  },
  head() {
    return updateMeta({
      title: process.env.titleTemplate.replace(/%s/, this.title),
      url: `${process.env.url}${this.$route.path.slice(1)}`,
    })
  },
  mounted() {
    this.fontReload()
  },
}
</script>

<style scoped lang="scss">
.container {
  :deep(.firstview2) {
    color: $color-black-1;

    &__role-en {
      opacity: 0.1;
    }
  }

  :deep(.breadcrumb) {
    top: 460px;
  }

  :deep(.background-layer) {
    padding: 90px 0;
  }
}

@include smartphone {
  .container {
    :deep(.breadcrumb) {
      top: 316px;
    }
  }
}
</style>
