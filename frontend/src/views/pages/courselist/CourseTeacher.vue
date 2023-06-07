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
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

</script>
<template>
  <VCard>
    <div class="d-flex flex-column-reverse flex-md-row">
      <div>
        <VCardItem>
          <VCardTitle>
            {{ item.teacherName }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="d-flex align-center flex-wrap text-body-1">
          <v-rating id="rating-star"
            v-model="item.rate"
            half-increments
            readonly
          ></v-rating>
          <span>{{ item.rate }} Star | {{ item.numberOfRating }} reviews</span>
        </VCardText>

        <VCardText>
          Before there was a United States of America, there were coffee houses, because how are you supposed to build.
        </VCardText>

        <VCardActions>
          <VBtn>Location</VBtn>
          <VBtn>Reviews</VBtn>
        </VCardActions>
      </div>

      <div class="ma-auto pa-5">
        <VImg
          :width="176"
          :src="pages5"
          class="rounded"
        />
      </div>
    </div>
  </VCard>
</template>