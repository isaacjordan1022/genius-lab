import Image from "next/image";
import "./genius-logo.css";
export default function GeniusLogo({
  icon = false,
  className = "",
  decorative = false,
}: {
  icon?: boolean;
  className?: string;
  decorative?: boolean;
}) {
  return (
    <Image
      className={`genius-logo${icon ? " genius-logo--icon" : ""} ${className}`}
      src={icon ? "/brand/genius-lab-icon.svg" : "/brand/options/genius-lab-sky-cobalt-v1.png"}
      alt={decorative ? "" : "Genius Lab"}
      width={icon ? 240 : 2172}
      height={icon ? 240 : 724}
      sizes={icon ? "240px" : "(max-width: 600px) 85vw, 660px"}
      loading="eager"
    />
  );
}
