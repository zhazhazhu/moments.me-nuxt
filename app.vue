<script lang="ts" setup>
useSeoMeta({
  title: "Zhazhazhu moments",
  description: "Zhazhazhu 的个人网站",
  author: "Zhazhazhu",
});
useHead({
  link: [{ rel: "icon", href: "/favicon.svg" }],
});
</script>

<template>
  <Header />
  <NuxtPage />
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
