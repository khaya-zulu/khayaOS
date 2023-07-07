import { createSignal } from "solid-js";
import _orderBy from "lodash/orderBy";

import { Card } from "~/components/card";
import { HorizontalList } from "~/layouts/horizontal-list";

const { data } = await fetch(
  `${import.meta.env.PUBLIC_BACKEND_API}/api/graphql`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      {
        notes(where:{published:{equals:true}}) {
          id
          title
          description
          publishedAt
          slug
          cover {
            publicUrl
          }
        }
      }
    `,
    }),
  }
).then((response) => response.json());

export const Notes = () => {
  const [selected, setSelected] = createSignal(-1);

  const notes = _orderBy(data.notes, ["index"]);

  return (
    <HorizontalList
      onOverlayClose={() => setSelected(-1)}
      showOverlay={selected() >= 0}
    >
      {notes.map((notes: any, idx: number) => (
        <Card {...notes} type="note" src={notes.cover.publicUrl} index={idx} />
      ))}
    </HorizontalList>
  );
};
