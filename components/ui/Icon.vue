<template>
  <div class="icon__container" v-html="iconLink"></div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: false,
      default: 'question-square',
    },
    size: {
      type: String,
      required: false,
      default: '20',
    },
  },
  computed: {
    iconLink() {
      let icon = require(`/node_modules/bootstrap-icons/icons/${this.name}.svg?raw`);
      icon = icon.replace(/(width|height)="([\d]{2})"/g, `$1="${this.size}"`);
      return icon;
    },
  },
};
</script>

<style scoped></style>
