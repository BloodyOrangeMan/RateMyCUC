<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  item: {
    type: Array,
    required: true,
  },
})

const headers = [
  { title: '课程名', key: 'coursename' },
  { title: '任课教师', key: 'teacher' },
  { title: '评分', key: 'rate' },
  { title: '评论数', key: 'numberofrating' },
]
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="item"
    class="elevation-1"
  ></v-data-table>
</template>
