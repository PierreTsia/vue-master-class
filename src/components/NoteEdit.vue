<template>
  <v-layout column class="noteEditor">
    <v-flex xs12>
      <v-text-field
        outline
        v-model="editedNote.title"
        :counter="100"
        label="Title"
        background="white"
      ></v-text-field>
    </v-flex>

    <v-flex xs12 class="mt-3 autocomplete">
      <v-chip
        v-for="(tag, index) in newTags"
        :key="index"
        class="tag__chip"
        close
        @input="handleDeleteChip(tag, index)"
      >
        {{ tag }}
      </v-chip>
      <v-autocomplete
        v-model="newTags"
        prepend-inner-icon="note_add"
        :search-input.sync="inputValue"
        :items="nonPickedTags"
        @click:prepend-inner="handleAddNewTag"
        label="Categories"
        multiple
        outline
        chips
        deletable-chips
      >
      </v-autocomplete>
    </v-flex>
    <v-flex xs12
      ><v-textarea
        outline
        name="description"
        label="Description"
        v-model="note.description"
      ></v-textarea
    ></v-flex>
    <v-flex xs12>
      <NoteContentEditor
        :content="note.content"
        @onContentChanged="newContent => $emit('onContentChanged', newContent)"
      />
    </v-flex>
    <v-flex xs12>
      <slot name="save" />
    </v-flex>
  </v-layout>
</template>

<script>
import NoteContentEditor from "@/components/NoteContentEditor.vue";
export default {
  name: "NoteEdit",
  props: {
    note: {
      type: Object,
      default: () => {}
    },
    allTags: {
      type: Array,
      default: () => []
    }
  },
  components: {
    NoteContentEditor
  },
  watch: {
    note: {
      immediate: true,
      deep: true,
      handler(note) {
        if (note) {
          this.editedNote = this.note;
          this.newTags = this.note.tags;
        }
      }
    },
    newTags: {
      immediate: true,
      handler(tags) {
        if (tags.length) {
          this.$emit("onTagsChanged", tags);
        }
      }
    }
  },
  data() {
    return {
      editedNote: null,
      possibleTags: [],
      tags: [],
      newTags: [],
      inputValue: ""
    };
  },
  computed: {
    nonPickedTags() {
      return this.allTags.filter(tag => !this.newTags.includes(tag));
    }
  },
  methods: {
    handleAddNewTag() {
      this.newTags.push(this.inputValue.trim().toLowerCase());
      this.possibleTags.push(this.inputValue.trim().toLowerCase());
    },
    handleDeleteChip(tagToDelete) {
      this.newTags = this.newTags.filter(tag => tag !== tagToDelete);
    }
  }
};
</script>

<style lang="stylus">
.autocomplete
    position relative
    .icon
        position absolute
        left 0
        top 0
        cursor pointer
</style>
