<template>
  <v-container v-if="note" class="NotePreview">
    <v-layout row>
      <h1 class="title--primary pb-3">{{ note.title }}</h1>
      <slot />
    </v-layout>
    <v-layout row>
      <small class="noteCreationDate grey--text">{{ formattedDate }}</small>
    </v-layout>

    <v-chip
      small
      disabled
      v-for="(tag, index) in note.tags"
      :key="index"
      class="noteTag"
    >
      {{ tag }}
    </v-chip>

    <v-layout class="noteDescription mt-3 mb-5">
      <v-flex xs12
        ><span class="py-2 font-weight-bold">
          {{ note.description }}
        </span></v-flex
      >
    </v-layout>
    <div class="noteContent" v-html="formattedContent" />
  </v-container>
</template>

<script>
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
import marked from "marked";
export default {
  name: "NotePreview",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    formattedDate() {
      const noteDate = this.note.creationDate
        ? this.note.creationDate.toDate()
        : new Date();
      return format(noteDate, "dddd D MMMM YYYY", {
        locale: fr
      });
    },
    formattedContent() {
      return marked(this.note.content, {
        tables: true,
        gfm: true
      });
    }
  }
};
</script>

<style lang="stylus">
.NotePreview
    background-color white
    border-color 4px
.noteDescription
    span
        white-space pre-line
.noteContent
    table, td, th
        border 1px solid lightgray
        border-collapse collapse
    table
        margin 15px 0
    blockquote
        background: #f9f9f9;
        border-left: 10px solid #ccc;
        margin: 1.5em 10px;
        padding: 0.5em 10px;
        quotes: "\201C""\201D""\2018""\2019";
    blockquote:before
        color: #ccc;
        content: open-quote;
        font-size: 4em;
        line-height: 0.1em;
        margin-right: 0.25em;
        vertical-align: -0.4em;
    blockquote p
        display: inline;
    a
        color blue !important
        text-decoration underline
</style>
