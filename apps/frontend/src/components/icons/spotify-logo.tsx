import { mergeProps } from "solid-js";

export const SpotifyLogo = (props: {
  color?: string;
  size?: string;
  class?: string;
}) => {
  const merged = mergeProps({ size: 24, color: "#000" }, props);

  return (
    <svg
      class={merged.class}
      xmlns="http://www.w3.org/2000/svg"
      width={merged.size}
      height={merged.size}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <circle
        cx="128"
        cy="128"
        r="96"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></circle>
      <path
        d="M179.1,116.3a112.1,112.1,0,0,0-102.3.1"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></path>
      <path
        d="M158.7,155.3A68.4,68.4,0,0,0,128,148a67.6,67.6,0,0,0-30.8,7.4"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="24"
      ></path>
    </svg>
  );
};
