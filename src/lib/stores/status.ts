import type { NodeStatusResponse, Version } from "algosdk/dist/types/client/v2/algod/models/types";
import type { SetStatusCallback, StatusProps } from "./types";
import type { Readable } from "svelte/store";
import { readable, get } from "svelte/store";
import AlgodApi from "$lib/api/algod";
import { browser } from "$app/environment";
/**
* Component lifecycle
* ==================================================
*/
let updateTimeout: NodeJS.Timeout;
let started: boolean = false;

/**
 * Readable status store
 * ==================================================
 */
const status: Readable<StatusProps> = readable({
  version: undefined,
  lastRound: undefined,
  lastTimestamp: undefined,
  blockTime: undefined,
  averageBlockTime: 3.3,
  sampleSize: 1,
}, start);

/**
* Start / Stop functions for the readable store.
* ==================================================
*/
function start(set: SetStatusCallback) {
  if (!browser || started) return;
  started = true;
  init(set);
  update(set);
  return stop;
}
function stop() {
  started = false;
  if (updateTimeout) clearTimeout(updateTimeout);
}

/**
* Get the initial state
* ==================================================
*/
async function init(set: SetStatusCallback) {
  const [statusResponse, versionsResponse] = await Promise.all([
    AlgodApi.private.get('/v2/status') as Promise<NodeStatusResponse>,
    AlgodApi.private.get('/versions') as Promise<Version>,
  ]);
  if (!started) return; // dirty fix for HMR initializing store multiple times.
  const { build } = versionsResponse;
  set({ 
    ...get(status), 
    version: `v${build.major}.${build.minor}.${build.buildNumber}-${build.channel}`,
    lastRound: Number(statusResponse.lastRound),
  });
}


/**
* Update the store every block
* Use a timeout before "round" is set (from init function)
* Use "wait-for-block-after" once "round" is set
* ==================================================
*/
async function update(set: SetStatusCallback) {
  let { lastRound, lastTimestamp, averageBlockTime, blockTime, sampleSize } = get(status);
  if (!lastRound) {
    updateTimeout = setTimeout( () => update(set), 1000 );
    return;
  }

  const statusResponse = await AlgodApi.private.get(`/v2/status/wait-for-block-after/${lastRound}`) as NodeStatusResponse;
  if (!started) return; // dirty fix for HMR initializing store multiple times.
  const currentTimestamp = getBlockTimestamp(statusResponse);
  lastRound = Number(statusResponse.lastRound);
  if (lastTimestamp) {
    blockTime = (currentTimestamp - lastTimestamp) / 1000;
    averageBlockTime = ((averageBlockTime * sampleSize) + blockTime) / ++sampleSize;
  }
  lastTimestamp = currentTimestamp;
  set({ 
    ...get(status),
    lastRound, 
    lastTimestamp,
    blockTime, 
    averageBlockTime,
    sampleSize,
  });
  update(set);
}



/**
* Get a block timestamp based on a stattus response
* ==================================================
*/
function getBlockTimestamp(statusResponse: NodeStatusResponse) {
  const elapsedTime = Number(statusResponse.timeSinceLastRound) / 100_000_000;
  return Date.now() - elapsedTime;
}


/**
* Helper method to get the current version, 
* or wait until it's available
* ==================================================
*/
export const getCurrentVersion: Promise<string> = new Promise((resolve) => {
  const unsubscribe = status.subscribe(status => {
    if (!status.version) return;
    resolve(status.version);
    unsubscribe();
  })
});


export default status;

