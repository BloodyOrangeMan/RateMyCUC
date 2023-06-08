<script setup lang="ts">
import CourseTable from '../courselist/CourseTable.vue';

const props = defineProps({
    item: {
      type: Array,
      required: true,
    },
  })

</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase text-left">课程列表</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>
          <CourseTable :item="item" />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
