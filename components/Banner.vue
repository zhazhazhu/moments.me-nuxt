<script lang="ts" setup>
const colorMode = useColorMode();
</script>

<template>
  <div class="relative overflow-hidden h-screen">
    <div class="relative overflow-hidden h-[90%]">
      <video
        loop
        muted
        autoPlay
        playsInline
        poster="/videos/ocean.png"
        class="w-full h-full absolute top-0 left-0 object-cover"
      >
        <source src="/videos/ocean.mp4" type="video/mp4" />
        <source src="/videos/ocean.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div
        class="bg-[#acd1e47d] dark:bg-[#141326c2] absolute top-0 left-0 w-full h-full"
      />
      <div
        class="font-sans antialiased absolute text-[#f8fafc] left-[50%] top-[45%] -translate-x-[50%] -translate-y-[50%] text-center"
      >
        <div class="mb-4 text-4xl font-bold">Zhazhazhu</div>
        <div class="text-sm">
          <div class="mb-3">
            花瓣飘落下游生根, 命运敲定了要这么发生 -- 落花流水
          </div>
          <div>现居 杭州 / 语言 (Ts | Rust)</div>
        </div>
      </div>

      <div class="absolute bottom-0 w-full">
        <img
          src="/images/overlay-dark.png"
          class="w-full transition-all duration-1000"
          v-show="colorMode.value === 'dark'"
        />
        <img
          src="/images/overlay.png"
          class="w-full transition-all duration-1000"
          v-show="colorMode.value !== 'dark'"
        />
      </div>
    </div>

    <div class="h-[10%] text-center">
      <UButton
        icon="i-ph-mouse-simple-fill"
        size="xl"
        color="gray"
        variant="ghost"
        aria-label="Zhazhazhu Mouse"
      />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
