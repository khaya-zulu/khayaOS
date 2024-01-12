import { animateEl } from "./animate";

type El = HTMLElement | Element | null;

export const animateIn = ({
  elCard,
  elCardImage,
  elCardContentContainer,
  elCardHeader,
  elCardSubtitle,
  elCardContent,
  elBgPaper,
}: {
  elCard: El;
  elCardImage: El;
  elCardContentContainer: El;
  elCardHeader: El;
  elCardSubtitle: El;
  elCardContent: El;
  elBgPaper: El;
}) => {
  elCardContent?.classList.add("hidden");

  return Promise.all([
    animateEl(elBgPaper, { opacity: [0.4, 1] }, { duration: 200 }),
    animateEl(elCardContent, { opacity: [1, 0] }, { duration: 100 }),
    animateEl(
      elCardHeader,
      {
        opacity: [1, 0.5, 0],
        transform: [
          "translateX(0) translateY(0)",
          "translateX(-4px) translateY(-4px)",
        ],
      },
      { duration: 100 },
      () => {
        elCardSubtitle?.classList.remove("hidden");
        elCardContentContainer?.classList.remove("flex-col-reverse");

        animateEl(
          elCardImage,
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
          elCardHeader,
          {
            opacity: [0, 0.5, 1],
            transform: [
              "translateX(-4px) translateY(-4px)",
              "translateX(0) translateY(0)",
            ],
          },
          { duration: 100, delay: 50 },
          () => {
            elCard?.classList.add("group");
          }
        );
      }
    ),
  ]);
};

export const animateOut = ({
  elCard,
  elCardImage,
  elCardContentContainer,
  elCardHeader,
  elCardSubtitle,
  elCardContent,
  elBgPaper,
}: {
  elCard: El;
  elCardImage: El;
  elCardContentContainer: El;
  elCardHeader: El;
  elCardSubtitle: El;
  elCardContent: El;
  elBgPaper: El;
}) => {
  elCard?.classList.add("mr-20");

  return Promise.all([
    animateEl(elBgPaper, { opacity: [1, 0.4] }, { duration: 200 }),
    animateEl(
      elCardImage,
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
          elCardHeader,
          {
            opacity: [0, 0.5, 1],
            transform: [
              "translateX(-4px) translateY(-4px)",
              "translateX(0) translateY(0)",
            ],
          },
          { duration: 100, delay: 50 },
          () => {
            elCardContent?.classList.remove("hidden");

            animateEl(
              elCardContent,
              { opacity: [0, 1] },
              { duration: 200, delay: 100 }
            );
          }
        );

        elCardContentContainer?.classList.add("flex-col-reverse");

        elCardSubtitle?.classList.add("hidden");
        elCard?.classList.remove("group");
      }
    ),
    animateEl(elCardHeader, { opacity: [1, 0] }, { duration: 200, delay: 50 }),
  ]);
};
