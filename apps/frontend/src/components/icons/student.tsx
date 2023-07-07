import { mergeProps } from "solid-js";

export const Student = (props: {
  color?: string;
  size?: number;
  class?: string;
}) => {
  const merged = mergeProps({ size: 24, color: "#000" }, props);

  return (
    <svg
      class={merged.class}
      xmlns="http://www.w3.org/2000/svg"
      width={merged.size}
      height={merged.size}
      fill={merged.color}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="32"
        y1="64"
        x2="32"
        y2="144"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <path
        d="M54.2,216a88.1,88.1,0,0,1,147.6,0"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <polygon
        points="224 64 128 96 32 64 128 32 224 64"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></polygon>
      <path
        d="M169.3,82.2a56,56,0,1,1-82.6,0"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
    </svg>
  );
};
