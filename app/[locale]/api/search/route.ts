import {fetchGraphQL} from "@/lib/functions";
import {Rug} from "@/lib/types";
import {NextRequest, NextResponse} from "next/server";

export async function POST(
  request: NextRequest,
  {params}: {params: Promise<{locale: string}>}
) {
  const language = (await params).locale.toUpperCase(); // 'fa', 'en'

  try {
    const filters = await request.json();

    let hasMaxWidthFilter = ``;
    let hasMaxLengthFilter = ``;

    if (filters.maxWidth) {
      hasMaxWidthFilter = `
        {key: "width",
        compare: LESS_THAN_OR_EQUAL_TO,
        value: "${filters.maxWidth}",
        type: NUMERIC}
      `;
    }

    if (filters.maxLength) {
      hasMaxLengthFilter = `
        {key: "length",
        compare: LESS_THAN_OR_EQUAL_TO,
        value: "${filters.maxLength}",
        type: NUMERIC}
      `;
    }

    const query = `
    query GetAllRugs($language: LanguageCodeFilterEnum!) {
      rugs(where: {status: PUBLISH, language: $language, metaQuery: {
        relation:AND,
           metaArray:  [
         ${hasMaxWidthFilter},
         ${hasMaxLengthFilter}
        ]}}) {
        nodes {
          databaseId
          content(format: RENDERED)
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

    // const graphqlUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL;
    // if (!graphqlUrl) {
    //   throw new Error("Missing WordPress GraphQL URL environment variable!");
    // }
    // const response = await fetch(graphqlUrl, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     query
    //   })
    // });

    //     const query = `
    // query GetAllRugs {
    //   rugs(where: {status: PUBLISH}) {
    //     nodes {
    //       databaseId
    //       date
    //       modified
    //       title
    //       slug
    //       featuredImage {
    //         node {
    //           altText
    //           sourceUrl
    //           mediaDetails {
    //             height
    //             width
    //           }
    //         }
    //       }
    //       seo {
    //         metaDesc
    //         title
    //       }
    //       rugFeatures {
    //         designer
    //         length
    //         material
    //         name
    //         origin
    //         width
    //         numberOfKnots
    //         numberOfWeavers
    //         idea
    //       }
    //     }
    //   }
    // }
    //   `;

    const variables = {
      language: language
    };

    const response = await fetchGraphQL(query, variables);
    // const {data} = await response.json();

    return NextResponse.json({
      rugs: response.data.rugs.nodes as Rug[]
    });

    // return new Response(
    //   JSON.stringify({
    //     rugs: response.data.rugs.nodes as Rug[]
    //   }),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "X-Robots-Tag": "noindex"
    //     }
    //   }
    // );
  } catch (error) {
    console.error("Error: ", error);
  }
}
