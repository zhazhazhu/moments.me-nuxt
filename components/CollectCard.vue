<script lang="ts" setup>
import { Icon } from "@iconify/vue";

interface Collect {
  name: string;
  icon?: string;
  link?: string;
  description?: string;
}
defineProps<{
  value: Collect;
}>();
</script>

<template>
  <div
    class="relative inline-flex h-[70px] items-center border-[1px] px-[20px] rounded border-slate-400 dark:border-[#2c325c] cursor-pointer group"
    @click="
      navigateTo(value.link, { external: true, open: { target: '_blank' } })
    "
  >
    <!-- icon -->
    <div class="mr-[16px]" v-if="value.icon">
      <Icon
        :icon="value.icon"
        class="text-[24px]"
        v-if="!value.icon.startsWith('http')"
      />
      <img v-else :src="value.icon" :alt="value.name" width="24" height="24" />
    </div>
    <!-- content -->
    <div class="flex-1">
      <h4 class="text-base text-slate-700 dark:text-white">
        {{ value.name }}
      </h4>
      <div class="text-xs text-slate-500">{{ value.description }}</div>
    </div>
    <!-- overlay -->
    <div
      class="transition-all duration-200 absolute w-full h-full top-0 left-0 opacity-0 group-active:opacity-100"
    >
      <div class="bg-white truncate group-hover:opacity-90 h-full rounded" />

      <div
        class="absolute w-full text-gray-500 opacity-100 text-sm top-[25px] text-center truncate"
      >
        {{ value.link || "_blank" }}
      </div>
    </div>
  </div>
</template>
