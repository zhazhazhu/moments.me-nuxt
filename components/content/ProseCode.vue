<script lang="ts" setup>
const props = defineProps<{
  code?: string;
  language?: string;
  filename?: string;
  highlights?: number[];
  meta?: string;
}>();

const [DefineHeader, ReuseHeader] = createReusableTemplate();
const { copy, copied } = useClipboard({
  source: props.code,
});

const icon: Record<string, string> = {
  ts: "i-vscode-icons-file-type-typescript",
  typescript: "i-vscode-icons-file-type-typescript",
  js: "i-vscode-icons-file-type-js",
  javascript: "i-vscode-icons-file-type-js",
  rs: "i-vscode-icons-file-type-rust",
  rust: "i-vscode-icons-file-type-rust",
  shell: "i-vscode-icons-file-type-shell",
  bash: "i-vscode-icons-file-type-shell",
  yaml: "i-vscode-icons-file-type-light-yaml",
};
</script>

<template>
  <DefineHeader>
    <div class="flex items-center">
      <div class="flex-1 flex items-center">
        <UIcon v-if="language" :name="icon[language]" class="h-5 mr-1" />
        <div class="leading-4 font-light text-sm">
          {{ filename || "example" }}
        </div>
      </div>

      <ClientOnly>
        <UIcon
          :name="copied ? 'i-icon-park-solid-doc-success' : 'i-ph-copy-fill'"
          class="cursor-pointer hover:text-gray-500"
          @click="() => copy()"
        />
      </ClientOnly>
    </div>
  </DefineHeader>

  <UCard
    :ui="{
      base: 'my-3',
      header: { padding: 'px-3 sm:px-3 py-3' },
      body: {
        base: 'overflow-y-auto',
        padding: 'px-3 sm:px-3 py-2 sm:py-3',
        background: 'bg-[#f8fafc] dark:bg-[#1e293b]',
      },
    }"
  >
    <template #header>
      <ReuseHeader></ReuseHeader>
    </template>

    <code class="text-sm not-prose"><slot /></code>
  </UCard>
</template>

<style lang="less" scoped></style>
