<script lang="ts" setup>
import { Icon } from "@iconify/vue";

interface Collect {
  name: string;
  icon: string;
  link: string;
  description?: string;
}
const collects = await queryContent("/collects").findOne();

const [DefineTemplate, ReuseTemplate] = createReusableTemplate<{
  name: any;
  value: Collect[];
}>();

const [DefineCollect, ReuseCollect] = createReusableTemplate<{
  item: Collect;
}>();
</script>

<template>
  <UContainer :ui="{ base: 'mb-[10px]', padding: 'px-8' }">
    <DefineCollect v-slot="{ item }">
      <div
        class="relative inline-flex h-[70px] items-center border-[1px] px-[20px] rounded border-slate-400 dark:border-[#2c325c] cursor-pointer group"
        @click="
          navigateTo(item.link, { external: true, open: { target: '_blank' } })
        "
      >
        <!-- icon -->
        <div class="mr-[16px]">
          <Icon
            :icon="item.icon"
            class="text-[26px]"
            v-if="!item.icon.startsWith('http')"
          />
          <img
            v-else
            :src="item.icon"
            :alt="item.name"
            width="26"
            height="26"
          />
        </div>
        <!-- content -->
        <div>
          <h4 class="text-base text-slate-700 dark:text-white">
            {{ item.name }}
          </h4>
          <div class="text-xs text-slate-500">{{ item.description }}</div>
        </div>
        <!-- overlay -->
        <div
          class="transition-all duration-200 absolute w-full h-full top-0 left-0 opacity-0 group-active:opacity-100"
        >
          <div
            class="bg-white truncate group-hover:opacity-90 h-full rounded"
          />

          <div
            class="absolute w-full text-gray-500 opacity-100 text-sm top-[25px] text-center truncate"
          >
            {{ item.link || "_blank" }}
          </div>
        </div>
      </div>
    </DefineCollect>

    <DefineTemplate v-slot="{ value, name }">
      <div class="tracking-wide antialiased">
        <div class="text-[1rem] font-medium my-[20px]">{{ name }}</div>
        <div
          class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4"
        >
          <ReuseCollect v-for="item in value" :item="item" :key="item.name" />
        </div>
      </div>
    </DefineTemplate>

    <h1 class="text-3xl my-[20px] font-bold tracking-wide antialiased">收藏</h1>

    <ReuseTemplate
      v-for="(item, key) in collects.content"
      :key="key"
      :name="key"
      :value="item"
    />
  </UContainer>
</template>
