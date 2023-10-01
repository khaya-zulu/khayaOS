import { type ImageProps, Image } from "@unpic/solid";
import { createSignal } from "solid-js";
import { cn } from "~/lib/cn";

export const BlurrableImage = ({
  srcBlur,
  ...props
}: ImageProps & { srcBlur: string }) => {
  const [visible, setVisible] = createSignal(false);

  return (
    <div
      class="relative inline-block"
      style={{ height: `${props.height}px`, width: `${props.width}px` }}
    >
      <img
        src={srcBlur}
        class={cn("absolute top-0 left-0 h-full", props.class)}
        height={props.height}
        width={props.width}
      />
      <Image
        {...props}
        onLoad={() => setVisible(true)}
        class={cn(
          props.class,
          // wierd issues with z-index, so absolute positioning both elements
          "transition-opacity duration-200 absolute top-0 left-0",
          {
            "opacity-0": !visible(),
          }
        )}
      />
    </div>
  );
};
