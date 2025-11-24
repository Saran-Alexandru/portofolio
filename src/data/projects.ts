
// type for each project item
export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;         // path to imported image
  tech: string[];        // list of technologies used
  link?: string;         // optional live link
  github?: string;       // optional repo link
};

import dionHomesImg from "../assets/me-bg.png";
import lineaImg from "../assets/me-bg.png";
import nishaniImg from "../assets/me-bg.png";


export const projects: Project[] = [
  {
    id: "dion-homes",
    title: "Dion Homes Real Estate Platform",
    description:
      "Real estate website built with Drupal, custom content types, views, and a modern frontend for showcasing properties.",
    image: dionHomesImg,
    tech: ["Drupal", "PHP", "Twig", "JavaScript", "CSS"],
    link: "https://dionhomes.co.uk",
  },
  {
    id: "linea-events",
    title: "Linea Rooftop Events Pages",
    description:
      "Landing pages for club events, optimized for SEO and fast performance, with animations and responsive layouts.",
    image: lineaImg,
    tech: ["HTML", "CSS", "JavaScript", "GSAP"],
  },
  {
    id: "nishani-hotel",
    title: "Nishani Boutique Hotel Website",
    description:
      "Boutique hotel presentation site focused on clean UI, responsive layout, and SEO-friendly structure.",
    image: nishaniImg,
    tech: ["React", "TypeScript", "Tailwind CSS"],
  },
];
