import { useEffect } from "react";

export function useActiveSection(
  ids: string[],
  onChange: (activeId: string) => void
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onChange(entry.target.id);
          }
        });
      },
      {
        threshold: 0.2, // când 40% din secțiune e vizibilă -> active
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids, onChange]);
}
