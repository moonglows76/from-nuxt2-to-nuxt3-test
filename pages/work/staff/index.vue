<template>
  <div class="container">
    <firstview
      title-en="Staff"
      :title="title"
      description="シナプスで働く社員を紹介します。"
    />

    <breadcrumb :contents="breadcrumbContents" />

    <div class="member-container">
      <delayed-show
        v-for="(member, index) in members"
        :key="index"
        :delay="$store.state.isSmartphone ? 0 : 0.2 * (index % 3)"
        class="member"
      >
        <nuxt-link :to="`/work/staff/${member.id}/`" class="member__href">
          <div class="member__background">
            <div
              class="member__background-picture"
              :style="{
                backgroundImage: `url(${member.thumbnail})`,
                backgroundPosition: $store.state.isSmartphone
                  ? member.smartphoneThumbnailPosition
                  : null,
              }"
            />
          </div>
          <p class="member__role-en">
            {{ member.roleEn }}
          </p>
          <div class="member__meta">
            <p class="member__name">
              {{ member.name }}
            </p>
            <p class="member__role">
              {{ member.role }}
            </p>
            <div class="member__description-container">
              <div
                v-for="(description, descriptionIndex) in member.descriptions"
                :key="descriptionIndex"
              >
                <p class="member__description">
                  {{ description }}
                </p>
                <br />
              </div>
            </div>
          </div>
        </nuxt-link>
      </delayed-show>
    </div>

    <recruit-banner />
    <other-links />
  </div>
</template>

<script>
// TODO update preview url
import firstview from '@/components/organisms/firstview'
import breadcrumb from '@/components/molecules/breadcrumb'
import otherLinks from '@/components/molecules/otherLinks'
import recruitBanner from '@/components/molecules/recruitBanner'
import delayedShow from '@/components/atoms/delayedShow'
import updateMeta from '@/plugins/updateMeta'

export default {
  components: { firstview, breadcrumb, otherLinks, recruitBanner, delayedShow },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(`${process.env.apiEndpoint}staff?_embed`)

    return {
      members: data.map((_data) => {
        return {
          id: _data.slug,
          thumbnail:
            _data?._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
          smartphoneThumbnailPosition: _data.acf.smartphoneThumbnailPosition,
          name: _data.title.rendered,
          roleEn: _data.acf.roleEn,
          role: _data.acf.role,
          descriptions: _data.acf.catchcopy.split('<br>'),
        }
      }),
    }
  },
  data() {
    return {
      title: 'シナプスの人',
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
          title: 'スタッフ紹介',
          link: '/work/staff/',
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
  min-width: 960px;

  :deep(.firstview) {
    height: 400px;

    &__title-en {
      color: $color-black-1;
    }
  }

  :deep(.breadcrumb) {
    top: 360px;
  }
}

.member-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  max-width: 1232px;
  margin: -256px auto 0;
  padding-bottom: 128px;
}

.member {
  position: relative;
  width: calc(33.3% - 32px);
  height: 512px;
  border-radius: 8px;
  margin: 16px;
  @include boxShadow;
  background-color: white;
  overflow: hidden;

  @include hover {
    .member__background-picture {
      transform: scale(1.05);
    }
  }

  &__href {
    display: block;
    height: 100%;
  }

  &__background {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 256px;
    overflow: hidden;
  }

  &__background-picture {
    height: 100%;
    background-size: cover;
    background-position: center;
    transition: transform 1s;
  }

  &__role-en {
    position: absolute;
    top: 260px;
    left: 16px;
    @include fontTsuku;
    font-size: 48px;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.2);
  }

  &__meta {
    position: relative;
    margin: 300px 0 0 16px;
  }

  &__name {
    font-size: 24px;
    font-weight: bold;
  }

  &__role {
    margin-top: 8px;
    font-weight: bold;
  }

  &__description-container {
    margin-top: 20px;
  }

  &__description {
    display: inline-block;
    padding: 6px 6px 6px 16px;
    margin-top: 8px;
    margin-left: -16px;
    @include fontTsuku;
    font-size: 18px;
    background-color: white;
  }
}

@include smartphone {
  .container {
    min-width: 0;

    :deep(.firstview) {
      height: auto;
    }

    :deep(.breadcrumb) {
      top: 196px;
    }
  }

  .member-container {
    display: block;
    margin: 0 auto;
    padding: 16px 0 64px;
  }

  .member {
    width: initial;
    height: 272px;
    margin: 20px;

    &__href {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    &__background {
      right: 160px;
      height: 100%;
    }

    &__role-en {
      position: absolute;
      top: 84px;
      left: calc(100% - 200px);
      font-size: 26px;
    }

    &__meta {
      position: absolute;
      top: 80px;
      left: calc(100% - 200px);
      margin: initial;
    }

    &__name {
      font-size: 18px;
      text-shadow: 0 0 2px white;
    }

    &__role {
      margin-top: 6px;
      font-size: 10px;
      text-shadow: 0 0 2px white;
    }

    &__description-container {
      margin-top: 12px;
    }

    &__description {
      padding: 4px;
      margin-top: 4px;
      margin-left: initial;
      font-size: 11px;
    }
  }
}
</style>
