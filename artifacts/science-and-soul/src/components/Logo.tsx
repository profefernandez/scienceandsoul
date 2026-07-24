import { imgSrc, imgSrcSet } from "../lib/img";

interface LogoProps {
  size?: number;
}

export function Logo({ size = 44 }: LogoProps) {
  return (
    <img
      src={imgSrc("logo", 96)}
      srcSet={imgSrcSet("logo", [96, 192])}
      sizes={`${size}px`}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      loading="eager"
      decoding="async"
      style={{ borderRadius: "50%", display: "block", objectFit: "cover" }}
    />
  );
}
