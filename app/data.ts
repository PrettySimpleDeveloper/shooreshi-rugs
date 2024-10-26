import {Block} from "@/lib/types";
import {findBlocksByMetadataName} from "@/lib/utils";
import {
  PiCreditCardBold,
  PiFingerprintBold,
  PiPackageBold,
  PiTruckBold
} from "react-icons/pi";

export default function getHomeData(blocks: Block[]) {
  /**
   * Hero Cover Background Image
   */
  const homeCoverImage = blocks.find(
    (block) => block.attributes?.metadata?.name === "home/cover"
  )?.attributes?.url;

  /**
   * Hero Title
   */
  const heroTitle = findBlocksByMetadataName(blocks, "hero/title")[0]
    ?.attributes?.content;

  /**
   * Hero Rugs Image
   */
  const heroImage = findBlocksByMetadataName(blocks, "hero/image")[0]
    ?.attributes?.url;

  const whyUs: Array<{icon: any; title: string}> = [
    {
      icon: PiFingerprintBold,
      title: "Authenticity"
    },
    {
      icon: PiTruckBold,
      title: "Delivery"
    },
    {
      icon: PiPackageBold,
      title: "Returns"
    },
    {
      icon: PiCreditCardBold,
      title: "Payment"
    }
  ];

  return {
    homeCoverImage,
    heroTitle,
    heroImage,
    whyUs
  } as {
    homeCoverImage: string;
    heroTitle: string;
    heroImage: string;
    whyUs: Array<{icon: any; title: string; text: string}>;
  };
}
