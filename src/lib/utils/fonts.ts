import localFont from 'next/font/local';

// Editorial serif for display headings (the `font-serif` utility).
//
// Self-hosted on purpose: `next/font/google` downloads the files from Google
// while building, and its loader failed at random on Vercel
// ("An error occured in `next/font`"), which broke deploys of unrelated
// changes. The file is the variable latin subset Google Fonts serves, weights
// 400–700; its license sits next to it.
//
// Inter and Roboto Mono used to be loaded here too, but nothing consumed their
// CSS variables (Tailwind names the system fonts directly), so they were only
// downloaded and preloaded. To use them for real, add them here with
// `localFont` and point `fontFamily` in tailwind.config.js at their variables.
const cormorant = localFont({
  src: '../fonts/cormorant-garamond/CormorantGaramond-latin.woff2',
  variable: '--font-serif',
  display: 'swap',
  weight: '400 700',
  style: 'normal',
  adjustFontFallback: 'Times New Roman',
});

const fontVariables = cormorant.variable;

export default fontVariables;
