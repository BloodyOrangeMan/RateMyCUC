<script lang="ts" setup>
import ErrorPopup from '@/components/ErrorPopup.vue'
</script>

<template>
  <div class="layout-wrapper layout-blank">
    <RouterView />
    <ErrorPopup />
  </div>
</template>

<style>
.layout-wrapper.layout-blank {
  flex-direction: column;
}
</style>
