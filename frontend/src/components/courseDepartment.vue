<script setup lang='ts'>
import DemoSimpleTableBasics from '@/views/pages/tables/DemoSimpleTableBasics.vue'

const props = defineProps({
    item: {
      type: Object,
      required: true,
    },
  })

const isCardDetailsVisible = ref(false)

</script>

<template>
<VRow>
    <VCol cols="12">
      <VCard>
        <VCardItem>
            <VCardTitle>
                {{ item.departmentName }}
            </VCardTitle>
        </VCardItem>
        <VCardActions>
          <VBtn @click="isCardDetailsVisible = !isCardDetailsVisible">
            Details
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
            <DemoSimpleTableBasics :item="item"/>
          </div>
        </VExpandTransition>
      </VCard>
    </VCol>
  </VRow>
  </template>