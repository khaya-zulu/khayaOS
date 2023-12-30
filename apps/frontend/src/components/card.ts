import type { CSSProperty } from "astro/types";

type El = HTMLElement | Element | null;

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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

export const animateIn = ({
  card,
  cardImage,
  cardContentContainer,
  cardHeader,
  cardSubtitle,
  cardContent,
}: {
  card: El;
  cardImage: El;
  cardContentContainer: El;
  cardHeader: El;
  cardSubtitle: El;
  cardContent: El;
}) => {
  cardContent?.classList.add("hidden");

  return Promise.all([
    animateEl(cardContent, { opacity: [1, 0] }, { duration: 100 }),
    animateEl(
      cardHeader,
      {
        opacity: [1, 0.5, 0],
        transform: [
          "translateX(0) translateY(0)",
          "translateX(-4px) translateY(-4px)",
        ],
      },
      { duration: 100 },
      () => {
        cardSubtitle?.classList.remove("hidden");
        cardContentContainer?.classList.remove("flex-col-reverse");

        animateEl(
          cardImage,
          [
            { transform: "scale(0)" },
            { transform: "scale(0.5)" },
            {
              transform: "scale(1)",
              height: "22rem",
              opacity: "1",
              filter: "brightness(1)",
            },
          ],
          { duration: 400, easing: "ease-out", delay: 50, fill: "both" }
        );

        animateEl(
          cardHeader,
          {
            opacity: [0, 0.5, 1],
            transform: [
              "translateX(-4px) translateY(-4px)",
              "translateX(0) translateY(0)",
            ],
          },
          { duration: 100, delay: 50 },
          () => {
            card?.classList.add("group");
          }
        );
      }
    ),
  ]);
};

export const animateOut = ({
  card,
  cardImage,
  cardContentContainer,
  cardHeader,
  cardSubtitle,
  cardContent,
}: {
  card: El;
  cardImage: El;
  cardContentContainer: El;
  cardHeader: El;
  cardSubtitle: El;
  cardContent: El;
}) => {
  card?.classList.add("mr-20");

  return Promise.all([
    animateEl(
      cardImage,
      [
        { borderRadius: "24px", transform: "scale(1)" },
        { transform: "scale(0.5)", filter: "brightness(0)", opacity: 0.5 },
        { transform: "scale(0)", filter: "brightness(0)", opacity: 0.2 },
        {
          transform: "scale(0)",
          filter: "brightness(0)",
          opacity: 0,
          height: 0,
        },
      ],
      { duration: 400, easing: "ease-out" },
      () => {
        animateEl(
          cardHeader,
          {
            opacity: [0, 0.5, 1],
            transform: [
              "translateX(-4px) translateY(-4px)",
              "translateX(0) translateY(0)",
            ],
          },
          { duration: 100, delay: 50 },
          () => {
            cardContent?.classList.remove("hidden");

            animateEl(
              cardContent,
              { opacity: [0, 1] },
              { duration: 200, delay: 100 }
            );
          }
        );

        cardContentContainer?.classList.add("flex-col-reverse");

        cardSubtitle?.classList.add("hidden");
        card?.classList.remove("group");
      }
    ),
    animateEl(cardHeader, { opacity: [1, 0] }, { duration: 200, delay: 50 }),
  ]);
};
