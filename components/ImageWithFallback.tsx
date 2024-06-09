"use client";

import Image, { StaticImageData } from "next/image";
import fallbackImage from "@/img/fallback.webp";
import { useEffect, useState } from "react";

const ImageWithFallback = ({
  fallback = fallbackImage,
  alt,
  src,
  ...props
}: {
  fallback?: string | StaticImageData;
  alt: string;
  src: string;
  [x: string]: any;
}) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError as any}
      src={error ? fallbackImage : src}
      {...props}
    />
  );
};

export default ImageWithFallback;
