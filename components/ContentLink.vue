<script lang="ts" setup>
import type { TocLink } from "@nuxt/content/dist/runtime/types";
import type { CSSProperties } from "vue";

const props = withDefaults(
  defineProps<{
    link: TocLink;
    depth?: number;
  }>(),
  {
    depth: 1,
  }
);
const styles = computed<CSSProperties>(() => ({
  padding: `0 ${props.depth * 1.25}rem`,
}));
</script>

<template>
  <NuxtLink
    class="block text-sm h-[40px] leading-[40px] truncate text-gray-500 dark:text-gray-200 cursor-pointer hover:text-primary-600 dark:hover:text-primary-200"
    :style="styles"
    :to="'#' + link.id"
  >
    {{ link.text }}
  </NuxtLink>

  <ContentLink
    v-for="child in link.children"
    :key="child.id"
    :link="child"
    :depth="2"
  />
</template>

<style scoped></style>
