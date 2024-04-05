<template>
  <div class="container">
    <firstview
      title-en="Entry"
      :title="title"
      description="シナプスへの採用エントリーはこちらからどうぞ。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <background-layer>
      <div class="form-container">
        <template v-if="isPending">
          <p class="form-container__pending">
            シナプスでは現在、採用募集を行っておりません。<br />
            募集を開始する際はこちらのページでお知らせいたしますので、今しばらくお待ちください。
          </p>
          <common-button title="シナプスの仕事をもっと知る" link="/work/job/" />
        </template>
        <common-form
          v-else
          action-id="clp48mrt5kjttq1oe8rxqgv9"
          :inputs="inputs"
        />
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
import commonButton from '@/components/atoms/commonButton'
import otherLinks from '@/components/molecules/otherLinks'
import updateMeta from '@/plugins/updateMeta'

export default {
  components: {
    firstview,
    breadcrumb,
    backgroundLayer,
    commonForm,
    commonButton,
    otherLinks,
  },
  async asyncData({ $axios, route, params }) {
    const isPreview = !!(route.query?.preview && process.env.wpAccessToken)
    const options = isPreview
      ? {
          headers: {
            Authorization: `Bearer ${process.env.wpAccessToken}`,
          },
        }
      : {}

    const { data } = await $axios.get(
      `${process.env.apiEndpoint}recruit?_embed${
        isPreview
          ? '&status=future,draft,pending,private,trash,inherit,publish'
          : ''
      }`,
      options
    )

    return {
      isPending: data.length === 0,
      inputs: [
        {
          type: 'radio',
          name: '応募職種',
          isRequired: true,
          list: data.map((_data) => {
            return _data.title?.rendered
          }),
        },
        {
          type: 'text',
          name: '氏名（漢字）',
          isRequired: true,
          placeholder: '(例)山田 太郎',
        },
        {
          type: 'text',
          name: '氏名（カタカナ）',
          isRequired: true,
          placeholder: '(例)ヤマダ タロウ',
        },
        {
          type: 'number',
          name: '生年月日',
          isRequired: true,
          subInputs: [
            {
              name: '年',
              placeholder: '1970（年）',
            },
            {
              name: '月',
              placeholder: '4（月）',
            },
            {
              name: '日',
              placeholder: '1（日）',
            },
          ],
        },
        {
          type: 'number',
          name: '郵便番号',
          isRequired: true,
          subInputs: [
            {
              name: '郵便番号(3桁)',
              placeholder: '(例)890',
            },
            {
              name: '郵便番号(4桁)',
              placeholder: '(例)0053',
            },
          ],
        },
        {
          type: 'text',
          name: '住所',
          isRequired: true,
          placeholder: '(例)鹿児島県鹿児島市中央町6-1',
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
          type: 'textarea',
          name: '志望動機',
          placeholder: '志望動機・PRをご入力ください。',
        },
      ],
    }
  },
  data() {
    return {
      breadcrumbContents: [
        {
          title: 'ホーム',
          link: '/',
        },
        {
          title: 'シナプスの仕事と人',
          link: '/work/',
        },
        {
          title: '採用エントリー',
          link: '/work/entry/',
        },
      ],
      title: '採用エントリー',
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

  &__pending {
    line-height: 2em;
    padding: 0 96px 48px;
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

    &__pending {
      padding: 0 $padding-1;
    }
  }
}
</style>
