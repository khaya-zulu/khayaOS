import { list, type ListConfig } from "@keystone-6/core";

import {
  text,
  password,
  timestamp,
  integer,
  checkbox,
} from "@keystone-6/core/fields";
import { virtual } from "@keystone-6/core/fields";
import { document } from "@keystone-6/fields-document";

import type { Lists } from ".keystone/types";
import { cloudinary } from "./storage";

import { graphql } from "@keystone-6/core";

import { getCurrentlyPlaying } from "./lib/spotify";
import { b64EncodeCloudinaryImage } from "./lib/cloudinary";

type AccessType = ListConfig<Lists.Config.TypeInfo<any>>["access"];

const frontendPermissions: AccessType = {
  operation: {
    query: () => true,
    create: ({ session }) => !!session,
    update: ({ session }) => !!session,
    delete: ({ session }) => !!session,
  },
};

const backendPermissions: AccessType = {
  operation: {
    query: ({ session }) => !!session,
    create: ({ session }) => !!session,
    update: ({ session }) => !!session,
    delete: ({ session }) => !!session,
  },
};

export const lists: Lists = {
  Config: list({
    access: frontendPermissions,
    isSingleton: true,
    fields: {
      avatar: cloudinary,
      avatarBlurUrl: text({ ui: { itemView: { fieldMode: "read" } } }),
      displayEmail: text({
        validation: {
          match: {
            regex:
              /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            explanation: "Invalid email",
          },
        },
      }),
      displayName: text(),
      bio: text(),
      twitter: text(),
      github: text(),
      linkedin: text(),
      latitude: text(),
      longitude: text(),
      location: text(),
      spotify: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve: async () => {
            const currently = await getCurrentlyPlaying();
            return JSON.stringify(currently);
          },
        }),
      }),
      temperature: virtual({
        field: graphql.field({
          type: graphql.String,
          resolve: async ({ longitude, latitude }) => {
            const resp = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
            );

            const data = await resp.json();

            return data?.main?.temp ?? "";
          },
        }),
      }),
    },
    hooks: {
      resolveInput: async ({ resolvedData, operation }) => {
        if (
          operation === "create" ||
          (operation === "update" && !!resolvedData.avatar)
        ) {
          const { avatar } = resolvedData;

          const avatarBlurUrl = b64EncodeCloudinaryImage({
            format: avatar._meta.format,
            publicId: avatar._meta.public_id,
            version: avatar._meta.version,
          });

          return {
            ...resolvedData,
            avatarBlurUrl,
          };
        }

        return resolvedData;
      },
    },
  }),
  User: list({
    access: backendPermissions,
    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: "unique",
      }),

      password: password({ validation: { isRequired: true } }),

      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
    },
  }),
  Career: list({
    access: frontendPermissions,
    fields: {
      index: integer({ isIndexed: "unique" }),
      published: checkbox({ defaultValue: false }),
      title: text({ validation: { isRequired: true } }),
      subTitle: text({ validation: { isRequired: true } }),
      description: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
      createdAt: timestamp({
        defaultValue: { kind: "now" },
      }),
      dateFrom: timestamp({ validation: { isRequired: true } }),
      dateTo: timestamp(),
      cover: cloudinary,
      coverBlurUrl: text({ ui: { itemView: { fieldMode: "read" } } }),
      url: text(),
    },
    hooks: {
      resolveInput: async ({ resolvedData, operation }) => {
        if (
          operation === "create" ||
          (operation === "update" && !!resolvedData.cover)
        ) {
          const { cover } = resolvedData;

          const coverBlurUrl = b64EncodeCloudinaryImage({
            format: cover._meta.format,
            publicId: cover._meta.public_id,
            version: cover._meta.version,
          });

          return {
            ...resolvedData,
            coverBlurUrl,
          };
        }

        return resolvedData;
      },
    },
  }),
  Project: list({
    access: frontendPermissions,
    fields: {
      index: integer({ isIndexed: "unique" }),
      published: checkbox({ defaultValue: false }),
      title: text({ validation: { isRequired: true } }),
      subTitle: text({ validation: { isRequired: true } }),
      description: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
      cover: cloudinary,
      coverBlurUrl: text({ ui: { itemView: { fieldMode: "read" } } }),
    },
    hooks: {
      resolveInput: async ({ resolvedData, operation }) => {
        if (
          operation === "create" ||
          (operation === "update" && !!resolvedData.cover)
        ) {
          const { cover } = resolvedData;

          const coverBlurUrl = b64EncodeCloudinaryImage({
            format: cover._meta.format,
            publicId: cover._meta.public_id,
            version: cover._meta.version,
          });

          return {
            ...resolvedData,
            coverBlurUrl,
          };
        }

        return resolvedData;
      },
    },
  }),
  Note: list({
    access: frontendPermissions,
    fields: {
      title: text({ validation: { isRequired: true } }),
      description: text({ validation: { isRequired: true } }),
      slug: text({}),
      published: checkbox({ defaultValue: false }),
      publishedAt: timestamp(),
      createdAt: timestamp({ defaultValue: { kind: "now" } }),
      cover: cloudinary,
      content: document({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
      }),
    },
    hooks: {
      resolveInput: ({ resolvedData, operation }) => {
        if (operation === "create") {
          const title = resolvedData.title as string;

          return {
            ...resolvedData,
            slug: title.toLowerCase().replaceAll(" ", "-"),
          };
        }

        return resolvedData;
      },
    },
  }),
};
