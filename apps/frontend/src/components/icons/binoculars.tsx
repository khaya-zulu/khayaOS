import { mergeProps } from "solid-js";

export const Binoculars = (props: {
  color?: string;
  size?: number;
  class?: string;
}) => {
  const merged = mergeProps({ size: 24, color: "#000" }, props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={merged.class}
      width={merged.size}
      height={merged.size}
      fill={merged.color}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="104"
        y1="92"
        x2="152"
        y2="92"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <path
        d="M229.6,154.3,185.9,55A24.1,24.1,0,0,0,152,55V168"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <path
        d="M104,168V55a24.1,24.1,0,0,0-33.9,0L26.4,154.3"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <circle
        cx="64"
        cy="168"
        r="40"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></circle>
      <circle
        cx="192"
        cy="168"
        r="40"
        fill="none"
        stroke={merged.color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></circle>
    </svg>
  );
};
