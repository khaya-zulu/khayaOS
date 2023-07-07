import { mergeProps } from "solid-js";

export const ArrowRight = (props: {
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
        x1="64"
        y1="192"
        x2="192"
        y2="64"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <polyline
        points="88 64 192 64 192 168"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></polyline>
    </svg>
  );
};
