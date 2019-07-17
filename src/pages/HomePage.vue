<template>
  <v-layout column justify-start class="home">
    <NotesMenu
      :menuItems="sortedTags"
      :activeTags="activeTagsLabels"
      @onMenuItemClick="tag => setActiveTag(tag)"
    >
      <template slot="all">
        <v-chip
          :class="['menuItem', { isActive: isAllSelected }]"
          @click="isAllSelected = !isAllSelected"
        >
          all
        </v-chip>
      </template>
    </NotesMenu>
    <NotesList :notes="notes" :activeTags="activeTagsLabels" />
  </v-layout>
</template>

<script>
import NotesList from "@/components/NotesList";
import NotesMenu from "@/components/NotesMenu";
import _ from "lodash";
export default {
  name: "Home",
  props: {
    notes: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      activeTags: [],
      isAllSelected: true
    };
  },
  watch: {
    sortedTags: {
      immediate: true,
      handler(tags) {
        const tagLabels = tags.map(tag => tag.label);
        this.$emit("onTagsChanged", tagLabels);
      }
    },
    isAllSelected: {
      handler(value) {
        if (value) {
          this.activeTags = [];
        }
      }
    }
  },
  components: {
    NotesList,
    NotesMenu
  },
  computed: {
    countedTags() {
      return _.countBy(
        _.flatMap(this.notes, note => note.tags).map(tag => {
          return { label: tag };
        }),
        "label"
      );
    },
    sortedTags() {
      return _.sortBy(
        _.map(this.countedTags, (count, tag) => {
          return { label: tag, count };
        }),
        "count"
      ).reverse();
    },
    activeTagsLabels() {
      const activeLabels = this.activeTags.map(tag => tag.label);
      if (this.isAllSelected) {
        return ["all"];
      }
      return activeLabels;
    }
  },
  methods: {
    setActiveTag(tag) {
      this.isAllSelected = false;
      if (this.activeTags.includes(tag)) {
        this.activeTags = this.activeTags.filter(
          existingTag => existingTag !== tag
        );
      } else {
        this.activeTags.push(tag);
      }
    }
  }
};
</script>
