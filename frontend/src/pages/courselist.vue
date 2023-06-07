<script setup lang="ts">
import courseDepartment from '@/components/courseDepartment.vue'
import { useCourseStore } from '@/stores/courseStore';

const isCardDetailsVisible = ref(false)

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
      <courseDepartment :item="department" />
    </div>
  </div>
</template>
