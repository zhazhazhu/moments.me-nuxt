export enum ColorMode {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export const colorModeIcon: Record<string, string> = {
  [ColorMode.Light]: "i-heroicons-sun-20-solid",
  [ColorMode.Dark]: "i-heroicons-moon-20-solid",
  [ColorMode.System]: "i-material-symbols-light-display-settings",
};
