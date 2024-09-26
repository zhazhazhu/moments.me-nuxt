<script lang="ts" setup>
const route = useRoute();
const isHome = computed(() => route.path === "/");
const colorMode = useColorMode();
const items: { icon: string; value: string }[] = [
  {
    icon: colorModeIcon[ColorMode.Light],
    value: ColorMode.Light,
  },
  {
    icon: colorModeIcon[ColorMode.Dark],
    value: ColorMode.Dark,
  },
  {
    icon: colorModeIcon[ColorMode.System],
    value: ColorMode.System,
  },
];

function toggleColorMode() {
  const index = items.findIndex((item) => item.value === colorMode.preference);

  colorMode.preference =
    items[index === items.length - 1 ? 0 : index + 1].value;
}
</script>

<template>
  <div class="w-screen left top-0 z-50" :class="[isHome && 'fixed']">
    <UContainer>
      <div class="flex items-center h-[65px]">
        <div class="flex items-end cursor-pointer" @click="navigateTo('/')">
          <UIcon name="i-openmoji-evergreen-tree" class="text-3xl" />
          <span
            class="font-mono text-xl leading-6 ml-1 font-semibold select-none text-gray-700 dark:text-white"
          >
            77
          </span>
        </div>

        <div class="flex-1 text-right">
          <UButton
            icon="i-material-symbols-camera"
            size="lg"
            color="gray"
            variant="ghost"
            aria-label="Zhazhazhu Collect"
            @click="navigateTo('/collects')"
          />
          <UButton
            icon="i-material-symbols-android-camera"
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
          <ColorScheme>
            <UButton
              :icon="colorModeIcon[colorMode.preference]"
              size="lg"
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="() => toggleColorMode()"
            />
          </ColorScheme>
          <!-- <ColorScheme>
            <UDropdown
              :items="items"
              :popper="{ placement: 'bottom-end' }"
              :ui="{ width: 'w-26' }"
            >
              <UButton
                :icon="colorModeIcon[colorMode.value]"
                size="lg"
                color="gray"
                variant="ghost"
                aria-label="Theme"
              />
            </UDropdown>
          </ColorScheme> -->
        </div>
      </div>
    </UContainer>
  </div>
</template>
