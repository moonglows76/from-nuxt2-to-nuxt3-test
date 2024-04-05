<template>
  <div class="common-form-container">
    <ValidationObserver ref="validation-observer" slim>
      <form
        ref="form"
        class="common-form"
        :action="`https://form.run/api/v1/r/${actionId}`"
        method="post"
      >
        <div
          v-for="(input, index) in inputs"
          :key="index"
          class="common-form__content"
        >
          <p
            class="common-form__key"
            :class="{
              'common-form__key--required': input.isRequired,
            }"
            v-html="input.name"
          />

          <div class="common-form__value">
            <div v-if="input.subInputs" class="common-form__subinput-container">
              <ValidationProvider
                v-for="(subInput, subInputIndex) in input.subInputs"
                v-slot="{ errors }"
                :key="subInputIndex"
                :rules="getRules(input)"
                class="common-form__subinput-container"
                tag="div"
              >
                <input
                  v-model="subInput.value"
                  :type="input.type"
                  :name="subInput.name"
                  :placeholder="subInput.placeholder"
                  class="common-form__subinput"
                />

                <p v-show="errors[0]" class="common-form__error">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </div>

            <ValidationProvider
              v-else
              v-slot="{ errors }"
              :rules="getRules(input)"
              slim
            >
              <textarea
                v-if="input.type === 'textarea'"
                v-model="input.value"
                :name="input.name"
                :placeholder="input.placeholder"
                class="common-form__textarea"
                rows="12"
              />

              <template v-else-if="input.type === 'radio'">
                <label
                  v-for="(list, listIndex) in input.list"
                  :key="listIndex"
                  class="common-form__radio"
                >
                  <input
                    v-model="input.value"
                    class="common-form__radio-input"
                    :type="input.type"
                    :name="input.name"
                    :value="list"
                  />
                  <span class="common-form__radio-name">
                    {{ list }}
                  </span>
                </label>
              </template>

              <input
                v-else
                v-model="input.value"
                class="common-form__input"
                :type="input.type"
                :name="input.name"
                :placeholder="input.placeholder"
              />

              <p v-show="errors[0]" class="common-form__error">
                {{ errors[0] }}
              </p>
            </ValidationProvider>
          </div>
        </div>
      </form>
    </ValidationObserver>

    <p class="common-form-container__agreement">
      <span
        class="common-form-container__agreement-button"
        :class="{
          'common-form-container__agreement-button--on': isAgreementChecked,
        }"
        @click="toggleAgreementCheck"
      />
      <a href="https://www.synapse.jp/notice/private.html" target="_blank">
        個人情報保護方針 </a
      >に同意する
    </p>

    <p
      v-show="isShowAgreementAlert"
      class="common-form-container__agreement-alert"
    >
      個人情報保護方針にチェックを入れてください。
    </p>

    <common-button
      class="common-form-container__submit"
      :class="{
        'common-form-container__submit--disable': !isAgreementChecked,
      }"
      title="送信する"
      modifier="gray"
      :prevent="true"
      @click="submit"
    />
  </div>
</template>

<script>
import scroll from 'scroll'
import scrollDoc from 'scroll-doc'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'
import commonButton from '@/components/atoms/commonButton'

extend('required', {
  ...required,
  message: '入力必須項目です。',
})

extend('email', {
  ...email,
  message: '正しいメールアドレスを入力してください。',
})

export default {
  components: { commonButton, ValidationObserver, ValidationProvider },
  props: {
    actionId: {
      type: String,
      default: '',
    },
    inputs: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      isShowAgreementAlert: false,
      isAgreementChecked: false,
    }
  },
  methods: {
    getRules(input) {
      const rules = []
      if (input.isRequired) {
        rules.push('required')
      }
      if (input.type === 'email') {
        rules.push('email')
      }
      return rules.join('|')
    },
    toggleAgreementCheck() {
      this.isAgreementChecked = !this.isAgreementChecked
    },
    async submit() {
      if (!this.isAgreementChecked) {
        this.isShowAgreementAlert = true
        return
      }

      this.isShowAgreementAlert = false

      const isValid = await this.$refs['validation-observer'].validate()
      if (isValid) {
        this.$refs.form.submit()
      } else {
        const offset = -200
        scroll.top(
          scrollDoc(),
          this.$refs.form.getBoundingClientRect().top +
            window.pageYOffset +
            offset,
          {
            duration: 500,
          }
        )
      }
    },
  },
}
</script>

