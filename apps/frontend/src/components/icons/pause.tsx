import { mergeProps } from "solid-js";

export const Pause = (props: {
  color?: string;
  size?: number;
  class?: string;
}) => {
  const merged = mergeProps({ size: 24, color: "#000" }, props);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={merged.size}
      height={merged.size}
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <rect
        x="156"
        y="40"
        width="52"
        height="176"
        rx="8"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></rect>
      <rect
        x="48"
        y="40"
        width="52"
        height="176"
        rx="8"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></rect>
    </svg>
  );
};
