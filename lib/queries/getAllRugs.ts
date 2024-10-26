import {fetchGraphQL} from "@/lib/functions";
import {Rug} from "@/lib/types";

/**
 * Fetch all rugs.
 */
export default async function getAllRugs(language: string) {
  const query = `
query GetAllRugs($language: LanguageCodeFilterEnum!) {
  rugs(where: {status: PUBLISH, language: $language}) {
    nodes {
      databaseId
      date
      modified
      title
      slug
      featuredImage {
        node {
          altText
          sourceUrl
          mediaDetails {
            height
            width
          }
        }
      }
      seo {
        metaDesc
        title
      }
      rugFeatures {
        designer
        length
        material
        name
        origin
        width
        numberOfKnots
        numberOfWeavers
        idea
      }
    }
  }
}
  `;

  const variables = {
    language: language
  };

  const response = await fetchGraphQL(query, variables);

  return response.data.rugs.nodes as Rug[];
}
