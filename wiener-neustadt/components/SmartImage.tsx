"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/**
 * next/image wrapper that:
 *  - reserves space (aspect ratio) to keep CLS ~0
 *  - shows a shimmer skeleton until the image decodes
 *  - lazy-loads by default (override with `priority` for the hero)
 * Drop replacement food photos into /public/images using the same paths.
 */
export function SmartImage({
  className = "",
  wrapperClassName = "",
  rounded = "rounded-2xl",
  alt,
  ...props
}: ImageProps & { wrapperClassName?: string; rounded?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={`relative block overflow-hidden bg-surface-2 ${rounded} ${wrapperClassName} ${
        loaded ? "" : "shimmer"
      }`}
    >
      <Image
        alt={alt}
        {...props}
        onLoad={() => setLoaded(true)}
        className={`${className} transition-opacity duration-700 ease-out ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}
