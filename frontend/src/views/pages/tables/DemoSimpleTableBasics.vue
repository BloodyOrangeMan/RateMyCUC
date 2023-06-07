<script setup lang="ts">
import CourseTable from '@/components/courseTable.vue'

const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  })

</script>

<template>
  <VTable>
    <thead>
      <tr>
        <th class="text-uppercase text-left">课程名</th>
      </tr>
    </thead>

    <tbody>
      <tr
        v-for="course in item.courseByDepartment"
        :key="course.courseName"
      >
        <td>
          <CourseTable :item="course" />
        </td>
      </tr>
    </tbody>
  </VTable>
</template>
