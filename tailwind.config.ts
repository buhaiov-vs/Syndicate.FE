import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['CenturyGothic']
      },
      extend: {
        lineClamp: {
          '2': '2'
        },
        scale: {
          '101': '1.01',
          '102': '1.02',
          '103': '1.03',
        }
      }
    },
    colors: {
      'cream': '#EEE8D8',
      'creamLight': '#F5F1E5',
      'creamAccent': '#E3D8BA',
      'white': '#FFFFFF',
      'black': '#010101',
      'errorText': '#F92626',
      'error': '#FF6060'
    }
  }
};
export default config;
