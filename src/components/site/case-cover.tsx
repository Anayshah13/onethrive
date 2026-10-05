import Image from "next/image";
import type { CaseStudy } from "@/data/case-studies";

/* A case study's cover photo, or — when no event photos exist yet — the client's logo on an
   ink panel so the card still reads as that client. Fills its (relative) parent. */
export function CaseCover({
  study,
  sizes,
  priority = false,
  decorative = false,
  className = "",
}: {
  study: CaseStudy;
  sizes: string;
  priority?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  if (study.cover) {
    return (
      <Image
        src={study.cover.src}
        alt={decorative ? "" : study.cover.alt}
        fill
        sizes={sizes}
        preload={priority}
        className={`object-cover ${className}`}
      />
    );
  }
  return (
    <span className="absolute inset-0 grid place-items-center overflow-hidden bg-ink">
      <span aria-hidden className="absolute -top-1/4 -right-1/4 size-3/4 rounded-full bg-mint/20 blur-3xl" />
      <span className="relative grid h-[34%] max-h-28 min-h-12 w-[52%] max-w-64 place-items-center rounded-2xl bg-white p-[6%]">
        <Image src={study.logo.src} alt={decorative ? "" : study.logo.alt} width={320} height={160} className="max-h-full w-auto object-contain" />
      </span>
    </span>
  );
}
