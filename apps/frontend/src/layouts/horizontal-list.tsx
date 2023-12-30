import { Show } from "solid-js";

import { Motion, Presence } from "@motionone/solid";

type Props = {
  showOverlay?: boolean;
  onOverlayClose: () => void;
  children: any;
};

export const HorizontalList = (props: Props) => {
  return (
    <>
      <div class="relative h-[32rem] overflow-hidden">
        <div
          class={[
            "absolute top-0 whitespace-nowrap box-content w-full overflow-x-auto py-4",
            props.showOverlay ? "overflow-x-hidden" : "overflow-x-auto",
          ].join(" ")}
        >
          {props.children}
        </div>
      </div>
      <Presence>
        <Show when={props.showOverlay}>
          <Motion.div
            class="w-screen h-screen bg-black absolute left-0 top-0"
            style={{ "z-index": 5 }}
            onClick={props.onOverlayClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { delay: props.showOverlay ? 0.5 : 0, duration: 0.5 },
            }}
          />
        </Show>
      </Presence>
    </>
  );
};
