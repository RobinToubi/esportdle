import { DateTime } from "luxon";
import { Player } from "./models/Player";
import players from "@/public/players.json";
import seedrandom from "seedrandom";

/**
 * Retrieve the current Date at midnight (CET)
 */
export const getDateAtMidnight = (): DateTime => {
  return DateTime.now().setZone("CET").startOf("day");
};

export const getPlayerToGuess = (): Player => {
  const seed = getDateAtMidnight().toUnixInteger();
  const random = seedrandom(seed.toString());
  const filteredPlayers = players.filter(s => s.birthDate !== "TBD")
  const randomValue = Math.abs(random.int32()) % filteredPlayers.length;
  return filteredPlayers.at(randomValue) ?? players[0];
};

/**
 * Get daily localStorage key
 **/
export const getCurrentStorageKey = (): string => {
  const date: string = new Date(Date.now()).toJSON().slice(0, 10); // exemple : '2023-08-31T11:31:26.885Z'
  return `esportdle-${date}`;
};
