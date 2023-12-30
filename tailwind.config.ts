import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default <Partial<Config>>{
  theme: {
    fontFamily: {
      sans: ["Helvetica", ...defaultTheme.fontFamily.sans],
    },
  },
};
