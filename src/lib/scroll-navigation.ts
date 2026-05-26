export const PROGRAMS_SECTION_ID = "programs";

export function scrollToSection(sectionId: string) {
  const url = new URL(window.location.href);
  url.hash = sectionId;
  window.history.pushState(null, "", url.toString());

  requestAnimationFrame(() => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
