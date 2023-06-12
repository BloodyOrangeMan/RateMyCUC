<script setup lang="ts">
import { useReviewStore } from '../stores/reviewStore'
import InformationCard from '@/views/pages/reviews/InformationCard.vue'
import TagCard from '@/views/pages/reviews/TagCard.vue'

const route = useRoute()
const classID = parseInt(route.params.classID as string)

const content = ref('')
const outlined = ref(true)
const dense = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
const maxWidth = ref<number>(900)

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
      <InformationCard />
    </VCol>
    <VCol
      cols="12"
      md="4"
    >
      <TagCard :class-i-d="classID" />
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
                <VListItemTitle><a>{{ comment.user }}</a>: {{ comment.text }}</VListItemTitle>
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
