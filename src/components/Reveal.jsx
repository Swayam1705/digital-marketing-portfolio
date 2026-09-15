import { useEffect, useRef, useState } from "react";

/**
 * <Reveal> — wraps content in a fade/slide-in that fires once when it enters
 * the viewport (IntersectionObserver). Respects prefers-reduced-motion
 * automatically via the CSS in animations.css.
 *
 * Props:
 *  as       – element/tag to render (default "div")
 *  variant  – "up" (default) | "left" | "right" | "scale"
 *  delay    – transition delay in ms (for staggered groups)
 *  threshold – IntersectionObserver threshold
 */
export default function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  threshold = 0.15,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver is unavailable, just show the content.
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const variantClass =
    variant === "left"
      ? "reveal--left"
      : variant === "right"
      ? "reveal--right"
      : variant === "scale"
      ? "reveal--scale"
      : "";

  return (
    <Tag
      ref={ref}
      className={`reveal ${variantClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
