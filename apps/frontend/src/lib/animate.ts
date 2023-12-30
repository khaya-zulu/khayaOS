import { sleep } from "./utils";

type El = HTMLElement | Element | null;

export const animateEl = async (
  el: El,
  keyframes: Keyframe[] | PropertyIndexedKeyframes | null,
  opts: number | KeyframeAnimationOptions | undefined = {},
  onFinish?: () => void
) => {
  try {
    if (el) {
      if (typeof opts === "object") {
        opts = { fill: "forwards", duration: 100, ...opts };
      }

      const animation = el.animate(keyframes, opts);
      await animation.finished;

      animation.commitStyles();

      if (navigator.userAgent.includes("Firefox")) {
        // for some reason calling animation.cancel, right after commitStyles
        // causes the animation to flash between states on firefox. So we wait 10ms before cancelling
        // the animations. todo: for now this a hack, but find a better solution.
        await sleep(10);
      }

      animation.cancel();
    }
  } catch (e) {
    console.error(e);
  } finally {
    if (onFinish) onFinish();
  }
};
