/**
 * Smooth-scrolls to a section id, respecting the user's reduced-motion
 * preference and accounting for the fixed navbar height.
 */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const navOffset = 80;
  const top =
    target.getBoundingClientRect().top + window.scrollY - navOffset;

  window.scrollTo({
    top,
    behavior: prefersReduced ? "auto" : "smooth",
  });
}
