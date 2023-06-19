import algostack from "$lib/api/algostack";


/**
 * Get the timestamp for a given round number
 * ==================================================
 */
export async function getBlockTimestamp(round: number) {
  if (!round) return undefined;
  const block = await algostack.lookup?.block(round);
  return block?.timestamp ? block.timestamp * 1000 : undefined;
}