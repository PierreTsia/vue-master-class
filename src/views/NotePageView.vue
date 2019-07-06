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
        <NoteView v-if="note" :note="note">
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
        </NoteView>
      </v-flex>
    </v-layout>
  </v-layout>
</template>
<script>
import NoteEdit from "@/components/NoteEdit";
import NoteView from "@/components/NoteView";
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
    NoteView
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        if (newRoute !== oldRoute && newRoute.params.note) {
          this.note = newRoute.params.note;
        }
      }
    }
  },
  data() {
    return {
      note: null,
      notFound: false,
      isEdited: false
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
      const newNote = { ...this.note, id: this.uuid() };
      this.$emit("onNewNoteSaved", { note: newNote, redirect });
    },
    updateNote({ redirect }) {
      this.$emit("onNoteUpdate", { redirect, note: this.note });
    },
    uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
        c
      ) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  },
  mounted() {
    if (this.$route.params.noteId === "draft") {
      this.isEdited = true;
    }
    if (this.$route.params.note) {
      localStorage.setItem(
        "currentNote",
        JSON.stringify(this.$route.params.note)
      );
      this.note = this.$route.params.note;
    } else {
      const localStorageNote = localStorage.getItem("currentNote");
      if (localStorageNote) {
        this.note = JSON.parse(localStorageNote);
      } else {
        this.notFound = true;
      }
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
