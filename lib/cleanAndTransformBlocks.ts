import {Block} from "./types"

function assignId(blocks: Block[]) {
  blocks.forEach((block) => {
    block.id = crypto.randomUUID()
    if (block.innerBlocks?.length) {
      assignId(block.innerBlocks)
    }
  })
}

export function cleanAndTransformBlocks(commingBlocks: Block[]) {
  const blocks = JSON.parse(JSON.stringify(commingBlocks))

  assignId(blocks)

  return blocks
}
