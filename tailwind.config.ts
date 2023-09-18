import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hippiegreen: "#509051",
        wildsand: "#F4F4F4",
        gin: "#E7F2E9",
        dovegray: "#6F6F6F",
        dovegrayDark: "#707070",
        alto: "#D7D7D7",
        emperor: "#545454",
        silverchalice: "#A4A4A4",
        emerald: "#2ACB48",
        gallery: "#EDEDED",
        killarney: "#3F7541",
        mineshaft: "#2C2C2C",
        mineshaftLight: "#3E3E3E",
        mineshaftDark: "#2B2B2B",
        bonjour: "#E3E0E0",
        cuttysark: "#578182",
        thunderbird: "#D51414",
        sunsetorange: "#FF5252",
        chateaugreen: "#32AD49",
        grayish: "#848484",
        seagreen: "#2C9F41",
        dustygray: "#989898",
        mercury: "#E3E3E3",
        lightMercury: "#EAEAEA",
        grayish2: "#939393",
        darkMineShaft: "#262626",
        midMineShaft: "#303030",
        codgray: "#141414",
        alabaster: "#F8F8F8",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        quicksandLogo: ["normal normal bold 30px/38px Quicksand"],
        quicksand: ["Quicksand"],
      },
      fontSize: {
        xxs: "8pt",
      },
    },
  },
  plugins: [],
};
export default config;
