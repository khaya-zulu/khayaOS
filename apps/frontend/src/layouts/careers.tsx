import { createSignal, For } from "solid-js";

import _orderBy from "lodash/orderBy";

import { Card } from "~/components/card";
import { HorizontalList } from "./horizontal-list";

const { data } = await fetch(
  `${import.meta.env.PUBLIC_BACKEND_API}/api/graphql`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      {
        careers(where: { published: { equals: true } }) {
            id
            title
            subTitle
            description {
              document
            }
            url
            createdAt
            dateFrom
            dateTo
            cover {
              publicUrl
            }
            coverBlurUrl
            index
        }
      }
    `,
    }),
  }
).then((response) => response.json());

type Career = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  createdAt: string;
  dateFrom: string;
  dateTo: string;
  cover: { publicUrl: string };
  coverBlurUrl: string;
  index: number;
  url: string;
};

export const Careers = () => {
  const [selected, setSelected] = createSignal(-1);

  const careers = _orderBy(data.careers, ["index"]);

  return (
    <HorizontalList
      onOverlayClose={() => setSelected(-1)}
      showOverlay={selected() >= 0}
    >
      <div class="h-[27.5rem] w-[25rem] overflow-y-auto bg-white rounded-md bg-paper shadow-md border-white border-8 ml-10 p-4 inline-block">
        <div class="text-zcool text-shadow">About me</div>
        <div class="mt-4 whitespace-normal opacity-60">
          Im a software engineer with 10+ years of experience in the industry. I
          have worked in several companies, from startups to big corporations,
          in different countries and continents. I have <br /> <br />
          <img
            src="https://res.cloudinary.com/khaya-zulu/image/upload/v1641497705/Personal%20Site%20v2/cky3dcm3u0001sjbp8yfr6emf.jpg"
            class="h-40 w-full object-cover mb-4"
            alt=""
          />
          experience in different areas of software development, from frontend,
          backend, mobile, to infrastructure and DevOps. I have worked with
          different programming languages, frameworks and
        </div>
      </div>
      <div class="h-[27.5rem] w-[25rem] overflow-y-auto rotate-2 bg-white rounded-md bg-paper shadow-md border-white border-8 p-4 inline-block -translate-x-16">
        <div class="text-zcool text-shadow">2023</div>
      </div>
      <div class="h-[27.5rem] w-[25rem] overflow-y-auto -rotate-2 bg-white rounded-md bg-paper shadow-md border-white border-8 p-4 inline-block -translate-x-32">
        <div class="text-zcool text-shadow">2022</div>
      </div>
      <div class="h-[27.5rem] w-[25rem] overflow-y-auto bg-white rounded-md bg-paper shadow-md border-white border-8 p-4 inline-block -translate-x-48">
        <div class="text-zcool text-shadow">2022</div>
      </div>
      <div class="h-[27.5rem] w-[25rem] overflow-y-auto bg-white rounded-md bg-paper shadow-md border-white border-8 p-4 inline-block -translate-x-64">
        <div class="text-zcool text-shadow">2021</div>
      </div>
      {/* <For each={careers}>
        {(career: Career, idx) => (
          <Card
            {...career}
            type="career"
            src={career.cover.publicUrl}
            srcBlur={career.coverBlurUrl}
            index={idx()}
            onClose={() => setSelected(-1)}
            onOpen={() => setSelected(idx())}
            selected={selected() === idx()}
          />
        )}
      </For> */}
    </HorizontalList>
  );
};
