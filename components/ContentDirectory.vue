<script lang="ts" setup>
import type { ParsedContent } from "@nuxt/content/dist/runtime/types";

const props = defineProps<{
  value: ParsedContent;
}>();
const links = computed(() => props.value.body?.toc?.links);
const container = ref<HTMLElement>();

onMounted(() => {});
</script>

<template>
  <div
    class="w-[280px] h-[380px] bg-[#f8fafc] dark:bg-[#1e293b] rounded-lg border-[1px] border-gray-100 dark:border-gray-800 sticky top-4"
  >
    <div
      class="text-base text-gray-800 dark:text-white font-bold mx-5 h-[50px] leading-[50px] border-b-[1px] border-gray-500 mb-[10px]"
    >
      <span>目录</span>
    </div>

    <div class="overflow-auto h-[300px]">
      <ContentLink v-for="item in links" :key="item.id" :link="item" />
    </div>
  </div>
</template>

<style scoped></style>
