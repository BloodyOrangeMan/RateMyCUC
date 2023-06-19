<script setup lang="ts">
import background_fall from '@images/about-us/background_fall.jpg'
import background_leaf from '@images/about-us/background_leaf.png'
import background_p4 from '@images/about-us/background_persona4.jpg'
import background_universe from '@images/about-us/background_universe.jpg'
import headshoot_BloodyOrangeMan from '@images/about-us/headshoot_BloodyOrangeMan.jpg'
import headshoot_Winnie_Lian from '@images/about-us/headshoot_Winnie-Lian.png'
import headshoot_odulnme from '@images/about-us/headshoot_odulnme.jpg'
import headshoot_willinggale from '@images/about-us/headshoot_willinggale.jpg'
</script>
<template>
  <VRow>
    <VCol cols="12" sm="6" md="3">
      <VCard>
        <VImg :src="background_fall" class="card-image" />

        <VCardText class="position-relative">
          <!-- User Avatar -->
          <VAvatar size="75" class="avatar-center" :image="headshoot_BloodyOrangeMan" />

          <!-- Title, Subtitle & Action Button -->
          <div class="d-flex justify-space-between flex-wrap pt-8">
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0"> BloodyOrangeMan </VCardTitle>
              <VCardSubtitle class="text-caption pa-0"> butterfucker3000 </VCardSubtitle>
            </div>
          </div>

          <!--  Mutual Friends -->
          <IconBtn class="me-2" href="https://github.com/BloodyOrangeMan" target="_blank" rel="noopener noreferrer">
            <VIcon icon="mdi-github" />
          </IconBtn>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" sm="6" md="3">
      <VCard>
        <VImg :src="background_p4" class="card-image" />

        <VCardText class="position-relative">
          <!-- User Avatar -->
          <VAvatar size="75" class="avatar-center" :image="headshoot_odulnme" />

          <!-- Title, Subtitle & Action Button -->
          <div class="d-flex justify-space-between flex-wrap pt-8">
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0"> odulnme </VCardTitle>
              <VCardSubtitle class="text-caption pa-0"> CUC Programmer </VCardSubtitle>
            </div>
          </div>

          <!--  Mutual Friends -->
          <IconBtn class="me-2" href="https://github.com/odulme" target="_blank" rel="noopener noreferrer">
            <VIcon icon="mdi-github" />
          </IconBtn>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" sm="6" md="3">
      <VCard>
        <VImg :src="background_leaf" class="card-image" />

        <VCardText class="position-relative">
          <!-- User Avatar -->
          <VAvatar size="75" class="avatar-center" :image="headshoot_Winnie_Lian" />

          <!-- Title, Subtitle & Action Button -->
          <div class="d-flex justify-space-between flex-wrap pt-8">
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0"> Winnie-Lian </VCardTitle>
              <VCardSubtitle class="text-caption pa-0"> Text </VCardSubtitle>
            </div>
          </div>

          <!--  Mutual Friends -->
          <IconBtn class="me-2" href="https://github.com/Winnie-Lian" target="_blank" rel="noopener noreferrer">
            <VIcon icon="mdi-github" />
          </IconBtn>
        </VCardText>
      </VCard>
    </VCol>
    <VCol cols="12" sm="6" md="3">
      <VCard>
        <VImg :src="background_universe" class="card-image" />

        <VCardText class="position-relative">
          <!-- User Avatar -->
          <VAvatar size="75" class="avatar-center" :image="headshoot_willinggale" />

          <!-- Title, Subtitle & Action Button -->
          <div class="d-flex justify-space-between flex-wrap pt-8">
            <div class="me-2 mb-2">
              <VCardTitle class="pa-0"> willinggale </VCardTitle>
              <VCardSubtitle class="text-caption pa-0"> V </VCardSubtitle>
            </div>
          </div>

          <!--  Mutual Friends -->
          <IconBtn class="me-2" href="https://github.com/willinggale" target="_blank" rel="noopener noreferrer">
            <VIcon icon="mdi-github" />
          </IconBtn>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style>
.card-image {
  height: 200px;
  object-fit: cover;
}
</style>