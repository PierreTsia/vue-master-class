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
        <span class="mr-2" @click="goToAddNotePreview">Add note</span>
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
import { notesCollection } from "../firebaseConfig.js";

export default {
  name: "App",
  data() {
    return {
      notes: [],
      notes2: [],
      allTags: []
    };
  },

  methods: {
    goToAddNotePreview() {
      this.$nextTick(() => {
        this.$router.push({
          name: "note",
          params: { noteId: "draft" }
        });
      });
    },
    async addNewNote({ note, redirect = true }) {
      const newNoteRef = await notesCollection.doc();
      newNoteRef
        .set({ ...note, id: newNoteRef.id, creationDate: new Date() })
        .then(() => {
          this.notes.push({ ...note, id: newNoteRef.id });

          if (redirect) {
            this.$router.push("/");
          } else {
            this.$router.push(`/note/${newNoteRef.id}`);
          }
        })
        .catch(e => {
          //eslint-disable-next-line
          console.warn(e);
        });
    },
    async updateNote({ note, redirect = true }) {
      notesCollection
        .doc(note.id)
        .set(note, { merge: true })
        .then(() => {
          if (redirect) {
            this.$router.push("/");
          }
        })
        .catch(e => {
          //eslint-disable-next-line
          console.warn(e);
        });
    },
    async deleteNote(noteId) {
      notesCollection
        .doc(noteId)
        .delete()
        .then(() => {
          this.notes = this.notes.filter(note => note.id !== noteId);
        })
        .catch(e => {
          //eslint-disable-next-line
          console.warn(e);
        });
    }
  },
  async mounted() {
    const snapshot = await notesCollection.get();
    this.notes = snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    });
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
