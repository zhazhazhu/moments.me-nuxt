<script lang="ts" setup>
const route = useRoute();
const isHome = computed(() => route.path === "/");
</script>

<template>
  <div class="w-screen left top-0 z-10" :class="[isHome && 'fixed']">
    <UContainer>
      <div class="flex items-center h-[65px]">
        <div class="flex items-end cursor-pointer" @click="navigateTo('/')">
          <UIcon name="i-tabler-zzz" class="text-4xl" />
          <span
            class="font-mono text-2xl leading-6 ml-1 font-semibold select-none"
          >
          </span>
        </div>

        <div class="flex-1 text-right">
          <UButton
            icon="i-mdi-star"
            size="lg"
            color="gray"
            variant="ghost"
            aria-label="Zhazhazhu Collect"
            @click="navigateTo('/collects')"
          />
          <UButton
            icon="i-mdi-file-image-box"
            size="lg"
            color="gray"
            variant="ghost"
            aria-label="Zhazhazhu Photos"
          />
          <UButton
            icon="i-mdi-twitter"
            size="lg"
            color="gray"
            variant="ghost"
            aria-label="Zhazhazhu Twitter"
            @click="
              navigateTo('https://twitter.com/Zhazhazhu_', {
                external: true,
                open: {
                  target: '_blank',
                },
              })
            "
          />
          <UButton
            icon="i-mdi-github"
            size="lg"
            color="gray"
            variant="ghost"
            aria-label="Zhazhazhu Github"
            @click="
              navigateTo('https://github.com/zhazhazhu', {
                external: true,
                open: {
                  target: '_blank',
                },
              })
            "
          />
          <!-- <UButton
            icon="i-ph-magnifying-glass"
            size="lg"
            color="gray"
            variant="ghost"
            aria-label="Zhazhazhu Collect"
          /> -->
          <ClientOnly>
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              size="lg"
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="() => toggleDark()"
            />
          </ClientOnly>
        </div>
      </div>
    </UContainer>
  </div>
</template>
