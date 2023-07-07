import { createResource, Show } from "solid-js";

import { Motion } from "@motionone/solid";

import { SpotifyLogo } from "./icons/spotify-logo";
import { ArrowRight } from "./icons/arrow-right";

const fetchSpotify = async () => {
  const response = await fetch(
    `${import.meta.env.PUBLIC_BACKEND_API}/api/graphql`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          {
            config {
              spotify
            }
          }
        `,
      }),
    }
  );

  const { data } = await response.json();

  return JSON.parse(data.config.spotify);
};

const getTimeInterval = (ms: number) => {
  const placeholder = "00";

  const minutes = ((ms / 60_000) % 60).toFixed();
  const seconds = ((ms / 1_000) % 60).toFixed();

  return `${minutes}:${placeholder.slice(seconds.length) + seconds}`;
};

// const SlidingText = (props: { text: string }) => {
//   return (
//     <div class="text-primary relative">
//       <div class="group-hover:animate-slide">{props.text}</div>
//       <div class="translate-x-[-200%] group-hover:animate-slide-1 absolute left-0 top-0 w-full">
//         {props.text}
//       </div>
//     </div>
//   );
// };

export const SpotifyPlayer = () => {
  const [data] = createResource({}, fetchSpotify);

  return (
    <Show when={!data.loading && data.latest && !data.error}>
      <a
        href={data()?.item.external_urls.spotify}
        rel="noopener noreferrer"
        target="_blank"
      >
        <div class="border steal-border rounded-md bg-white shadow p-3 text-sm group">
          <Motion.div
            animate={{ opacity: [0, 1] }}
            transition={{ opacity: { delay: 0.5, duration: 1 } }}
            class="flex items-center justify-between"
          >
            <div class="flex flex-1 items-center gap-2">
              <img
                src={data()?.item.album.images[0].url}
                alt="Song thumbnail"
                class="h-10 w-10 rounded-full w-full object-cover border border-gray-300 group-hover:animate-recording"
              />
              <div class="w-28 overflow-hidden">
                <div class="font-semibold truncate">{data()?.item.name}</div>
                <div class="text-primary truncate">
                  {data()
                    ?.item.artists.map((a) => a.name)
                    .join(", ")}
                </div>
              </div>
            </div>
            <ArrowRight size={16} />
          </Motion.div>

          <Motion.hr
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
            class="my-4"
          />

          <div class="flex items-center gap-2 justify-center">
            <SpotifyLogo class="text-green-200" />
            <div class="text-primary truncate">
              Currently playing ({getTimeInterval(data()?.progress_ms)})...
            </div>
          </div>
        </div>
      </a>
    </Show>
  );
};
