<script lang="ts" setup>
import Gitalk from "gitalk";

const route = useRoute();
const config = useRuntimeConfig();
const container = ref<HTMLElement>();

onMounted(() => {
  const gitalk = new Gitalk({
    clientID: config.public.clientID,
    clientSecret: config.public.clientSecret,
    repo: "moments.me-nuxt", // The repository of store comments,
    owner: "zhazhazhu",
    admin: ["zhazhazhu"],
    id: route.params.slug as string,
    distractionFreeMode: false, // Facebook-like distraction free mode
    title: route.params.slug[0] as string,
    body: `地址: ${location.href}`,
  });
  container.value && gitalk.render(container.value);
});
</script>

<template>
  <div ref="container" class="pb-[40px] gt-container"></div>
</template>

<style scoped>
html.dark .gt-container >>> .gt-meta {
  border-bottom: 1px solid #1e293c;
}
html.dark .gt-container >>> .gt-header-textarea {
  background-color: #1e293c;
}
html.dark .gt-container >>> .gt-comment-content {
  background-color: #1e293c;
  border-radius: 4px;
}
html.dark .gt-container >>> .gt-comment-content:hover {
  box-shadow: 0 0.625em 3.75em 0 #1e293c;
}
html.dark .gt-container >>> .gt-comment-body {
  color: white !important;
}
html.dark .gt-container >>> .gt-header-preview {
  background-color: #1e293c;
  color: white;
}
</style>
