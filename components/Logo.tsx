import Image from "next/image";

/**
 * Real "Chen's Cooking" brand logo (handwritten wordmark + green bowl mark).
 * Transparent PNG — sits on the dark navbar/footer. Scales via the `h-*`
 * utility passed in `className`.
 */
export function Logo({ className = "h-11 w-auto sm:h-12" }: { className?: string }) {
  return (
    <Image
      src="/images/chens-logo.png"
      alt="Chen's Cooking"
      width={695}
      height={313}
      priority
      className={className}
    />
  );
}
