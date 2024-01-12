import type { OSConfig } from "./schema.ts";

declare module "virtual:os/travel" {
  // eslint-disable-next-line
  const travel: NonNullable<import("./schema.ts").OSConfig["travel"]>;
  export { travel };
}

declare module "virtual:os/user-config" {
  // eslint-disable-next-line
  const user: import("./schema.ts").OSConfig["user"];
  export { user };
}

declare module "virtual:os/page" {
  // eslint-disable-next-line
  const page: import("./schema.ts").OSConfig["page"];
  export { page };
}

declare module "virtual:os/conditions" {
  type Conditions = {
    isBioEnabled: OSConfig["isBioEnabled"];
    isProjectsEnabled: OSConfig["isProjectsEnabled"];
    isTravelEnabled: OSConfig["isTravelEnabled"];
    isMusicEnabled: OSConfig["isMusicEnabled"];
    isNotesEnabled: OSConfig["isNotesEnabled"];
  };
  export const conditions: Conditions;
}

declare module "virtual:os/css" {}
