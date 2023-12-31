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
  <div ref="container" class="pb-40px"></div>
</template>
