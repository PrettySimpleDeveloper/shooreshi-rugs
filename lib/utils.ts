import {Block} from "@/lib/types";
import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findBlocksByMetadataName(
  blocks: Block[],
  targetName: string
): Block[] {
  let result: Block[] = [];
  for (const block of blocks) {
    if (block.attributes?.metadata?.name === targetName) {
      result.push(block);
    }
    if (block.innerBlocks) {
      result = result.concat(
        findBlocksByMetadataName(block.innerBlocks, targetName)
      );
    }
  }
  return result;
}

function getRandomSample<T>(array: T[], size: number): T[] {
  const shuffled = array.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}
