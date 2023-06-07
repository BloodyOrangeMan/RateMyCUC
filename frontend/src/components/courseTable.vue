<script setup lang="ts">
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const isCardDetailsVisible = ref(false)
</script>

<template>
  <VTable>
    <VCardActions>
      <VBtn @click="isCardDetailsVisible = !isCardDetailsVisible">
        {{ item.courseName }}
      </VBtn>

      <VSpacer />

      <VBtn
        icon
        size="small"
        @click="isCardDetailsVisible = !isCardDetailsVisible"
      >
        <VIcon :icon="isCardDetailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
      </VBtn>
    </VCardActions>
    <VExpandTransition>
      <div v-show="isCardDetailsVisible">
        <VDivider
          v-for="teacher in item.courseList"
          :key="teacher.teacherName"
        />
        <div
          v-for="teacher in item.courseList"
          :key="teacher.teacherName"
        >
          <CourseTeacher :item="teacher" />
        </div>
      </div>
    </VExpandTransition>
  </VTable>
</template>
