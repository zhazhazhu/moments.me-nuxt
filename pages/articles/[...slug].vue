<script lang="ts" setup></script>

<template>
  <UContainer>
    <ContentDoc v-slot="{ doc }" :excerpt="true">
      <div class="px-4 py-4">
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
          class="prose dark:prose-invert max-w-none"
        />
      </div>
    </ContentDoc>
  </UContainer>
</template>
