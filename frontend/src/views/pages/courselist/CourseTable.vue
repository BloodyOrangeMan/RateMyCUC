<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable';
import { useCourseStore } from '@/stores/courseStore';

// Define the props for the component
const props = defineProps({
  departmentName: {
    type: String,
    required: true,
  },
});

// Define the headers for the data table
const headers = [
  { title: '课程名', key: 'coursename' },
  { title: '任课教师', key: 'teacher' },
  { title: '评分', key: 'rate' },
  { title: '评论数', key: 'numberofrating' },
];

// Access the course store
const courseStore = useCourseStore();

// Create a reactive variable for toggling card details visibility
const isCardDetailsVisible = ref(false);

// Fetch the course list for the department
const fetchCourseList = async () => {
  await courseStore.fetchCourseListByDepartment(props.departmentName);
};

// Toggle the visibility of card details
const toggleCardDetails = () => {
  isCardDetailsVisible.value = !isCardDetailsVisible.value;
  if (isCardDetailsVisible.value) {
    fetchCourseList();
  }
};
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <VCardTitle>
            {{ departmentName }}
          </VCardTitle>
        </VCardItem>
        <VCardActions>
          <!-- Button to toggle card details visibility -->
          <VBtn @click="toggleCardDetails">Details</VBtn>

          <VSpacer />

          <!-- Button to toggle card details visibility with an icon -->
          <VBtn
            icon
            size="small"
            @click="toggleCardDetails"
          >
            <VIcon :icon="isCardDetailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </VBtn>
        </VCardActions>

        <!-- Card details section -->
        <VExpandTransition>
          <div v-show="isCardDetailsVisible">
            <VDivider />

            <!-- Data table to display course list -->
            <VTable>
              <thead>
                <tr>
                  <th class="text-uppercase text-left">课程列表</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <v-data-table
                      :headers="headers"
                      :items="courseStore.courseMap[departmentName]"
                      class="elevation-1"
                      id="sort-header"
                    >
                  </v-data-table>
                  </td>
                </tr>
              </tbody>
            </VTable>
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
#sort-header {
  .v-data-table-header__content {
    justify-content: inherit;
  }
}
</style>
