import { createTheme } from "@mantine/core";
import type { MantineColorsTuple } from "@mantine/core";

/* Same hex values as the Tailwind tokens in index.css,
   so <Button color="gold"> and `bg-gold` always match. */

const gold: MantineColorsTuple = [
  "#fff9e6", "#fdf0c8", "#fae39a", "#f7d46a", "#f5c647",
  "#f2b632", "#d99f1e", "#b88114", "#8f6310", "#66450a",
];

const pine: MantineColorsTuple = [
  "#e8f1f1", "#cfe3e3", "#a4c9c9", "#6fa8a9", "#17575a",
  "#0f3d3e", "#0c3334", "#0a2829", "#071d1e", "#041213",
];

export const theme = createTheme({
  colors: { gold, pine },
  primaryColor: "pine",
  primaryShade: 5,
  fontFamily: '"Hanken Grotesk", system-ui, sans-serif',
  headings: { fontFamily: 'Fraunces, Georgia, serif' },
  defaultRadius: "md",
});