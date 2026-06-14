interface LogoProps {
  size?: number;
}

export function Logo({ size = 44 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="22" cy="22" r="20" stroke="var(--teal)" strokeWidth="1.5" fill="color-mix(in oklch,var(--teal) 8%,transparent)" />
      <path d="M22 28C16 24 14 18 22 14 22 14 20 22 22 28Z" fill="var(--teal)" opacity=".4" />
      <path d="M22 28C28 24 30 18 22 14 22 14 24 22 22 28Z" fill="var(--teal)" opacity=".4" />
      <ellipse cx="22" cy="20.5" rx="3" ry="5.5" fill="var(--teal)" opacity=".75" />
      <ellipse cx="22" cy="22" rx="12" ry="5" stroke="var(--lav)" strokeWidth="1" fill="none" transform="rotate(60 22 22)" opacity=".6" />
      <ellipse cx="22" cy="22" rx="12" ry="5" stroke="var(--lav)" strokeWidth="1" fill="none" transform="rotate(120 22 22)" opacity=".6" />
      <circle cx="22" cy="22" r="2.2" fill="var(--lav)" opacity=".95" />
    </svg>
  );
}
