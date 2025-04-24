import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  theme: {
    extend: {
      colors: {
        pureBlack: "#000000",
        lightBlack: "#1A1A1A",
        pureWhite: "#FFFFFF",
        primary: "#F0FCFE",
        lightBlue: "#0099B3",
        lightgry: "#DFDFDF",
        Mgray: "#575757",
        offWhite: "#EDEDED",
        cardBorderColor: "#E6E6E6",
        darkGray: "#4D4D4D",
        oldPriceColor: "#999999",
        red: "#EA4B48",
        footerTextColor: "#8F8F8F",
        modalBorderColor: "#E4E7E9",
        descColor: "#808080",
        tableHeaderColor: "#F2F2F2",
        lightGreen: "#2C742F",
        secondary: "#0099B3",
      },
      
      boxShadow: {
        "nav-shadow": "0px 1px 5px 0px rgba(5, 5, 5, 0.1)",
        "banner-shadow": "0 8px 40px rgba(0, 38, 3, 0.08)",
        dropshadow: '0 0 12px 0 rgba(0, 153, 179, 0.32)'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        'custom-height': 'calc(100vh - 20.7vh)',
      },
    },
  },
  plugins: [],
};
export default config;
