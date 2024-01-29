<script lang="ts" setup>
import type { DropdownItem } from "@nuxt/ui/dist/runtime/types";
import { useChangeCase } from "@vueuse/integrations/useChangeCase";

const route = useRoute();
const isHome = computed(() => route.path === "/");
const colorMode = useColorMode();
const items: DropdownItem[][] = [
  [
    {
      label: useChangeCase(ColorMode.Light, "capitalCase").value,
      icon: colorModeIcon[ColorMode.Light],
      click: () => toggleColorMode(ColorMode.Light),
    },
    {
      label: useChangeCase(ColorMode.Dark, "capitalCase").value,
      icon: colorModeIcon[ColorMode.Dark],
      click: () => toggleColorMode(ColorMode.Dark),
    },
    {
      label: useChangeCase(ColorMode.System, "capitalCase").value,
      icon: colorModeIcon[ColorMode.System],
      click: () => toggleColorMode(ColorMode.System),
    },
  ],
];

function toggleColorMode(value: string) {
  colorMode.preference = value;
}
</script>

<template>
  <div class="w-screen left top-0 z-10" :class="[isHome && 'fixed']">
    <UContainer>
      <div class="flex items-center h-[65px]">
        <div class="flex items-end cursor-pointer" @click="navigateTo('/')">
          <UIcon name="i-fluent-emoji-high-contrast-zzz" class="text-4xl" />
          <span
            class="font-mono text-2xl leading-6 ml-1 font-semibold select-none"
          >
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
          </ColorScheme>
        </div>
      </div>
    </UContainer>
  </div>
</template>
