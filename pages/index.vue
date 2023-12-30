<script lang="ts" setup></script>

<template>
  <div>
    <Banner />

    <UContainer class="px-5">
      <ContentList
        path="/articles"
        :query="{
          sort: [
            {
              date: -1,
              $numeric: true,
            },
          ],
        }"
        v-slot="{ list }"
      >
        <div v-for="article in list" :key="article._id" class="my-10">
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
            <template
              v-if="typeof article.image === 'object' && article.image?.src"
            >
              <img
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
              inactive-class="text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-200"
            >
              阅读更多...
            </ULink>
          </div>
        </div>
      </ContentList>
    </UContainer>
  </div>
</template>
