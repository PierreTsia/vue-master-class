<template>
  <v-textarea
    outline
    rows="20"
    label="Outline textarea"
    v-model="input"
    @input="event => update(event)"
  ></v-textarea>
</template>
<script>
export default {
  name: "NoteContentEditor",
  components: {},
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  watch: {
    content: {
      immediate: true,
      handler(content) {
        if (content.length) {
          this.input = content;
        }
      }
    }
  },
  data() {
    return {
      input: ""
    };
  },
  computed: {},
  methods: {
    update() {
      this.$emit("onContentChanged", this.input);
    }
  },
  mounted() {}
};
</script>
