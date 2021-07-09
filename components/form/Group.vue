<template>
  <validation-provider
    class="mb-8"
    v-slot="{ errors: validationErrors, invalid, touched }"
    :rules="rules"
    :name="label"
    :mode="mode"
    :vid="vid"
    tag="div"
  >
    <label
      :for="generatedId"
      class="form__label"
      :class="{ 'form__label--invalid': (invalid && touched) || hasErrors }"
      >{{ label }}</label
    >
    <div class="relative">
      <input
        :type="type"
        :value="value"
        :id="generatedId"
        class="form__input"
        :class="{ 'form__input--invalid': (invalid && touched) || hasErrors }"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', invalid)"
      />
      <slot name="icon"></slot>
    </div>
    <slot></slot>
    <slot name="errors"></slot>
    <ul v-show="validationErrors">
      <li v-for="error in validationErrors" :key="error">
        <form-error>{{ error }}</form-error>
      </li>
    </ul>
  </validation-provider>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: [String, Object],
      required: false,
      default: '',
    },
    vid: {
      type: String,
      required: false,
      default: '',
    },
    mode: {
      type: String,
      required: false,
      default: 'eager',
    },
    hasErrors: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data: () => ({
    generatedId: null,
  }),
  mounted() {
    this.generatedId = Math.random().toString(16).substr(2);
  },
};
</script>

<style scoped>
.form__label {
  @apply flex text-sm mb-2 items-center;
}
.form__input {
  @apply w-full bg-white bg-opacity-10 border border-transparent focus:border-white rounded relative;

  height: 3.25rem;
}

.form__input--invalid {
  @apply border-error bg-error bg-opacity-10;
}

.form__label--invalid {
  @apply text-error;
}
</style>
