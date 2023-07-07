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
      <For each={careers}>
        {(career: Career, idx) => (
          <Card
            {...career}
            type="career"
            src={career.cover.publicUrl}
            index={idx()}
            onClose={() => setSelected(-1)}
            onOpen={() => setSelected(idx())}
            selected={selected() === idx()}
          />
        )}
      </For>
    </HorizontalList>
  );
};
