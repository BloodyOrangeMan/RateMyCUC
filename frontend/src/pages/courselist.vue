<script setup lang="ts">
import CourseDepartment from '@/views/pages/courselist/CourseDepartment.vue';
import { useCourseStore } from '@/stores/courseStore';

const courseStore = useCourseStore();

onMounted(() => {
  courseStore.fetchCourseList();
});

</script>

<template>
  <div>
    <div
      v-for="department in courseStore.courseList"
      :key="department.departmentName"
    >
      <CourseDepartment :item="department" />
    </div>
  </div>
</template>
