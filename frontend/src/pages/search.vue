<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { Course } from '@/stores/courseStore'
import { useCourseStore } from '@/stores/courseStore'

const props = defineProps({
  keyword: {
    type: String,
    default: '',
  },
})

defineExpose({ keyword: props.keyword })

const courseStore = useCourseStore()
const keyword = ref('')
const serverItems = ref([] as Course[])
const totalItems = ref(0)
const loading = ref(false)

onMounted(async () => {
  const searchParams = new URLSearchParams(window.location.search)

  keyword.value = searchParams.get('keyword') || ''

  const result = await courseStore.fetchSearchResult(keyword.value, 1, 10)
  if (result) {
    serverItems.value = result.courseList
    totalItems.value = parseInt(result.totalItems[0].total)
  }
})

const loadItems = async (page: number, itemsPerPage: number) => {
  try {
    loading.value = true

    const result = await courseStore.fetchSearchResult(keyword.value, page, itemsPerPage)
    if (result) {
      serverItems.value = result.courseList
      totalItems.value = parseInt(result.totalItems[0].total)
    }
    loading.value = false
  }
  catch (error) {
    loading.value = false

    console.log('error:', error)
  }
}

const handleOptionsUpdate = (options: { page: any; itemsPerPage: any }) => {
  const { page, itemsPerPage } = options

  loadItems(page, itemsPerPage)
}

// Define table headers
const headers = [
  { title: '课程名', key: 'coursename' },
  { title: '授课教师', key: 'teachers' },
  { title: '评分', key: 'rate' },
  { title: '评测数', key: 'numberofrating' },
]
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          搜索结果 Keyword: {{ keyword }}
        </VCardTitle>
        <VTable>
          <tbody>
            <tr>
              <!-- Data table -->
              <td>
                <VDataTableServer
                  id="sort-header"
                  :headers="headers"
                  :loading="loading"
                  :items="serverItems"
                  :items-per-page="10"
                  class="elevation-1"
                  :items-length="totalItems"
                  @update:options="handleOptionsUpdate"
                >
                  <!-- Custom button content for Action column -->
                  <template #item.coursename="{ item }">
                    <div>
                      <RouterLink :to="`/review/${item.value.classID}`">
                        {{ item.value.coursename }}
                      </RouterLink>
                    </div>
                  </template>
                </VDataTableServer>
              </td>
            </tr>
          </tbody>
        </VTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.centered {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
