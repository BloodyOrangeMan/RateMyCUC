<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import eCommerce2 from '@images/eCommerce/2.png'
import pages1 from '@images/pages/1.png'
import pages2 from '@images/pages/2.png'
import pages3 from '@images/pages/3.png'
import pages5 from '@images/pages/5.jpg'
import pages6 from '@images/pages/6.jpg'
import courseTeacher from './courseTeacher.vue'
import { it } from 'node:test'
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
          <courseTeacher :item="teacher" />
        </div>
      </div>
    </VExpandTransition>
  </VTable>
</template>
