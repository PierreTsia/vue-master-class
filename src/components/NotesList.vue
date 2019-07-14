<template>
  <v-layout row wrap class="noteList">
    <NoteItem v-for="note in activeNotes" :key="note.id" :note="note">
      <template slot="deleteBtn">
        <v-btn fab flat small @click="$parent.$emit('onDeleteClick', note.id)">
          <v-icon color="indigo">delete</v-icon>
        </v-btn>
      </template>
    </NoteItem>
  </v-layout>
</template>

<script>
import NoteItem from "@/components/NoteListItem.vue";
import _ from "lodash";
export default {
  name: "NotesList",
  props: {
    notes: {
      type: Array,
      default: () => []
    },
    activeTags: {
      type: Array,
      default: () => []
    }
  },
  components: {
    NoteItem
  },
  data() {
    return {};
  },
  computed: {
    activeNotes() {
      return _.sortBy(
        this.notes.filter(
          note =>
            this.activeTags.includes("all") ||
            note.tags.some(noteTag => this.activeTags.includes(noteTag))
        ),
        "creationDate"
      ).reverse();
    }
  }
};
</script>
