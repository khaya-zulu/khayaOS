import type { AstroIntegration } from "astro";

export * from "./schema.ts";

import type { OSConfig } from "./schema.ts";

const resolveVirtualModuleId = (id: string) => `\0${id}`;

export default function osAstroPlugin(osConfig: OSConfig): AstroIntegration {
  return {
    name: "@os",
    hooks: {
      "astro:config:setup": ({ injectRoute, updateConfig }) => {
        if (osConfig.isBioEnabled) {
          injectRoute({
            pattern: "/",
            entrypoint: "@khaya-os/src/pages/bio.astro",
          });
        }

        if (osConfig.isProjectsEnabled) {
          injectRoute({
            pattern: "/projects",
            entrypoint: "@khaya-os/src/pages/projects.astro",
          });
        }

        if (osConfig.travel) {
          injectRoute({
            pattern: "/travel",
            entrypoint: "@khaya-os/src/pages/travel.astro",
          });
        }

        if (osConfig.isMusicEnabled) {
          injectRoute({
            pattern: "/api/spotify",
            entrypoint: "@khaya-os/src/pages/api/spotify.ts",
          });

          injectRoute({
            pattern: "/music",
            entrypoint: "@khaya-os/src/pages/music.astro",
          });
        }

        if (osConfig.isNotesEnabled) {
          injectRoute({
            pattern: "/notes",
            entrypoint: "@khaya-os/src/pages/notes/index.astro",
          });

          injectRoute({
            pattern: "/notes/[slug]",
            entrypoint: "@khaya-os/src/pages/notes/[...slug].astro",
          });
        }

        updateConfig({
          vite: {
            plugins: [
              {
                name: "@os",
                resolveId: (id) => {
                  const virtualImports = [
                    osConfig.travel ? "virtual:os/travel" : null,
                    "virtual:os/page",
                    "virtual:os/conditions",
                    "virtual:os/css",
                    "virtual:os/user-config",
                  ].filter(Boolean) as string[];

                  if (virtualImports.includes(id)) {
                    return resolveVirtualModuleId(id);
                  }

                  return;
                },
                load: (id) => {
                  // travel settings
                  if (id === resolveVirtualModuleId("virtual:os/travel")) {
                    return `export const travel = ${JSON.stringify(
                      osConfig.travel
                    )}`;
                  }

                  // user config
                  if (id === resolveVirtualModuleId("virtual:os/user-config")) {
                    return `export const user = ${JSON.stringify(
                      osConfig.user
                    )}`;
                  }

                  // conditions
                  if (id === resolveVirtualModuleId("virtual:os/conditions")) {
                    return `export const conditions = ${JSON.stringify({
                      isBioEnabled: osConfig.isBioEnabled,
                      isProjectsEnabled: osConfig.isProjectsEnabled,
                      isTravelEnabled: osConfig.isTravelEnabled,
                      isMusicEnabled: osConfig.isMusicEnabled,
                      isNotesEnabled: osConfig.isNotesEnabled,
                    })}`;
                  }

                  // page settings
                  if (id === resolveVirtualModuleId("virtual:os/page")) {
                    return `export const page = ${JSON.stringify(
                      osConfig.page
                    )}`;
                  }

                  // custom css styles
                  if (id === resolveVirtualModuleId("virtual:os/css")) {
                    return (
                      osConfig.customCSS
                        ?.map((filePath) => `import "${filePath}";`)
                        .join("") ?? ""
                    );
                  }

                  return;
                },
              },
            ],
          },
        });
      },
    },
  };
}
