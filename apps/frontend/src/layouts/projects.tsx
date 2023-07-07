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
        projects(where: { published: { equals: true } }) {
          id
          title
          subTitle
          description {
            document
          }
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

type Project = {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  cover: {
    publicUrl: string;
  };
  index: number;
};

export const Projects = () => {
  const [selected, setSelected] = createSignal(-1);

  const projects = _orderBy(data.projects, ["index"]);

  return (
    <HorizontalList
      onOverlayClose={() => setSelected(-1)}
      showOverlay={selected() >= 0}
    >
      <For each={projects}>
        {(project: Project, idx) => (
          <Card
            {...project}
            type="project"
            src={project.cover?.publicUrl}
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
