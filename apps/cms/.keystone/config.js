"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core4 = require("@keystone-6/core");

// schema.ts
var import_core = require("@keystone-6/core");
var import_fields = require("@keystone-6/core/fields");
var import_fields2 = require("@keystone-6/core/fields");
var import_fields_document = require("@keystone-6/fields-document");

// storage.ts
var import_dotenv = __toESM(require("dotenv"));
var import_cloudinary = require("@keystone-6/cloudinary");
import_dotenv.default.config();
var r2 = {
  // Files that use this store will be stored in an s3 bucket
  kind: "s3",
  // This store is used for the file field type
  type: "image",
  // The S3 bucket name pulled from the S3_BUCKET_NAME environment variable
  bucketName: "khaya-os",
  // The S3 bucket region pulled from the S3_REGION environment variable
  region: "auto",
  // The S3 Access Key ID pulled from the S3_ACCESS_KEY_ID environment variable
  accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
  // The S3 Secret pulled from the S3_SECRET_ACCESS_KEY environment variable
  secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  // The S3 links will be signed so they remain private
  signed: { expiry: 5e3 }
};
var cloudinary = (0, import_cloudinary.cloudinaryImage)({
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
    folder: process.env.CLOUDINARY_API_FOLDER || ""
  }
});

// schema.ts
var import_core2 = require("@keystone-6/core");

// lib/spotify.ts
var import_querystring = __toESM(require("querystring"));
var getAccessToken = async () => {
  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: import_querystring.default.stringify({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
    })
  });
  return response.json();
};
var getCurrentlyPlaying = async () => {
  const { access_token } = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json"
      }
    }
  );
  if (response.status === 200) {
    return response.json();
  }
};

// lib/cloudinary.ts
var b64EncodeCloudinaryImage = async ({
  version,
  publicId,
  format
}) => {
  const blurredUrl = `https://res.cloudinary.com/khaya-zulu/image/upload/w_100,q_auto,f_webp,e_blur:1000/v${version}/${publicId}`;
  const resp = await fetch(blurredUrl);
  const buffer = await resp.arrayBuffer();
  return `data:image/${format};base64,${Buffer.from(buffer).toString(
    "base64"
  )}`;
};

