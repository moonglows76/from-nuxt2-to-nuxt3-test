<template>
  <div class="container">
    <firstview
      title-en="Contact"
      :title="title"
      description="シナプスへのお問い合わせはこちらからどうぞ。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <div class="form-container">
        <p class="form-container__description">
          シナプスが提供するサービスについてのお問い合わせは、下記のサービスサイトのお問い合わせページからご連絡ください。
        </p>
        <!-- <common-button
          link="/"
          title="シナプスのサービスについての<br class='only-smartphone'>お問い合わせはこちら"
          modifier="gray"
        /> -->

        <common-form action-id="rtsaumbt80amoyowrvdut2cz" :inputs="inputs" />
      </div>
    </background-layer>
    <other-links />
  </div>
</template>

<script>
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import backgroundLayer from '@/components/atoms/backgroundLayer'
import commonForm from '@/components/organisms/commonForm'
import updateMeta from '@/plugins/updateMeta'
import otherLinks from '@/components/molecules/otherLinks'

export default {
  components: {
    firstview,
    breadcrumb,
    backgroundLayer,
    commonForm,
    otherLinks,
  },
  data() {
    return {
      title: 'お問い合わせ',
      inputs: [
        {
          type: 'text',
          name: 'お名前',
          isRequired: true,
          subInputs: [
            {
              name: '姓',
              placeholder: '姓 (例)山田',
            },
            {
              name: '名',
              placeholder: '名 (例)太郎',
            },
          ],
        },
        {
          type: 'text',
          name: 'お名前 ふりがな',
          isRequired: true,
          subInputs: [
            {
              name: '姓（ふりがな）',
              placeholder: 'せい (例)やまだ',
            },
            {
              name: '名（ふりがな）',
              placeholder: 'めい (例)たろう',
            },
          ],
        },
        {
          type: 'text',
          name: '会社名',
          placeholder: '(例)株式会社シナプス',
        },
        {
          type: 'email',
          name: 'メールアドレス',
          isRequired: true,
          placeholder: '(例)info@synapse.jp',
        },
        {
          type: 'tel',
          name: '電話番号<small>※ ハイフンなし</small>',
          placeholder: '(例)01234567890',
        },
        {
          type: 'text',
          name: '郵便番号<small>※ ハイフンなし</small>',
          placeholder: '(例)8900053',
        },
        {
          type: 'text',
          name: '住所',
          placeholder: '(例)鹿児島県鹿児島市中央町6-1',
        },
        {
          type: 'textarea',
          name: 'お問い合わせ詳細',
          isRequired: true,
          placeholder: 'お問い合わせ内容をご入力ください。',
        },
      ],
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'お問い合わせ',
          link: '/contact/',
        },
      ],
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
  :deep(.breadcrumb) {
    top: 360px;
  }

  :deep(.background-layer) {
    margin-top: -64px;
    padding: 120px 0;
  }
}

.form-container {
  width: $width-2;
  margin: 0 auto;
  padding: 80px 72px 20px;
  background-color: white;
  box-sizing: border-box;

  :deep(.common-button) {
    width: 560px;
    margin: 56px auto;
  }
}

@include smartphone {
  .container {
    :deep(.background-layer) {
      margin-top: 0;
      padding: 40px $padding-1;
    }

    :deep(.breadcrumb) {
      top: 196px;
    }
  }

  .form-container {
    width: initial;
    padding: 32px $padding-1;

    :deep(.common-button) {
      width: initial;
      height: initial;
      line-height: 1.5em;
      margin: 28px auto;
      padding: 8px 0;
      font-size: 13px;
    }

    &__description {
      line-height: 2em;
      font-size: 14px;
    }
  }
}
</style>
