<template>
  <BaseFormField :title="title" :error="error">
    <input class="form__input" :type="type" v-model="dataValue"
           :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import FormFieldMixin from '@/mixins/FormFieldMixin'
export default {
  props: {
    type: {
      default: 'text'
    }
  },
  mixins: [FormFieldMixin]
}
</script>

<style scoped>

</style>