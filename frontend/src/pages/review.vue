<script setup lang="ts">

import { Video, locale } from 'vuetify-pro-tiptap'

const content = ref("")
const outlined = ref(true)
const dense = ref(false)
const editHtml = ref(false)
const hideToolbar = ref(false)
const disableToolbar = ref(false)
const errorMessages = ref(null)
const maxWidth = ref<number>(900)

const customLang = ref({ ...locale.message['en'] })
const rating = ref(0)
const dialog = ref(false)
const isCardDetailsVisible = ref(false)

const comments = [{
    text: "牛逼",
    user: "lsj"
},
{
    text: "牛逼",
    user: "lsj"
},
{
    text: "牛逼",
    user: "lsj"
},
{
    text: "牛逼",
    user: "lsj"
},
{
    text: "牛逼",
    user: "lsj"
},
]

</script>

<template>
    <VRow>
        <!-- 👉 course overview here -->
        <VCol cols="12">
            <VCard>
                <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
                    <div>
                        <VCardItem>
                            <VCardTitle>表象文化与日本电影 - <a>王玉辉</a></VCardTitle>
                        </VCardItem>
                        <v-container class="text-start">
                            <v-row>
                                <v-col cols="3">难度：</v-col>
                                <v-col cols="9">
                                    <VRating :model-value="5" readonly density="compact" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">收获：</v-col>
                                <v-col cols="9">
                                    <VRating :model-value="5" readonly class="me-3" density="compact" />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="3">给分：</v-col>
                                <v-col cols="9">
                                    <VRating :model-value="5" readonly class="me-3" density="compact" />
                                </v-col>
                            </v-row>
                        </v-container>
                        <VCardText class="d-flex justify-center">
                            <div class="me-auto pe-4">
                                <p class="d-flex align-center mb-6">
                                    <VIcon color="primary" icon="mdi-lock-open-outline" />
                                    <span class="ms-3">限选</span>
                                </p>

                                <p class="d-flex align-center mb-0">
                                    <VIcon color="primary" icon="mdi-school-outline" />
                                    <span class="ms-3">2.0 学分</span>
                                </p>
                            </div>

                            <VDivider v-if="$vuetify.display.smAndUp" vertical inset />

                            <div class="ms-auto ps-4">
                                <p class="d-flex align-center mb-6">
                                    <VIcon color="primary" icon="mdi-town-hall" />
                                    <span class="ms-3">艺术研究院</span>
                                </p>

                                <p class="d-flex align-center mb-0">
                                    <VIcon color="primary" icon="mdi-clock-fast" />
                                    <span class="ms-3">32 学时</span>
                                </p>
                            </div>
                        </VCardText>

                    </div>
                    <div class="ma-auto pa-5">
                        <div class="d-flex justify-center mt-auto text-h5 ">
                            总分
                        </div>
                        <div class="d-flex align-center flex-column my-auto">
                            <div class="text-h2 mt-5">
                                3.5
                                <span class="text-h6 ml-n3">/5</span>
                            </div>

                            <v-rating :model-value="3.5" readonly color="#F57F17" half-increments></v-rating>
                            <div class="px-3">3,360 ratings</div>
                        </div>
                    </div>
                </div>
                <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">
                    <v-list-item v-for="(rating, i) in 5" :key="i">
                        <VProgressLinear :model-value="rating * 15" class="mx-n5" color="#F57F17" height="20" rounded>
                        </VProgressLinear>

                        <template v-slot:prepend>
                            <span>{{ rating }}</span>
                            <v-icon icon="mdi-star" class="mx-3" color="#F57F17"></v-icon>
                        </template>

                        <template v-slot:append>
                            <div class="rating-values">
                                <span class="d-flex justify-end"> {{ rating * 224 }} </span>
                            </div>
                        </template>
                    </v-list-item>
                </v-list>
            </VCard>
        </VCol>
        <!-- 👉 pop up here -->
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent width="1024">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" v-bind="props" class="fixed-button">
                        <VIcon icon="mdi-pencil" />
                        写评论
                    </v-btn>
                </template>
                <v-card>
                    <v-card-text>
                        <v-container class="text-start">
                            <v-row>
                                <v-col cols="12" md="1">总评：</v-col>
                                <v-col cols="12" md="5">
                                    <v-rating v-model="rating" hover half-increments class="me-3"
                                        density="compact"></v-rating>
                                </v-col>
                                <v-col cols="12" md="1">难度：</v-col>
                                <v-col cols="12" md="5">
                                    <v-rating v-model="rating" hover half-increments class="me-3"
                                        density="compact"></v-rating>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="1">收获：</v-col>
                                <v-col cols="12" md="5">
                                    <v-rating v-model="rating" hover half-increments class="me-3"
                                        density="compact"></v-rating>
                                </v-col>
                                <v-col cols="12" md="1">给分：</v-col>
                                <v-col cols="12" md="5">
                                    <v-rating v-model="rating" hover half-increments class="me-3"
                                        density="compact"></v-rating>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <VTextField label="标题"></VTextField>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <vuetify-tiptap v-model="content" label="撰写评论" :hide-toolbar="hideToolbar"
                        :disable-toolbar="disableToolbar" :outlined="outlined" :dense="dense"
                        :error-messages="errorMessages" rounded :max-height="465" :max-width="maxWidth" />
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Close
                        </v-btn>
                        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
        <VDivider class="my-2" />
        <!-- 👉 review card here -->
        <VCol cols="12">
            <VCard>
                <VCardItem>
                    <VCardTitle>好评！- <a>Username</a></VCardTitle>
                </VCardItem>
                <VCardText class="d-flex align-center flex-wrap">
                    <VRating :model-value="5" readonly density="compact" class="me-3" />
                    <span class="text-subtitle-2"> 总分 5.0 | 难度 1.0 | 收获 5.0 | 给分 4.5</span>
                </VCardText>
                <VCardText>
                    <div v-html="content"> </div>
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

                    <VBtn icon size="small" @click="isCardDetailsVisible = !isCardDetailsVisible">
                        <VIcon :icon="isCardDetailsVisible ? 'mdi-chevron-up' : 'mdi-chevron-down'" />
                    </VBtn>
                </VCardActions>

                <VExpandTransition>
                    <div v-show="isCardDetailsVisible">
                        <VDivider />

                        <v-list>
                            <v-list-item v-for="(comment, i) in comments" :key="i">
                                <v-list-item-content>
                                    <v-list-item-title><a>{{ comment.user }}</a>: {{ comment.text }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-row align="center" justify="center">
                            <v-col cols="12" sm="6">
                                <v-text-field label="Add a comment" filled clearable class="my-5" />
                            </v-col>
                            <v-col cols="auto">
                                <v-btn color="primary" class="my-5">
                                    发布
                                </v-btn>
                            </v-col>
                        </v-row>

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