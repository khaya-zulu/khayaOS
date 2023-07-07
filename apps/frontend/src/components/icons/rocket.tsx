type Props = {
  color?: string;
  size?: string | number;
  className?: string;
};

export const Rocket = ({
  color = "currentColor",
  size = 24,
  className,
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="rocket"
      class={className}
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 256 256"
    >
      <rect width="256" height="256" fill="none"></rect>
      <line
        x1="144"
        y1="224"
        x2="112"
        y2="224"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></line>
      <path
        d="M123,19.8C104,35,40.5,95.8,96,192h64c54.4-96.2-8.2-156.9-27-172.2A7.8,7.8,0,0,0,123,19.8Z"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <path
        d="M73.9,111.4,42.5,149a7.6,7.6,0,0,0-1.6,6.8l12.3,55.7A8,8,0,0,0,66,216l30-24"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <path
        d="M181.5,110.6l32,38.4a7.6,7.6,0,0,1,1.6,6.8l-12.3,55.7A8,8,0,0,1,190,216l-30-24"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="16"
      ></path>
      <circle cx="128" cy="96" r="12"></circle>
    </svg>
  );
};
