import {
  Linkedin,
  Instagram,
  Twitter,
  Github,
  Youtube,
  Dribbble,
  Globe,
} from "lucide-react";

// Maps the `platform` string in portfolioData.js → socials to a light icon.
// Unknown platforms gracefully fall back to a generic globe.
const PLATFORM_ICONS = {
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  x: Twitter,
  github: Github,
  youtube: Youtube,
  dribbble: Dribbble,
};

export default function SocialIcon({ platform = "", size = 16 }) {
  const key = platform.trim().toLowerCase();
  const Icon = PLATFORM_ICONS[key] ?? Globe;
  return <Icon size={size} aria-hidden="true" />;
}
