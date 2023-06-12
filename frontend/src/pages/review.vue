<script setup lang="ts">
import { useReviewStore } from '../stores/reviewStore'

const route = useRoute()
const classID = parseInt(route.params.classID as string)

const content = ref('')
const outlined = ref(true)
const dense = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
const maxWidth = ref<number>(900)

const newTagDialog = ref(false)
const newTag = ref('')

const rating = ref(0)
const dialog = ref(false)
const isCardDetailsVisible = ref(false)

const reviewStore = useReviewStore()

watch(
  () => parseInt(route.params.classID as string),
  async (newClassID: number | undefined) => {
    if (newClassID)
      await reviewStore.fetchCourse(newClassID)
  },
  { immediate: true },
)
onMounted(async () => {
  await reviewStore.fetchCourse(classID) // replace this with the actual id of the course
})

const randomCourses = computed(() => {
  return reviewStore.course?.teachers.flatMap(teacher => teacher.courses)
    .sort(() => Math.random() - 0.5)
    .slice(0, 6)
})

const submitTag = () => {
  useReviewStore().addTag(classID, newTag.value)
  newTag.value = ''
  dialog.value = false
}

const comments = [
  {
    text: '牛逼',
    user: 'lsj',
  },
  {
    text: '牛逼',
    user: 'lsj',
  },
  {
    text: '牛逼',
    user: 'lsj',
  },
  {
    text: '牛逼',
    user: 'lsj',
  },
  {
    text: '牛逼',
    user: 'lsj',
  },
]
</script>

