import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlack: 'var(--custom-black)',
        customBlackAlt: 'var(--custom-black-alt)',
        customGrayLight: 'var(--custom-gray-light)',
        customGray: 'var(--custom-gray)',
        customGrayDark: 'var(--custom-gray-dark)',
        customGrayDarker: 'var(--custom-gray-darker)',
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
        spotlight: 'spotlight 2s ease .75s 1 forwards', shine: 'shine 5s linear infinite'
      },
      keyframes: {
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%'
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%'
          }
        },
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        spotlight: {
          '0%': {
            // @ts-ignore
            opacity: 0,
            transform: 'translate(-72%, -62%) scale(0.5)'
          },
          '100%': {
            // @ts-ignore
            opacity: 1,
            transform: 'translate(-50%,-40%) scale(1)'
          }
        }
      },
    }
  },

  plugins: [addVariablesForColors, require("tailwindcss-animate")],
};
export default config;


function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}