<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <div class="flex items-center">
    <div class="flex items-end cursor-pointer">
      <img src="/favicon.svg" alt="Zhazhazhu moments" width="45px" />
      <span class="font-mono text-2xl leading-6 ml-1 font-semibold select-none">
      </span>
    </div>

    <div class="flex-1 text-right">
      <UButton
        icon="i-mdi-star"
        size="lg"
        color="gray"
        variant="ghost"
        aria-label="Zhazhazhu Collect"
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
      <UButton
        :icon="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        size="lg"
        color="gray"
        variant="ghost"
        aria-label="Theme"
        @click="isDark = !isDark"
      />
    </div>
  </div>
</template>