<style scoped lang="scss">
.common-form-container {
  padding-top: 32px;

  :deep(.common-button) {
    &.common-form-container__submit {
      width: 228px;

      &--disable {
        cursor: not-allowed;
      }
    }
  }

  &__agreement {
    display: flex;
    justify-content: center;
    margin-top: 56px;
    text-align: center;
    font-weight: bold;

    :deep(a) {
      text-decoration: underline;
    }
  }

  &__agreement-button {
    width: 16px;
    height: 16px;
    margin-right: 12px;
    border-radius: 4px;
    border: 2px solid black;
    transform: translateY(-2px);
    cursor: pointer;

    &--on {
      background-color: black;

      &:before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 1px;
        line-height: 16px;
        text-align: center;
        font-family: 'Font Awesome 5 Pro';
        font-size: 13px;
        color: white;
        content: '\f00c';
      }
    }
  }

  &__agreement-alert {
    line-height: 1.6em;
    margin-top: 16px;
    text-align: center;
    color: red;
  }
}

.common-form {
  &__error {
    margin-top: 16px;
    color: red;
  }

  &__content {
    overflow: hidden;
    border-bottom: solid 1px $color-gray-3;
  }

  &__key {
    float: left;
    width: 236px;
    line-height: 2em;
    padding: 36px 0 36px 24px;
    box-sizing: border-box;

    &--required {
      &:after {
        margin-left: 12px;
        font-size: 12px;
        color: red;
        content: '※必須';
      }
    }

    :deep(small) {
      display: block;
      font-size: 14px;
    }
  }

  &__value {
    float: left;
    width: calc(100% - 276px);
    margin-left: 40px;
    padding: 28px 0;
  }

  &__radio {
    display: block;
    padding: 12px 0;

    &:first-child {
      padding-top: 16px;
    }
  }

  &__textarea,
  &__input,
  &__subinput {
    @include resetInput;
    line-height: 2em;
    padding: 16px 24px;
    font-size: 15px;
    border-radius: 8px;
    border: solid 1px $color-gray-3;
    box-sizing: border-box;

    &::placeholder {
      color: $color-gray-3;
      font-family: '游ゴシック体', YuGothic, '游ゴシック', 'Yu Gothic';
    }
  }

  &__textarea,
  &__input {
    width: 100%;
  }

  &__subinput-container {
    display: inline-block;
    vertical-align: top;

    &:not(:last-child) {
      margin-right: 32px;
    }
  }
}

@include smartphone {
  .common-form-container {
    padding-top: 16px;

    :deep(.common-button) {
      &.common-form-container__submit {
        width: initial;
        padding: 0;
        font-size: 14px;
      }
    }

    &__agreement {
      margin-top: 56px;
    }

    &__agreement-alert {
      font-size: 13px;
    }
  }

  .common-form {
    &__error {
      font-size: 13px;
    }

    &__key {
      float: initial;
      width: initial;
      padding: 16px 0 8px;
      font-size: 16px;

      :deep(small) {
        display: inline-block;
        margin-left: 12px;
        font-size: 14px;
      }
    }

    &__value {
      float: initial;
      width: initial;
      margin-left: initial;
      padding: 0 0 32px;
    }

    &__textarea,
    &__input,
    &__subinput {
      padding: 10px 12px;
      font-size: 13px;
      border-radius: 4px;
    }

    &__subinput-container {
      width: 100%;
      margin-right: 0;
      margin-bottom: 16px;

      &:not(:last-child) {
        margin-right: 0;
      }
    }

    &__subinput {
      width: 100%;
    }
  }
}
</style>
