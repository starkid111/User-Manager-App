import React from "react";

const Spinner: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className = "",
}) => {
  const s = `${size}px`;
  return (
    <svg
      className={`animate-spin ${className}`}
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
      <path
        d="M22 12a10 10 0 00-10-10"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Spinner;
