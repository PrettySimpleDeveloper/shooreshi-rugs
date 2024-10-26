import {reviews} from "@/lib/data/data";
import {Block, Review} from "@/lib/types";
import {findBlocksByMetadataName} from "@/lib/utils";

export default function getAboutUsData(blocks: Block[]) {
  /**
   * Cover Image
   */
  const heroImage = blocks.find(
    (block) => block.attributes?.metadata?.name === "about/cover"
  )?.attributes?.url;

  /** Histore section Title */
  const historyTitle = findBlocksByMetadataName(blocks, "history/title")[0]
    ?.attributes?.content;

  /**
   * History seton persons
   */
  const historyPersonBlocks = findBlocksByMetadataName(
    blocks,
    "history/person"
  );

  const historyPerson: {name: string; image: string}[] =
    historyPersonBlocks.map((personBlock) => {
      const nameBlock = personBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "person/name"
      );
      const imageBlock = personBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "person/image"
      );
      return {
        name: nameBlock?.attributes?.content || "",
        image: imageBlock?.attributes?.url || ""
      };
    });

  /**
   * Histore text
   */
  const historyText = findBlocksByMetadataName(blocks, "history/text")[0]
    ?.attributes?.content;

  /**
   * Abouts
   */
  const aboutsRowBlocks = findBlocksByMetadataName(blocks, "abouts/row");

  const abouts: {text: string; image: string}[] = aboutsRowBlocks.map(
    (rowBlock) => {
      const colBlocks = findBlocksByMetadataName(
        rowBlock.innerBlocks || [],
        "abouts/col"
      );

      const textBlock = findBlocksByMetadataName(
        colBlocks || [],
        "abouts/text"
      )[0];

      const imageBlock = findBlocksByMetadataName(
        colBlocks || [],
        "abouts/image"
      )[0];

      return {
        text: textBlock?.attributes?.content || "",
        image: imageBlock?.attributes?.url || ""
      };
    }
  );

  /** Team section Title */
  const teamTitle = findBlocksByMetadataName(blocks, "team/title")[0]
    ?.attributes?.content;

  /**
   * Team Member
   */
  const teamMemberBlocks = findBlocksByMetadataName(blocks, "team/member");

  const team: {name: string; role: string; image: string}[] =
    teamMemberBlocks.map((memberBlock) => {
      const nameBlock = memberBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "member/name"
      );
      const roleBlock = memberBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "member/role"
      );
      const imageBlock = memberBlock.innerBlocks?.find(
        (block) => block.attributes?.metadata?.name === "member/image"
      );
      return {
        name: nameBlock?.attributes?.content || "",
        role: roleBlock?.attributes?.content || "",
        image: imageBlock?.attributes?.url || ""
      };
    });

  /**
   * team text
   */
  const teamText = findBlocksByMetadataName(blocks, "team/text")[0]?.attributes
    ?.content;

  return {
    heroImage,
    historyTitle,
    historyPerson,
    historyText,
    abouts,
    teamTitle,
    team,
    teamText,
    reviews
  } as {
    heroImage: string;
    historyTitle: string;
    historyPerson: Array<{name: string; image: string}>;
    historyText: string;
    abouts: Array<{text: string; image: string}>;
    teamTitle: string;
    team: Array<{name: string; role: string; image: string}>;
    teamText: string;
    reviews: Review[];
  };
}
