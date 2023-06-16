<script setup lang="ts">
// eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
const props = defineProps({
  review: Object,
})

const isCardDetailsVisible = ref(false)

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
  <VCard v-if="review">
    <VCardItem>
      <VCardTitle> {{ review.title }} - <a>{{ review.author.username }}</a></VCardTitle>
    </VCardItem>
    <VCardText class="d-flex align-center flex-wrap">
      <VRow>
        <VCol cols="12">
          <VRating
            :model-value="review.rate"
            readonly
            half-increments
            density="compact"
            class="me-3"
          />
        </VCol>
        <VCol cols="12">
          总分 {{ review.rate }} | 难度 {{ review.difficulty }} | 收获 {{ review.gain }} | 给分 {{ review.score }}
        </VCol>
      </VRow>
    </VCardText>
    <VCardText>
      <div v-html="review.content" />
    </VCardText>
    <VCardActions>
      <VBtn>
        <VIcon icon="mdi-thumb-up-outline" />
        <span>{{ review.upvoteCount }}</span>
      </VBtn>
      <VBtn>
        <VIcon icon="mdi-thumb-down-outline" />
        <span>{{ review.downvoteCount }}</span>
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
</template>
