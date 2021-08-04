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
      try {
        let icon = require(`@/assets/icons/${this.name}.svg?raw`);
        icon = icon.replace(/(width|height)="([\d]{2})"/g, `$1="${this.size}"`);
        icon = icon.replace(
          /#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/g,
          'currentColor'
        );
        return icon;
      } catch (e) {
        console.log(e.message);
        return '';
      }
    },
  },
};
</script>

<style scoped>
.icon__container {
  @apply flex justify-center items-center;
}
</style>
