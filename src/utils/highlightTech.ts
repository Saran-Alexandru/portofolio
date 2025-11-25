
// COLOR FOR DIFFERENT TECHNOLOGIES USED IN PROJECTS

export const TECH_COLORS: Record<string, string> = {
  Drupal: "#0678be",
  React: "#61dafb",
  JavaScript: "#f7df1e",
  PHP: "#777bb4",
  CSS: "#1572b6",
  HTML: "#e34f26",
  Bootstrap: "#7952b3",
  SCSS: "#cf649a",
  Git: "#f05033",
  "hooks": "#fff",
  "custom blocks":"#fff",
  Twig: "#39ab37ff",
  views: "#fff",
  "content types": "#fff",
  Paragraphs: "#fff",
  "Swiper": "#007aff",
};

export function highlightTech(text: string): string {
  let result = text;

  Object.entries(TECH_COLORS).forEach(([key, color]) => {
    const regex = new RegExp(`\\b${key}\\b`, "g");
    result = result.replace(
      regex,
      `<span style="border-bottom: 2px solid ${color}; font-weight: 600;">${key}</span>`
    );
  });

  return result;
}
