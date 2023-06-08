<script setup lang="ts">
import CourseHeader from './CourseHeader.vue'
import { useCourseStore } from '@/stores/courseStore'
const props = defineProps({
  item: {
    type: String,
    required: true,
  },
})

const courseStore = useCourseStore()
const isCardDetailsVisible = ref(false)

const fetchCourseList = async () => {
  await courseStore.fetchCourseListByDepartment(props.item)
}

const toggleCardDetails = () => {
  isCardDetailsVisible.value = !isCardDetailsVisible.value
  if (isCardDetailsVisible.value) {
    fetchCourseList()
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <VCardTitle>
            {{ item }}
          </VCardTitle>
        </VCardItem>
        <VCardActions>
          <VBtn @click="toggleCardDetails">Details</VBtn>

          <VSpacer />

          <VBtn
            icon
            size="small"
            @click="toggleCardDetails"
          >
            <VIcon :icon="isCardDetailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </VBtn>
        </VCardActions>

        <VExpandTransition>
          <div v-show="isCardDetailsVisible">
            <VDivider />
            <CourseHeader :item="courseStore.courseList" />
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>
  </VRow>
</template>