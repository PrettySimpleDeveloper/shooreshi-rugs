import {Block} from "@/lib/types";
import {findBlocksByMetadataName} from "@/lib/utils";

export default function getContactUsData(blocks: Block[]) {
  /**
   * Cover Image
   */
  const heroImage = blocks.find(
    (block) => block.attributes?.metadata?.name === "contact/cover"
  )?.attributes?.url;

  /** Contact Title */
  const contactTitle = findBlocksByMetadataName(blocks, "contact/title")[0]
    ?.attributes?.content;

  /**
   * Histore text
   */
  const contactText = findBlocksByMetadataName(blocks, "contact/text")[0]
    ?.attributes?.content;

  /**
   * Contact Channel
   */
  const contactChannelBlocks = findBlocksByMetadataName(
    blocks,
    "contact/channel"
  );

  const contactChannel: {name: string; image: string; text: string}[] =
    contactChannelBlocks.map((chennelBlock) => {
      const imageBlock = chennelBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "channel/image"
      );
      const nameBlock = chennelBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "channel/name"
      );
      const textBlock = chennelBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "channel/text"
      );
      return {
        name: nameBlock?.attributes?.content || "",
        image: imageBlock?.attributes?.url || "",
        text: textBlock?.attributes?.content || ""
      };
    });

  /**
   * Contact Image
   */
  const contactImage = blocks.find(
    (block) => block.attributes?.metadata?.name === "contact/image"
  )?.attributes;

  /** Contact Title */
  const faqsTitle = findBlocksByMetadataName(blocks, "faqs/title")[0]
    ?.attributes?.content;

  /**
   * faqs
   *
   */
  const faqsBlocks = findBlocksByMetadataName(blocks, "question");

  const faqs = faqsBlocks.map((block) => {
    const questionMatch = block.originalContent?.match(
      /<summary>(.*?)<\/summary>/
    );
    const question = questionMatch ? questionMatch[1] : null;
    const answer =
      (block.innerBlocks && block.innerBlocks[0]?.attributes?.content) || null;

    return {question, answer};
  });

  /**
   * Abouts
   */
  // const aboutsRowBlocks = findBlocksByMetadataName(blocks, "abouts/row");

  // const abouts: {text: string; image: string}[] = aboutsRowBlocks.map(
  //   (rowBlock) => {
  //     const colBlocks = findBlocksByMetadataName(
  //       rowBlock.innerBlocks || [],
  //       "abouts/col"
  //     );

  //     const textBlock = findBlocksByMetadataName(
  //       colBlocks || [],
  //       "abouts/text"
  //     )[0];

  //     const imageBlock = findBlocksByMetadataName(
  //       colBlocks || [],
  //       "abouts/image"
  //     )[0];

  //     return {
  //       text: textBlock?.attributes?.content || "",
  //       image: imageBlock?.attributes?.url || ""
  //     };
  //   }
  // );

  /** Team section Title */
  // const teamTitle = findBlocksByMetadataName(blocks, "team/title")[0]
  //   ?.attributes?.content;

  /**
   * Team Member
   */
  // const teamMemberBlocks = findBlocksByMetadataName(blocks, "team/member");

  // const team: {name: string; role: string; image: string}[] =
  //   teamMemberBlocks.map((memberBlock) => {
  //     const nameBlock = memberBlock.innerBlocks?.find(
  //       (block) => block.attributes?.metadata?.name === "member/name"
  //     );
  //     const roleBlock = memberBlock.innerBlocks?.find(
  //       (block) => block.attributes?.metadata?.name === "member/role"
  //     );
  //     const imageBlock = memberBlock.innerBlocks?.find(
  //       (block) => block.attributes?.metadata?.name === "member/image"
  //     );
  //     return {
  //       name: nameBlock?.attributes?.content || "",
  //       role: roleBlock?.attributes?.content || "",
  //       image: imageBlock?.attributes?.url || ""
  //     };
  //   });

  /**
   * team text
   */
  // const teamText = findBlocksByMetadataName(blocks, "team/text")[0]?.attributes
  //   ?.content;

  /**
   * Reviews
   */

  // const reviews: Review[] = [
  //   {
  //     review:
  //       "Shooreshi Rugs has the most beautiful and high-quality rugs I've ever seen. The craftsmanship is exceptional!",
  //     name: "Alice Johnson",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "I am thrilled with my purchase from Shooreshi Rugs. The colors and patterns are even more stunning in person.",
  //     name: "Bob Smith",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "The service at Shooreshi Rugs was fantastic. They helped me choose the perfect rug for my living room.",
  //     name: "Charlie Davis",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "Shooreshi Rugs offers an amazing selection of rugs. The one I bought transformed the look of my home!",
  //     name: "Diana Wilson",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "I'm so happy with my rug from Shooreshi Rugs. It's incredibly soft and well-made. Highly recommend!",
  //     name: "Ethan Martinez",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "The quality of the rugs at Shooreshi Rugs is unmatched. I couldn't be more pleased with my purchase.",
  //     name: "Fiona Brown",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "Shooreshi Rugs provided excellent customer service and a top-notch product. My new rug is a work of art.",
  //     name: "George Clark",
  //     rate: 5
  //   },
  //   {
  //     review:
  //       "I love my new rug from Shooreshi Rugs! It's the perfect addition to my home decor, and the quality is outstanding.",
  //     name: "Hannah Garcia",
  //     rate: 5
  //   }
  // ];

  // return {
  //   heroImage,
  //   historyTitle,
  //   historyPerson,
  //   historyText,
  //   abouts,
  //   teamTitle,
  //   team,
  //   teamText,
  //   reviews
  // } as {
  //   heroImage: string;
  //   historyTitle: string;
  //   historyPerson: Array<{name: string; image: string}>;
  //   historyText: string;
  //   abouts: Array<{text: string; image: string}>;
  //   teamTitle: string;
  //   team: Array<{name: string; role: string; image: string}>;
  //   teamText: string;
  //   reviews: Review[];
  // };

  return {
    heroImage,
    contactTitle,
    contactText,
    contactChannel,
    contactImage,
    faqsTitle,
    faqs
  } as {
    heroImage: string;
    contactTitle: string;
    contactText: string;
    contactChannel: Array<{name: string; image: string; text: string}>;
    contactImage: any;
    faqsTitle: string;
    faqs: Array<{question: string; answer: string}>;
  };
}
