<template>
  <div class="fixed w-screen left top-0 z-10">
    <UContainer>
      <div class="flex items-center h-[65px] px-4">
        <div class="flex items-end cursor-pointer">
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
            @click="() => toggleDark()"
          />
        </div>
      </div>
    </UContainer>
  </div>
</template>
