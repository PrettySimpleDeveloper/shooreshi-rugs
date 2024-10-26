import {fetchGraphQL} from "@/lib/functions";
import {Post} from "@/lib/types";

/**
 * Fetch all blog posts.
 */
export default async function getAllPosts(language: string) {
  const query = `
query GetAllPosts($language: LanguageCodeFilterEnum!) {
  posts(where: {status: PUBLISH, language: $language}) {
    nodes {
      commentCount
      databaseId
      date
      modified
      title
      slug
      excerpt(format: RENDERED)
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
    }
  }
}
  `;

  const variables = {
    language: language
  };

  const response = await fetchGraphQL(query, variables);

  return response.data.posts.nodes as Post[];
}
