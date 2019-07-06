<template>
  <v-app>
    <v-toolbar app>
      <router-link to="/">
        <v-toolbar-title class="headline text-uppercase">
          <span>Vue MD</span>
          <span class="font-weight-light"> App</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat target="_blank">
        <span class="mr-2" @click="goToAddNoteView">Add note</span>
      </v-btn>
    </v-toolbar>
    <v-content class="appContent">
      <v-container fill-height>
        <router-view
          :notes="notes"
          :allTags="allTags"
          @onNewNoteSaved="addNewNote"
          @onNoteUpdate="updateNote"
          @onTagsChanged="tags => (allTags = tags)"
          @onDeleteClick="deleteNote"
        ></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      notes: [],
      allTags: [],
      exampleNote: {
        title: "Your awesome note title",
        description:
          "One to two paragraph statement about your product and what it does.",
        creationDate: new Date(),
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
  watch: {
    notes: {
      immediate: true,
      deep: true,
      handler(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
      }
    }
  },
  methods: {
    goToAddNoteView() {
      localStorage.setItem("currentNote", null);
      this.$nextTick(() => {
        this.$router.push({
          name: "note",
          params: { noteId: "draft", note: this.exampleNote }
        });
      });
    },
    addNewNote({ note, redirect = true }) {
      this.notes = [note, ...this.notes];
      localStorage.setItem("currentNote", null);
      if (redirect) {
        this.$router.push("/");
      } else {
        this.$router.push(`/note/${note.id}`);
      }
    },
    updateNote({ note, redirect = true }) {
      const indexToUpdate = this.notes.findIndex(note => note.id === note.id);
      this.$set(this.notes, indexToUpdate, note);
      if (redirect) {
        this.$router.push("/");
      }
    },
    deleteNote(noteId) {
      this.notes = this.notes.filter(note => note.id !== noteId);
    }
  },
  mounted() {
    const rawNotes = localStorage.getItem("notes");
    if (rawNotes) {
      this.notes = JSON.parse(rawNotes).sort((a, b) =>
        new Date(a.creationDate) > new Date(b.creationDate) ? -1 : 1
      );
    }
  }
};
</script>
<style>
.application a {
  color: black;
}
a:link {
  font-weight: inherit;
  text-decoration: none;
  color: inherit;
}
#app {
  height: 100%;
  background-color: #fafafa;
}
</style>
