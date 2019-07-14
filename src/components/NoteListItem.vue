<template>
  <v-flex xs12 sm6 md4 class="noteItem">
    <v-card class="noteItemCard">
      <v-card-title primary-title class="noteItemTitle">
        <div>
          <h3 class="headline mb-0">{{ note.title }}</h3>
          <small class="subheading grey--text">{{ formattedDate }}</small>
          <div class="description">
            <span>{{ note.description }}</span>
          </div>
        </div>
      </v-card-title>

      <v-card-actions class="noteTags">
        <v-chip
          disabled
          color="indigo darken-3"
          small
          v-for="(tag, index) in display(note.tags)"
          class="noteTag white--text"
          :key="index"
        >
          {{ tag }}
        </v-chip>
        <v-chip
          disabled
          color="indigo darken-3"
          small
          v-if="note.tags.length > MAX_TAGS"
          class="noteTag white--text"
        >
          + {{ note.tags.length - MAX_TAGS }}
        </v-chip>
        <v-spacer />
        <span>
          <slot name="deleteBtn" />
          <v-btn outline color="indigo" @click="goToNote">See Note</v-btn>
        </span>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { format } from "date-fns";
import fr from "date-fns/locale/fr";
export default {
  name: "Note",
  props: {
    note: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      MAX_TAGS: 2
    };
  },
  computed: {
    formattedDate() {
      const noteDate = this.note.creationDate
        ? this.note.creationDate.toDate()
        : new Date();
      return format(noteDate, "dddd D MMMM YYYY", {
        locale: fr
      });
    }
  },
  methods: {
    goToNote() {
      this.$router.push({
        name: "note",
        params: { noteId: this.note.id, note: this.note }
      });
    },
    display(tags) {
      return tags.length > this.MAX_TAGS ? tags.slice(0, this.MAX_TAGS) : tags;
    }
  }
};
</script>

<style lang="stylus">
.noteItem
    padding 10px
    height 400px
    .noteItemCard
        height 100%
        display flex
        flex-direction column
        justify-content flex-start
        .noteTag
            margin-right 5px
        .noteItemTitle
            flex-grow 1
            display flex
            flex-direction column
            justify-content flex-start
            align-items flex-start
            > div
                height 100%
                flex-grow 1
                display flex
                flex-direction column
                justify-content flex-start
                .description
                    padding 10px 0
                    flex-grow 1
                    display flex
                    flex-direction column
                    justify-content center
</style>
