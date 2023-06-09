<script setup lang="ts">
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useCourseStore } from '@/stores/courseStore'
// Define component props
const props = defineProps({
  departmentName: {
    type: String,
    required: true,
  },
})

import { useRouter } from 'vue-router'
const router = useRouter()
// Redirect to review page
const redirectToReview = (classID:number) => {
  router.push(`/review/${classID}`)
}


// Define table headers
const headers = [
  { title: 'Course Name', key: 'coursename' },
  { title: 'Teacher', key: 'teacher' },
  { title: 'Rating', key: 'rate' },
  { title: 'Number of Ratings', key: 'numberofrating' },
  { title: 'Action', key: 'classID', sortable: false },
]

// Search text
let searchText = ''

// Loading state
const loading = ref(true)

// Use the course store
const courseStore = useCourseStore()

// Card details visibility
const isCardDetailsVisible = ref(false)

// Fetch course list by department name
const fetchCourseList = async () => {
  await courseStore.fetchCourseListByDepartment(props.departmentName)
}

// Toggle card details visibility
const toggleCardDetails = () => {
  isCardDetailsVisible.value = !isCardDetailsVisible.value
  if (isCardDetailsVisible.value) {
    loading.value = true
    fetchCourseList().then(() => {
      loading.value = false
    })
  }
}

// Filtered course items
const filteredItems = computed(() => {
  if (searchText) {
    const searchTerm = searchText.toLowerCase()
    return courseStore.courseMap[props.departmentName].filter(
      item => item.coursename.toLowerCase().includes(searchTerm) || item.teacher.toLowerCase().includes(searchTerm),
    )
  } else {
    return courseStore.courseMap[props.departmentName]
  }
})

// Handle search
const handleSearch = () => {
  loading.value = true
  loading.value = false
}
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
          <!-- Toggle card details button -->
          <VBtn @click="toggleCardDetails">Details</VBtn>

          <VSpacer />

          <!-- Card details visibility toggle button -->
          <VBtn
            icon
            size="small"
            @click="toggleCardDetails"
          >
            <VIcon :icon="isCardDetailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
          </VBtn>
        </VCardActions>

        <!-- Card details content -->
        <VExpandTransition>
          <div v-show="isCardDetailsVisible">
            <VDivider />
            <VTable>
              <tbody>
                <tr>
                  <!-- Data table -->
                  <td>
                    <v-text-field
                      v-model="searchText"
                      variant="solo"
                      label="输入搜索 课程/老师名"
                      prepend-inner-icon="mdi-magnify"
                      single-line
                      hide-details
                      @input="handleSearch"
                    ></v-text-field>
                    <v-data-table
                      :search="searchText"
                      :headers="headers"
                      :items="filteredItems"
                      class="elevation-1"
                      :loading="loading"
                      id="sort-header"
                    >
                      <!-- Custom button content for Action column -->
                      <template v-slot:item.classID="{ item }">
                        <v-icon
                          size="small"
                          class="me-2"
                          icon="mdi-pencil"
                          @click="redirectToReview(item.value.classID)"
                        ></v-icon>
                      </template>
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