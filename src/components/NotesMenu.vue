<template>
  <v-layout row wrap align-center class="categoriesMenu px-2">
    <v-flex>
      <slot name="all" />
      <v-chip
        :class="['menuItem', { isActive: activeTags.includes(menuItem.label) }]"
        v-for="(menuItem, index) in menuItems"
        :key="index"
        @click="handleEmitMenuItem(menuItem)"
      >
        {{ menuItem.label }} ({{ menuItem.count }})
      </v-chip>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "NotesMenu",
  props: {
    menuItems: {
      type: Array,
      default: () => []
    },
    activeTags: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    handleEmitMenuItem(item) {
      this.$emit("onMenuItemClick", item);
    }
  }
};
</script>

<style lang="stylus">
.categoriesMenu
    max-height 80px
    .menuItem
        background #E8EAF6
        color #1A237E
        justify-content center
        align-items center
        margin-right 10px
        span
            cursor pointer !important
        &.isActive
            background #1A237E
            color white
</style>