// schema.ts
var frontendPermissions = {
  operation: {
    query: () => true,
    create: ({ session: session2 }) => !!session2,
    update: ({ session: session2 }) => !!session2,
    delete: ({ session: session2 }) => !!session2
  }
};
var backendPermissions = {
  operation: {
    query: ({ session: session2 }) => !!session2,
    create: ({ session: session2 }) => !!session2,
    update: ({ session: session2 }) => !!session2,
    delete: ({ session: session2 }) => !!session2
  }
};
var lists = {
  Config: (0, import_core.list)({
    access: frontendPermissions,
    isSingleton: true,
    fields: {
      avatar: cloudinary,
      avatarBlurUrl: (0, import_fields.text)(),
      displayEmail: (0, import_fields.text)({
        validation: {
          match: {
            regex: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
            explanation: "Invalid email"
          }
        }
      }),
      displayName: (0, import_fields.text)(),
      bio: (0, import_fields.text)(),
      twitter: (0, import_fields.text)(),
      github: (0, import_fields.text)(),
      linkedin: (0, import_fields.text)(),
      latitude: (0, import_fields.text)(),
      longitude: (0, import_fields.text)(),
      location: (0, import_fields.text)(),
      spotify: (0, import_fields2.virtual)({
        field: import_core2.graphql.field({
          type: import_core2.graphql.String,
          resolve: async () => {
            const currently = await getCurrentlyPlaying();
            return JSON.stringify(currently);
          }
        })
      }),
      temperature: (0, import_fields2.virtual)({
        field: import_core2.graphql.field({
          type: import_core2.graphql.String,
          resolve: async ({ longitude, latitude }) => {
            const resp = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
            );
            const data = await resp.json();
            return data?.main?.temp ?? "";
          }
        })
      })
    },
    hooks: {
      resolveInput: async ({ resolvedData, operation }) => {
        if (operation === "create" || operation === "update" && !!resolvedData.avatar) {
          const { avatar } = resolvedData;
          const avatarBlurUrl = b64EncodeCloudinaryImage({
            format: avatar._meta.format,
            publicId: avatar._meta.public_id,
            version: avatar._meta.version
          });
          return {
            ...resolvedData,
            avatarBlurUrl
          };
        }
        return resolvedData;
      }
    }
  }),
  User: (0, import_core.list)({
    access: backendPermissions,
    fields: {
      name: (0, import_fields.text)({ validation: { isRequired: true } }),
      email: (0, import_fields.text)({
        validation: { isRequired: true },
        isIndexed: "unique"
      }),
      password: (0, import_fields.password)({ validation: { isRequired: true } }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      })
    }
  }),
  Career: (0, import_core.list)({
    access: frontendPermissions,
    fields: {
      index: (0, import_fields.integer)({ isIndexed: "unique" }),
      published: (0, import_fields.checkbox)({ defaultValue: false }),
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      subTitle: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1]
        ]
      }),
      createdAt: (0, import_fields.timestamp)({
        defaultValue: { kind: "now" }
      }),
      dateFrom: (0, import_fields.timestamp)({ validation: { isRequired: true } }),
      dateTo: (0, import_fields.timestamp)(),
      cover: cloudinary,
      // coverBlurUrl: text({ ui: { itemView: { fieldMode: "read" } } }),
      coverBlurUrl: (0, import_fields.text)(),
      url: (0, import_fields.text)()
    },
    hooks: {
      resolveInput: async ({ resolvedData, operation }) => {
        if (operation === "create" || operation === "update" && !!resolvedData.cover) {
          const { cover } = resolvedData;
          const coverBlurUrl = b64EncodeCloudinaryImage({
            format: cover._meta.format,
            publicId: cover._meta.public_id,
            version: cover._meta.version
          });
          return {
            ...resolvedData,
            coverBlurUrl
          };
        }
        return resolvedData;
      }
    }
  }),
  Project: (0, import_core.list)({
    access: frontendPermissions,
    fields: {
      index: (0, import_fields.integer)({ isIndexed: "unique" }),
      published: (0, import_fields.checkbox)({ defaultValue: false }),
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      subTitle: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1]
        ]
      }),
      cover: cloudinary,
      coverBlurUrl: (0, import_fields.text)()
    },
    hooks: {
      resolveInput: async ({ resolvedData, operation }) => {
        if (operation === "create" || operation === "update" && !!resolvedData.cover) {
          const { cover } = resolvedData;
          const coverBlurUrl = b64EncodeCloudinaryImage({
            format: cover._meta.format,
            publicId: cover._meta.public_id,
            version: cover._meta.version
          });
          return {
            ...resolvedData,
            coverBlurUrl
          };
        }
        return resolvedData;
      }
    }
  }),
  Note: (0, import_core.list)({
    access: frontendPermissions,
    fields: {
      title: (0, import_fields.text)({ validation: { isRequired: true } }),
      description: (0, import_fields.text)({ validation: { isRequired: true } }),
      slug: (0, import_fields.text)({}),
      published: (0, import_fields.checkbox)({ defaultValue: false }),
      publishedAt: (0, import_fields.timestamp)(),
      createdAt: (0, import_fields.timestamp)({ defaultValue: { kind: "now" } }),
      cover: cloudinary,
      content: (0, import_fields_document.document)({
        formatting: true,
        dividers: true,
        links: true,
        layouts: [
          [1, 1],
          [1, 1, 1]
        ]
      })
    },
    hooks: {
      resolveInput: ({ resolvedData, operation }) => {
        if (operation === "create") {
          const title = resolvedData.title;
          return {
            ...resolvedData,
            slug: title.toLowerCase().replaceAll(" ", "-")
          };
        }
        return resolvedData;
      }
    }
  })
};

// extendSchema.ts
var import_core3 = require("@keystone-6/core");
var extendGraphqlSchema = import_core3.graphql.extend((base) => {
  return {
    query: {}
  };
});

// auth.ts
var import_crypto = require("crypto");
var import_auth = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth.createAuth)({
  listKey: "User",
  identityField: "email",
  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",
  // dont support initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: process.env.NODE_ENV === "production" ? void 0 : {
    // if there are no items in the database, by configuring this field
    //   you are asking the Keystone AdminUI to create a new user
    //   providing inputs for these fields
    fields: ["name", "email", "password"]
    // it uses context.sudo() to do this, which bypasses any access control you might have
    //   you shouldn't use this in production
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// keystone.ts
var keystone_default = withAuth(
  (0, import_core4.config)({
    extendGraphqlSchema,
    storage: { r2 },
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || ""
    },
    server: {
      cors: { origin: process.env.FRONTEND_URL ?? "" }
    },
    lists,
    session
  })
);
