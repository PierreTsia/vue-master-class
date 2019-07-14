<template>
  <v-layout class="notePage">
    <v-layout row wrap v-if="notFound">
      <v-flex xs12>
        <h1 class="text--primary">
          Note not found
        </h1>
        <small class="text--secondary">
          <router-link to="/">Back to HomePage</router-link></small
        >
      </v-flex>
    </v-layout>

    <v-layout v-else row wrap>
      <v-flex xs12 sm6 v-show="isEdited">
        <v-container>
          <NoteEdit
            v-if="note"
            :note="note"
            :allTags="allTags"
            @onTagsChanged="tags => (note.tags = tags)"
            @onContentChanged="content => (note.content = content)"
          >
            <template slot="save">
              <v-btn @click="saveNote" class="d-block ml-auto">
                <v-icon class="mr-2">save</v-icon>
                save
              </v-btn>
            </template>
          </NoteEdit>
        </v-container>
      </v-flex>
      <v-flex xs12 sm6 class="mx-auto">
        <NotePreview v-if="note" :note="note">
          <v-btn
            small
            flat
            fab
            class="ml-auto indigo white--text"
            @click="handleEditClick"
          >
            <v-icon v-if="!isEdited">edit</v-icon>
            <v-icon v-else>save</v-icon>
          </v-btn>
        </NotePreview>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import NoteEdit from "@/components/NoteEdit";
import NotePreview from "@/components/NotePreview";
const { notesCollection } = require("../../firebaseConfig.js");

export default {
  name: "NotePageView",
  props: {
    allTags: {
      type: Array,
      default: () => []
    }
  },
  components: {
    NoteEdit,
    NotePreview
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(newRoute) {
        if (newRoute.params.noteId === "draft") {
          this.isEdited = true;
          this.note = this.exampleNote;
        }
      }
    }
  },
  data() {
    return {
      note: null,
      notFound: false,
      isEdited: false,
      exampleNote: {
        title: "Your awesome note title",
        description:
          "One to two paragraph statement about your product and what it does.",
        tags: ["tech"],
        content:
          "## Meta\n" +
          "\n" +
          "> Your Name – [@YourTwitter](https://twitter.com/dbader_org) – YourEmail@example.com\n" +
          "\n" +
          "Distributed under the XYZ license. See ``LICENSE`` for more information.\n" +
          "\n" +
          "[https://github.com/yourname/github-link](https://github.com/dbader/)"
      }
    };
  },
  computed: {},
  methods: {
    saveNote({ redirect = true }) {
      if (this.$route.params.noteId === "draft") {
        this.saveNewNote({ redirect });
      } else {
        this.updateNote({ redirect });
      }
    },
    handleEditClick() {
      if (this.isEdited) {
        this.saveNote({ redirect: false });
      }
      this.isEdited = !this.isEdited;
    },
    saveNewNote({ redirect }) {
      const newNote = { ...this.note };
      this.$emit("onNewNoteSaved", { note: newNote, redirect });
    },
    updateNote({ redirect }) {
      this.$emit("onNoteUpdate", { redirect, note: this.note });
    }
  },
  async mounted() {
    if (this.$route.params.noteId) {
      if (this.$route.params.noteId === "draft") {
        this.isEdited = true;
      } else {
        const noteRef = await notesCollection
          .doc(this.$route.params.noteId)
          .get();
        if (noteRef.exists) {
          this.note = noteRef.data();
        }
      }
    }
    if (this.$route.params.note) {
      this.note = this.$route.params.note;
    }
  }
};
</script>

<style lang="stylus">
.notePage
    height 100%
    display flex
    justify-content center
    align-items flex-start
    .note
        max-width 1200px
        flex-grow 1
    .editedNote
        width 50%
</style>
