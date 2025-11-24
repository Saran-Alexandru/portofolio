// src/hooks/useSectionSnapScroll.ts
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

type Options = {
  sectionIds: string[]; // e.g. ["hero", "projects", "about", "contact"]
  offset?: number;
};

export function useSectionSnapScroll({ sectionIds, offset = 0 }: Options) {
  useLayoutEffect(() => {
    const sections: HTMLElement[] = sectionIds
      .map((id) => document.getElementById(id) as HTMLElement | null)
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const getCurrentIndex = () => {
      const scrollY = window.scrollY;
      let idx = 0;

      sections.forEach((sec, i) => {
        if (scrollY >= sec.offsetTop + offset - 10) {
          idx = i;
        }
      });

      return idx;
    };

    const scrollToSection = (index: number) => {
      const clamped = gsap.utils.clamp(0, sections.length - 1, index);
      const elem = sections[clamped];
      if (!elem) return;

      const y = elem.offsetTop + offset;

      // kill previous tweens on window so they don't stack
      gsap.killTweensOf(window);

      gsap.to(window, {
        scrollTo: { y, autoKill: true },
        duration: 1,
        ease: "power2.inOut",
      });
    };

    const onWheel = (event: WheelEvent) => {
      const delta = event.deltaY;
      if (delta === 0) return;

      const currentIndex = getCurrentIndex();
      const currentId = sectionIds[currentIndex];

      const atFirst = currentIndex === 0;
      const atLast = currentIndex === sections.length - 1;

      // 1) at the very top (before the first section) or very bottom (after the last section)
      //    → do nothing special, let the browser handle the scroll normally
      if ((atFirst && delta < 0) || (atLast && delta > 0)) {
        return;
      }

      // 2) special behavior for #projects:
      if (currentId === "projects") {
        const proj = sections[currentIndex];
        const projTop = proj.offsetTop;
        const projBottom = projTop + proj.offsetHeight;

        const viewportTop = window.scrollY;
        const viewportBottom = viewportTop + window.innerHeight;

        const nearTop = viewportTop <= projTop + 10;
        const nearBottom = viewportBottom >= projBottom - 10;

        // if we are in the middle of the section -> let the browser handle scrolling
        if ((delta < 0 && !nearTop) || (delta > 0 && !nearBottom)) {
          return;
        }
        // if we are near the top/bottom → fall through to the snap logic below
      }

      // 3) compute the next / previous section index
      const nextIndex = delta > 0 ? currentIndex + 1 : currentIndex - 1;
      const clampedNext = gsap.utils.clamp(0, sections.length - 1, nextIndex);

      // if there is nowhere to go → exit without blocking the scroll
      if (clampedNext === currentIndex) return;

      // ✅ only NOW we block the normal scroll, because we know we are doing a snap
      event.preventDefault();

      scrollToSection(clampedNext);
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [sectionIds, offset]);
}
