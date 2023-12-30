import type { CollectionEntry } from "astro:content";

import { createSignal, For } from "solid-js";
import { Motion } from "@motionone/solid";

import { HorizontalList } from "./horizontal-list";

const ArrowUpRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-3 h-3"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
};

export const BioLayout = ({
  bioList,
}: {
  bioList: CollectionEntry<"bio">[];
}) => {
  const [selected, setSelected] = createSignal(-1);
  const [onHoverIndex, setOnHoverIndex] = createSignal(-1);

  const delay = 0.15;

  return (
    <HorizontalList
      onOverlayClose={() => setSelected(-1)}
      showOverlay={selected() >= 0}
    >
      <For each={bioList.reverse()}>
        {(bio, idx) => (
          <div
            class="h-[27.5rem] w-[25rem] bg-white rounded-md group shadow-md border-white border-8 p-2 first:ml-10 relative inline-block"
            style={{
              transform: `translateX(${-4 * idx()}rem) rotate(${
                idx() === 0 ? 0 : Math.floor(Math.random() * 3)
              }deg)`,
            }}
            onMouseEnter={() => setOnHoverIndex(idx())}
            onMouseLeave={() => setOnHoverIndex(-1)}
          >
            <div class="absolute left-0 top-0 bg-paper w-full h-full z-[1]" />
            <div class="relative z-[2] overflow-hidden rounded-md">
              <Motion.img
                src={bio.data.cover}
                class="w-full h-[22rem] object-cover rounded-md brightness-[0.3] group-hover:brightness-90 transition-[filter] duration-500"
                alt=""
                animate={onHoverIndex() === idx() ? { y: -15 } : { y: 0 }}
                transition={onHoverIndex() === idx() ? { delay } : {}}
              />
            </div>
            <div class="z-20 py-4 px-1">
              <Motion.div
                class="text-zcool rounded-lg"
                animate={onHoverIndex() === idx() ? { y: -15 } : { y: 0 }}
                transition={onHoverIndex() === idx() ? { delay } : {}}
              >
                {bio.data.title}
              </Motion.div>
              <Motion.div
                class={`-mb-10 text-slate-700 flex gap-2 items-center ${
                  bio.data.changelogLink ? "underline" : ""
                }`}
                animate={
                  onHoverIndex() === idx()
                    ? { opacity: 1, y: -15 }
                    : { opacity: 0, y: 0 }
                }
                transition={onHoverIndex() === idx() ? { delay } : {}}
              >
                {bio.data.subtitle}
                {bio.data.changelogLink ? <ArrowUpRight /> : null}
              </Motion.div>
            </div>
          </div>
        )}
      </For>
      {/*  */}
    </HorizontalList>
  );
};
