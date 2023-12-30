export const isDark = computed(() => useColorMode().value === "dark");

export const toggleDark = (value?: "dark" | "light") => {
  const colorMode = useColorMode();
  value
    ? (colorMode.preference = value)
    : (colorMode.preference = isDark.value ? "light" : "dark");
};
