
// type for each project item
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;         // path to imported image
  link?: string;         // optional live link
  github?: string;       // optional repo link
};

import dionHomesImg from "../assets/dion.jpg";
import lineaImg from "../assets/me-bg.png";
import nishaniImg from "../assets/me-bg.png";


export const projects: Project[] = [
  {
    id: "dion-homes",
    title: "Dion Homes",
    description:
      "I worked on a real-estate website built with Drupal(CMS), using JavaScript, SCSS, Bootstrap, and Twig. I created content types, views, Paragraphs, custom blocks, and workflow automations with hooks. I implemented responsive components, Swiper sliders, and used Git throughout the project.",
    image: dionHomesImg,
    link: "https://dionhomes.co.uk",
  },
  {
    id: "linea-events",
    title: "Linea Rooftop Events Pages",
    description:
      "Landing pages for club events, optimized for SEO and fast performance, with animations and responsive layouts.",
    image: lineaImg,
    link: "https://dionhomes.co.uk",
  },
  {
    id: "nishani-hotel",
    title: "Nishani Boutique Hotel Website",
    description:
      "Boutique hotel presentation site focused on clean UI, responsive layout, and SEO-friendly structure.",
    image: nishaniImg,
    link: "https://dionhomes.co.uk",
  },
];
