import { mergeProps } from "solid-js";
import { Motion } from "@motionone/solid";

import { cn } from "~/lib/cn";
import { DocumentRenderer, DocumentRendererProps } from "~/layouts/document";

type Props = {
  id: string;
  src: string;
  title: string;
  description: { document: DocumentRendererProps["document"] };
  index: number;
};

type GeneralProps = Props & {
  type: "project" | "career";
  selected?: boolean;
  onOpen: () => void;
  onClose: () => void;
  subTitle: string;
  url?: string;
};

type NoteProps = Props & {
  type: "note";
  publishedAt: string;
  slug: string;
};

const XCircle = (initialProps: {
  color?: string;
  size?: string;
  className?: string;
  onClick: () => void;
}) => {
  const props = mergeProps({ color: "currentColor", size: 10 }, initialProps);

  return (
    <Motion.div
      animate={{ opacity: [0, 1] }}
      transition={{ duration: 1, delay: 0.5 }}
      class="flex gap-4"
    >
      <div class="p-1 rounded-full bg-gray-200">
        <div style={{ width: `${props.size}px`, height: `${props.size}px` }} />
      </div>
      <div
        class="inline-block rounded-full bg-red-400 p-1 cursor-pointer group"
        onClick={props.onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={props.size}
          height={props.size}
          fill={props.color}
          viewBox="0 0 256 256"
          class="group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        >
          <rect width="256" height="256" fill="none"></rect>
          <line
            x1="200"
            y1="56"
            x2="56"
            y2="200"
            fill="none"
            stroke={props.color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
          <line
            x1="200"
            y1="200"
            x2="56"
            y2="56"
            fill="none"
            stroke={props.color}
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          ></line>
        </svg>
      </div>
    </Motion.div>
  );
};

export const Card = (props: NoteProps | GeneralProps) => {
  const first = props.index === 0;

  const hoveredMarginLeft = `-${props.index * 50}px`;

  return (
    <>
      <Motion.button
        class="h-[32rem] w-[25rem] mb-10 inline-block card text-left"
        onClick={() => {
          if (props.type !== "note") {
            if (props.url) {
              // use link element instead
              window.open(props.url, "_blank", "noopener noreferrer");
            } else {
              props.onOpen();
            }
          } else {
            window.location.href = `/notes/${props.slug}`;
          }
        }}
        hover={{ marginRight: first ? "80px" : 0 }}
        animate={{
          marginRight:
            first && props.type !== "note" && props.selected ? "80px" : 0,
          transition: { delay: 0.25 },
        }}
        transition={{
          zIndex: { delay: props.type !== "note" && props.selected ? 0 : 0.4 },
        }}
      >
        <Motion.div
          class={[
            "h-full w-[25rem] group border border-gray-500 rounded-2xl relative overflow-hidden card bg-white",
            props.type !== "note" && !props.selected
              ? "shadow-sm"
              : "shadow-2xl",
          ].join(" ")}
          animate={{
            marginLeft: !first ? hoveredMarginLeft : 0,
            "z-index": props.type !== "note" && props.selected ? 50 : "auto",
            x: !first && props.type !== "note" && props.selected ? "-5rem" : 0,
            transition: { x: { delay: 0.5 } },
          }}
          hover={{ x: !first ? "-5rem" : 0 }}
          transition={{
            transform: {
              delay: props.type !== "note" && props.selected ? 0 : 0.5,
            },
            zIndex: {
              delay: props.type !== "note" && props.selected ? 0 : 0.4,
            },
          }}
        >
          <img
            src={props.src}
            alt={props.title}
            class={cn("object-cover h-full w-full brightness-[40%]")}
            alt={`${props.title} cover`}
          />
          <div
            class={cn(
              "absolute top-0 left-0 w-full h-full overflow-y-auto",
              props.type === "note" || !props.selected ? "p-4" : "bg-white"
            )}
          >
            {props.type === "note" || !props.selected ? (
              <div class="w-full h-full window-blur bg-gradient-to-tr to-gray-600/60 from-gray-500/40 border border-gray-500 rounded-md p-8 text-white relative">
                <b>{props.title}</b>
                <div class="text-cyan-50">
                  {props.type !== "note" && props.subTitle}
                </div>

                <div class="absolute bottom-0 pb-8 flex gap-4">
                  21 days ago{" "}
                  <span>
                    {{ note: "🏷️", career: "💼", project: "🛠️" }[props.type]}
                  </span>
                </div>
              </div>
            ) : (
              <div class="w-full h-full bg-white rounded-md px-8">
                <div class="flex justify-between sticky top-0 pb-4 pt-8 bg-white border-b">
                  <div class="text-gray-600">{props.title}</div>
                  <div>
                    <XCircle onClick={props.onClose} />
                  </div>
                </div>

                <div class="whitespace-pre-wrap pt-4 pb-8 space-y-4 leading-loose">
                  <DocumentRenderer document={props.description.document} />
                </div>

                <div class="fixed bottom-0 h-8 bg-white w-full" />
              </div>
            )}
          </div>
          {/* <div class="absolute bottom-0 left-0 w-full p-5">
            <div class="p-4 shadow-lg rounded-md w-full bg-white"></div>
          </div> */}
          {/* <div
            class={[
              "px-10 py-5 border-b border-gray-500 rounded-tr-md relative rounded-tl-md z-50 bg-gradient-to-r from-white to-gray-100 bg-grid flex justify-between items-center transition-all",
              props.type !== "note" && props.selected
                ? "shadow-sm"
                : "shadow-xl",
            ].join(" ")}
          >
            <div>
              <div class="text-lg font-bold flex justify-between w-full">
                {props.title}{" "}
                <span class="text-gray-400 group-hover:text-gray-600 duration-300 transition-colors absolute right-10">
                  {props.type === "note" && <>#{props.index + 1}</>}
                  {props.type !== "note" && !props.selected && ":-"}
                </span>
              </div>
              {props.type !== "note" && (
                <Motion.div
                  class="text-sm text-primary top-0 overflow-hidden"
                  animate={{ height: props.selected ? 0 : "auto" }}
                >
                  {props.subTitle}
                </Motion.div>
              )}
              {props.type === "note" && (
                <div class="mt-5 text-gray-600 text-sm duration-300 border border-gray-300 group-hover:border-gray-400 inline-block py-1 px-3 rounded-sm">
                  21 May 2012
                </div>
              )}
            </div>
            {props.type !== "note" && props.selected && (
              <XCircle onClick={props.onClose} />
            )}
          </div>
          <div class="h-full relative">
            {props.type !== "note" && (
              <div
                classList={{
                  "h-full bg-white relative": !props.selected,
                }}
              >
                {props.selected && (
                  <div class="bg-white top-0 left-0 w-full h-[27rem] space-y-5 px-10 py-5 overflow-auto leading-loose whitespace-pre-wrap">
                    <DocumentRenderer document={props.description.document} />
                  </div>
                )}
              </div>
            )}

            <Motion.div
              class="overflow-hidden absolute z-0 h-full top-0 w-full"
              animate={{
                opacity:
                  props.type !== "note" && props.selected && props.description
                    ? 0
                    : loaded()
                    ? 1
                    : 0,
                display:
                  props.type !== "note" && props.selected && props.description
                    ? "none"
                    : "block",
              }}
              transition={{
                display: {
                  duration: props.type !== "note" && props.selected ? 0.5 : 0,
                },
              }}
            >
              <img
                src={props.src}
                alt={props.title}
                class={cn("object-cover h-full w-full")}
                onLoad={() => setLoaded(true)}
              />
            </Motion.div>
          </div> */}
        </Motion.div>
      </Motion.button>
    </>
  );
};