<template>
  <VRow class="match-height">
    <!-- 👉 course overview here -->
    <VCol
      cols="12"
      md="8"
    >
      <VCard>
        <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
          <div>
            <VCardItem>
              <VCardTitle>{{ reviewStore.course?.courseName }} - <a>{{ reviewStore.course?.teacherName }}</a></VCardTitle>
            </VCardItem>
            <VContainer class="text-start">
              <VRow>
                <VCol cols="3">
                  难度：
                </VCol>
                <VCol cols="9">
                  <VRating
                    :model-value="reviewStore.averageDifficulty"
                    readonly
                    density="compact"
                    half-increments
                  />
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="3">
                  收获：
                </VCol>
                <VCol cols="9">
                  <VRating
                    :model-value="reviewStore.averageGain"
                    readonly
                    class="me-3"
                    density="compact"
                    half-increments
                  />
                </VCol>
              </VRow>
              <VRow>
                <VCol cols="3">
                  给分：
                </VCol>
                <VCol cols="9">
                  <VRating
                    :model-value="reviewStore.averageScore"
                    readonly
                    class="me-3"
                    density="compact"
                    half-increments
                  />
                </VCol>
              </VRow>
            </VContainer>
            <VCardText class="d-flex justify-center">
              <div class="me-auto pe-4">
                <p class="d-flex align-center mb-6">
                  <VIcon
                    color="primary"
                    icon="mdi-lock-open-outline"
                  />
                  <span class="ms-3">{{ reviewStore.course?.limitDesc }}</span>
                </p>

                <p class="d-flex align-center mb-0">
                  <VIcon
                    color="primary"
                    icon="mdi-school-outline"
                  />
                  <span class="ms-3">{{ reviewStore.course?.credit }}</span>
                </p>
              </div>

              <VDivider
                v-if="$vuetify.display.smAndUp"
                vertical
                inset
              />

              <div class="ms-auto ps-4">
                <p class="d-flex align-center mb-6">
                  <VIcon
                    color="primary"
                    icon="mdi-town-hall"
                  />
                  <span class="ms-3">{{ reviewStore.course?.departmentName }}</span>
                </p>

                <p class="d-flex align-center mb-0">
                  <VIcon
                    color="primary"
                    icon="mdi-clock-fast"
                  />
                  <span class="ms-3">{{ reviewStore.course?.hours }} 学时</span>
                </p>
              </div>
            </VCardText>
          </div>
          <div class="ma-auto pa-5">
            <div class="d-flex justify-center mt-auto text-h5">
              总分
            </div>
            <div class="d-flex align-center flex-column my-auto">
              <div class="text-h2 mt-5">
                {{ reviewStore.course?.totalRate }}
                <span class="text-h6 ml-n3">/5</span>
              </div>

              <VRating
                :model-value="reviewStore.course?.totalRate"
                readonly
                color="#F57F17"
                half-increments
              />
              <div class="px-3">
                {{ reviewStore.course?.numberOfRatings }} 人评价过
              </div>
            </div>
          </div>
        </div>
        <VList
          bg-color="transparent"
          class="d-flex flex-column-reverse"
          density="compact"
        >
          <VListItem
            v-for="(rating, i) in 5"
            :key="i"
          >
            <VProgressLinear
              :model-value="rating * 15"
              class="mx-n5"
              color="#F57F17"
              height="20"
              rounded
            />

            <template #prepend>
              <span>{{ rating }}</span>
              <VIcon
                icon="mdi-star"
                class="mx-3"
                color="#F57F17"
              />
            </template>

            <template #append>
              <div class="rating-values">
                <span class="d-flex justify-end"> {{ rating * 224 }} </span>
              </div>
            </template>
          </VListItem>
        </VList>
      </VCard>
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <VCard class="d-flex flex-column">
        <VCardItem>
          <VCardTitle> Tags </VCardTitle>
        </VCardItem>
        <div class="d-flex flex-wrap">
          <VChip
            v-for="(courseTag, index) in reviewStore.course?.courseTags"
            :key="index"
            color="primary"
            class="ma-2"
            size="x-large"
            @click="reviewStore.upvoteTag(reviewStore.course?.classID ?? 0, courseTag.tag.id)"
          >
            {{ courseTag.tag.name }} ({{ courseTag.upvotes }})
          </VChip>
        </div>
        <VCardActions class="align-self-end">
          <VBtn @click="newTagDialog = true">
            添加 Tag
          </VBtn>
        </VCardActions>

        <VDialog
          v-model="newTagDialog"
          persistent
          max-width="600px"
        >
          <VCard>
            <VCardTitle>
              <span class="headline">添加一个新的 Tag</span>
            </VCardTitle>

            <VCardText>
              <VTextField
                v-model="newTag"
                label="Tag"
                required
              />
            </VCardText>

            <VCardActions>
              <VSpacer />
              <VBtn
                color="blue darken-1"
                @click="newTagDialog = false"
              >
                Close
              </VBtn>
              <VBtn
                color="blue darken-1"
                @click="submitTag"
              >
                Save
              </VBtn>
            </VCardActions>
          </VCard>
        </VDialog>

        <VDivider />

        <!-- 👉 related course  -->
        <VCardItem>
          <VCardTitle> 相关课程 </VCardTitle>
        </VCardItem>

        <VList>
          <VListItem
            v-for="(course, index) in randomCourses"
            :key="`course-${index}`"
            :to="`/review/${course.classID}`"
            router-link
            color="primary"
          >
            <VListItemText>
              {{ course.courseName }}
            </VListItemText>
          </VListItem>
        </VList>
      </VCard>
    </VCol>
    <!-- 👉 pop up here -->
    <VRow justify="center">
      <VDialog
        v-model="dialog"
        persistent
        width="1024"
      >
        <template #activator="{ props }">
          <VBtn
            color="primary"
            v-bind="props"
            class="fixed-button"
          >
            <VIcon icon="mdi-pencil" />
            写评论
          </VBtn>
        </template>
        <VCard>
          <VCardText>
            <VContainer class="text-start">
              <VRow>
                <VCol
                  cols="12"
                  md="1"
                >
                  总评：
                </VCol>
                <VCol
                  cols="12"
                  md="5"
                >
                  <VRating
                    v-model="rating"
                    hover
                    half-increments
                    class="me-3"
                    density="compact"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="1"
                >
                  难度：
                </VCol>
                <VCol
                  cols="12"
                  md="5"
                >
                  <VRating
                    v-model="rating"
                    hover
                    half-increments
                    class="me-3"
                    density="compact"
                  />
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  cols="12"
                  md="1"
                >
                  收获：
                </VCol>
                <VCol
                  cols="12"
                  md="5"
                >
                  <VRating
                    v-model="rating"
                    hover
                    half-increments
                    class="me-3"
                    density="compact"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="1"
                >
                  给分：
                </VCol>
                <VCol
                  cols="12"
                  md="5"
                >
                  <VRating
                    v-model="rating"
                    hover
                    half-increments
                    class="me-3"
                    density="compact"
                  />
                </VCol>
              </VRow>
              <VRow>
                <VCol>
                  <VTextField label="标题" />
                </VCol>
              </VRow>
            </VContainer>
          </VCardText>
          <VuetifyTiptap
            v-model="content"
            label="撰写评论"
            :hide-toolbar="hideToolbar"
            :disable-toolbar="disableToolbar"
            :outlined="outlined"
            :dense="dense"
            :error-messages="errorMessages"
            rounded
            :max-height="465"
            :max-width="maxWidth"
          />
          <VCardActions>
            <VSpacer />
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Close
            </VBtn>
            <VBtn
              color="blue-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Save
            </VBtn>
          </VCardActions>
        </VCard>
      </VDialog>
    </VRow>
    <VDivider class="my-2" />
    <!-- 👉 review card here -->
    <VCol cols="12">
      <VCard>
        <VCardItem>
          <VCardTitle>好评！- <a>Username</a></VCardTitle>
        </VCardItem>
        <VCardText class="d-flex align-center flex-wrap">
          <VRating
            :model-value="5"
            readonly
            density="compact"
            class="me-3"
          />
          <span class="text-subtitle-2"> 总分 5.0 | 难度 1.0 | 收获 5.0 | 给分 4.5</span>
        </VCardText>
        <VCardText>
          <div v-html="content" />
        </VCardText>

        <VCardActions>
          <VBtn>
            <VIcon icon="mdi-thumb-up-outline" />
            <span>5</span>
          </VBtn>
          <VBtn>
            <VIcon icon="mdi-thumb-down-outline" />
            <span>2</span>
          </VBtn>
        </VCardActions>
        <VCardActions>
          <VBtn @click="isCardDetailsVisible = !isCardDetailsVisible">
            评论区
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
            <VDivider />

            <VList>
              <VListItem
                v-for="(comment, i) in comments"
                :key="i"
              >
                <VListItemContent>
                  <VListItemTitle><a>{{ comment.user }}</a>: {{ comment.text }}</VListItemTitle>
                </VListItemContent>
              </VListItem>
            </VList>
            <VRow
              align="center"
              justify="center"
            >
              <VCol
                cols="12"
                sm="6"
              >
                <VTextField
                  label="Add a comment"
                  filled
                  clearable
                  class="my-5"
                />
              </VCol>
              <VCol cols="auto">
                <VBtn
                  color="primary"
                  class="my-5"
                >
                  发布
                </VBtn>
              </VCol>
            </VRow>
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.avatar-center {
  position: absolute;
  border: 3px solid rgb(var(--v-theme-surface));
  inset-block-start: -2rem;
  inset-inline-start: 1rem;
}

// membership pricing
.member-pricing-bg {
  position: relative;
  background-color: rgba(var(--v-theme-on-surface), var(--v-hover-opacity));
}

.membership-pricing {
  sup {
    inset-block-start: 9px;
  }
}

.fixed-button {
  position: fixed;
  // To keep upgrade to pro button on top of v-layout
  z-index: 999;
  inset-block-end: 5%;
  inset-inline-end: 79px;
}
</style>
