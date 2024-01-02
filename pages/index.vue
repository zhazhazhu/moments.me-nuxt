<script lang="ts" setup>
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";

useHead({
  title: "Zhazhazhu moments",
  meta: [
    { name: "description", content: "Zhazhazhu 的个人网站" },
    { name: "author", content: "Zhazhazhu" },
  ],
  link: [{ rel: "icon", href: "/favicon.svg" }],
});

const query: QueryBuilderParams = {
  path: "/articles",
  sort: [{ date: -1, $numeric: true }],
};
</script>

<template>
  <div>
    <Banner />

    <UContainer class="px-5">
      <ContentList :query="query" v-slot="{ list }">
        <div
          v-for="article in list"
          :key="article._id"
          class="my-10 tracking-wide"
        >
          <div class="text-2xl font-bold py-2" name="title">
            {{ article.title }}
          </div>
          <div
            class="font-light text-sm flex items-center pb-4 text-slate-500"
            name="date"
          >
            <UIcon name="i-ph-calendar" />
            <span class="ml-[4px]">
              {{ $dayjs(article.date).format("YYYY/MM/DD HH:mm") }}
            </span>
          </div>
          <div class="pb-4" name="image" v-if="article.image">
            <template v-if="typeof article.image === 'object'">
              <img
                v-if="article.image?.src"
                :src="article.image?.src"
                :alt="article.image?.alt"
                :width="article.image?.width"
                :height="article.image?.height"
              />
            </template>
            <template v-else>
              <img :src="article.image" />
            </template>
          </div>

          <div
            class="text-sm text-slate-700 dark:text-slate-200 pb-4"
            name="description"
          >
            {{ article.description }}
          </div>

          <div>
            <ULink
              :to="article._path"
              active-class="text-primary"
              inactive-class="text-sm text-primary-500 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-200"
            >
              阅读更多...
            </ULink>
          </div>
        </div>
      </ContentList>
    </UContainer>
  </div>
</template>
