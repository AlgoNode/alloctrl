import type { NodeStatusResponse, Version } from "algosdk/dist/types/client/v2/algod/models/types";
import type { SetStatusCallback, StatusProps } from "./types";
import type { Readable } from "svelte/store";
import { readable, get } from "svelte/store";
import { browser } from "$app/environment";
import { NodeState } from "$lib/enums";
import AlgodApi from "$lib/api/algod";
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
  state: NodeState.OFFLINE,
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
  init(set);
  return stop;
}
function stop() {
  started = false;
  if (updateTimeout) clearTimeout(updateTimeout);
}

/**
* Init the store
* ==================================================
*/
async function init(set: SetStatusCallback) {
  if (started) return;
  started = true;
  try {
    set({ ...get(status), state: NodeState.OFFLINE });
    await waitForOnline();
    set({ ...get(status), state: NodeState.CATCHING_UP });
    await waitForCatchup();
    set({ ...get(status), state: NodeState.READY });
    await waitForInitialState(set);
    waitForNewRound(set);
  }
  catch (e) {
    updateTimeout = setTimeout( () => init(set), 5000 );
  }
}



/**
* Check if node is online
* throws an unknown error when offline 
* https://developer.algorand.org/docs/rest-apis/algod/#get-health
* ==================================================
*/
function waitForOnline() {
  return new Promise((resolve) => checkIfOnline(resolve));
}
async function checkIfOnline(resolve: (...args: unknown[]) => void) {
  try { 
    await AlgodApi.private.get('/health');
    resolve();
  }
  catch (e) {
    console.log('error connecting to node')
    updateTimeout = setTimeout( () => checkIfOnline(resolve), 5000 );
  }
}


/**
* Check if node is ready (caught up)
* throws an error 503 when catching up 
* https://developer.algorand.org/docs/rest-apis/algod/#get-ready
* ==================================================
*/
function waitForCatchup() {
  return new Promise((resolve) => checkIfReady(resolve))
}
async function checkIfReady(resolve: (...args: unknown[]) => void) {
  try { 
    await AlgodApi.private.get('/ready'); 
    resolve();
  }
  catch (e) {
    console.log('error catching up', e)
    updateTimeout = setTimeout( () => checkIfReady(resolve), 30000 );
  }
}


/**
* Check for initial state
* ==================================================
*/
async function waitForInitialState(set: SetStatusCallback) {
  const statusResponse = await AlgodApi.private.get('/v2/status') as NodeStatusResponse;
  const versionsResponse = await AlgodApi.private.get('/versions') as Version;
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
async function waitForNewRound(set: SetStatusCallback) {
  if (updateTimeout) clearTimeout(updateTimeout);
  let { lastRound, lastTimestamp, averageBlockTime, blockTime, sampleSize } = get(status);
  const statusResponse = await AlgodApi.private.get(`/v2/status/wait-for-block-after/${lastRound}`) as NodeStatusResponse;
  if (!started) return; // dirty fix for HMR initializing store multiple times.
  const currentTimestamp = getBlockTimestamp(statusResponse);

  lastRound = Number(statusResponse.lastRound);
  if (lastTimestamp) {
    blockTime = (currentTimestamp - lastTimestamp) / 1000;
    if (blockTime < 100) return set({ ...get(status), state: NodeState.CATCHING_UP });
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
  waitForNewRound(set);
}



/**
* Get a block timestamp based on a status response
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

