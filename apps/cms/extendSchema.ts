import { graphql } from "@keystone-6/core";
// https://keystonejs.com/docs/guides/schema-extension
export const extendGraphqlSchema = graphql.extend((base) => {
  return {
    query: {},
  };
});
