<script lang="ts" setup>
const route = useRoute();

const { y } = useWindowScroll({ behavior: "smooth" });

function scroll(hash?: string) {
  if (!hash) return;
  const el = document.getElementById(hash.slice(1));
  if (!el) return;
  y.value = el.offsetTop;
}

onMounted(() => {
  scroll(route.hash);
});
</script>

<template>
  <UContainer :ui="{ base: 'pt-[20px]' }">
    <ContentDoc v-slot="{ doc }">
      <div class="sm:px-4 md:px-20 lg:px-40 py-4">
        <article>
          <div class="text-2xl font-bold py-2" name="title">
            {{ doc.title }}
          </div>
          <div
            class="font-light text-sm flex items-center pb-4 text-slate-500"
            name="date"
          >
            <UIcon name="i-ph-calendar" />
            <span class="ml-[4px]">
              {{ $dayjs(doc.date).format("YYYY/MM/DD HH:mm") }}
            </span>
          </div>

          <ContentRenderer
            :value="doc"
            class="prose dark:prose-invert max-w-none prose-a:no-underline"
          >
            <template #empty>
              <p>No content found.</p>
            </template>
          </ContentRenderer>
        </article>
      </div>
    </ContentDoc>
    <Comments />
  </UContainer>
</template>
