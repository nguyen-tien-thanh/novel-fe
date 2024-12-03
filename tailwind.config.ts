import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      container: { center: true },
    },
    screens: { lg: '1024px' },
    container: {
      padding: { DEFAULT: '4px', lg: '0px' },
    },
  },
  daisyui: {
    themes: true,
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: false,
    themeRoot: ':root',
  },
  plugins: [require('daisyui'), require('@tailwindcss/typography')],
}
export default config
