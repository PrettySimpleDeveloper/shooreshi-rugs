import {fetchGraphQL} from "@/lib/functions";
import {Rug} from "@/lib/types";

/**
 * Fetch a book by slug.
 */
export default async function getRugBySlug(slug: string, language: string) {
  const query = `
query GetRugBySlug($slug: ID = "URI", $language: LanguageCodeEnum!) {
  rug(idType: SLUG, id: $slug) {
    rugFeatures {
      designer
      length
      material
      name
      origin
      width
      images {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
      idea
      numberOfKnots
      numberOfWeavers
      key
      certificate {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
    }
    databaseId
    date
    modified
    content(format: RENDERED)
    title(format: RENDERED)
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
    translation(language: $language) {
          rugFeatures {
      designer
      length
      material
      name
      origin
      width
      images {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
      idea
      numberOfKnots
      numberOfWeavers
      key
      certificate {
        altText
        sourceUrl
        mediaDetails {
          height
          width
        }
      }
    }
    databaseId
    date
    modified
    content(format: RENDERED)
    title(format: RENDERED)
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
    }
  }
}
  `;

  const variables = {
    slug: slug,
    language: language
  };

  const response = await fetchGraphQL(query, variables);

  return response.data.rug as Rug;
}
