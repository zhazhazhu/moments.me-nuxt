<script lang="ts" setup>
interface Collect {
  name: string;
  icon?: string;
  link?: string;
  description?: string;
}

const { data } = await useAsyncData(() =>
  queryContent<{ content: Record<string, Collect[]> }>("/collects").findOne()
);
</script>

<template>
  <UContainer :ui="{ base: 'mb-[10px]', padding: 'px-8' }">
    <div class="sm:px-4 md:px-20 lg:px-40 py-4">
      <h1 class="text-3xl my-[20px] font-bold tracking-wide antialiased">
        收藏
      </h1>

      <template v-for="(collect, key) in data?.content" :key="key">
        <div class="tracking-wide antialiased">
          <div class="text-[1rem] font-medium my-[20px]">{{ key }}</div>
          <div
            class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
          >
            <CollectCard
              v-for="item in collect"
              :value="item"
              :key="item.name"
            />
          </div>
        </div>
      </template>
    </div>
  </UContainer>
</template>
