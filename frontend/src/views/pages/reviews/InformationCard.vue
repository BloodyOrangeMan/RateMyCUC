<script setup lang="ts">
import { useReviewStore } from '../../../stores/reviewStore'

const reviewStore = useReviewStore()

const reviews = computed(() => reviewStore.course?.reviews)

const ratingsData = computed(() => {
  const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let totalReviews = 0
  if (reviews.value) {
    totalReviews = reviews.value.length
    reviews.value.forEach(review => {
      const rating = Math.round(Number(review.rate))
      if (counts[rating] !== undefined)
        counts[rating]++
    })
  }

  const percentages: { [key: number]: number } = {}
  for (const rating in counts)
    percentages[rating] = totalReviews ? (counts[rating] / totalReviews) * 100 : 0

  return { counts, percentages }
})
</script>

<template>
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
            {{ reviewStore.averageRate }}
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
        v-for="(data, rating) in ratingsData.percentages"
        :key="rating"
      >
        <VProgressLinear
          :model-value="data"
          class="mx-n5"
          color="#F57F17"
          height="20"
          rounded
        />

        <template #prepend>
          <span class="rating-number">{{ rating }}</span>
          <VIcon
            icon="mdi-star"
            class="mx-3"
            color="#F57F17"
          />
        </template>

        <template #append>
          <div class="rating-values">
            <span class="d-flex justify-end rating-number">{{ ratingsData.counts[rating] }}</span>
          </div>
        </template>
      </VListItem>
    </VList>
  </VCard>
</template>

<style>
.rating-number {
  display: inline-block;
  width: 20px;
  text-align: center;
}
</style>
