import { Compare } from "./Compare";
import { Player } from "./Player";

export interface Proximity {
  player: Player;
  result?: Player;
  compare: Compare;
}

export const CountryProximity = {
  VALID: "VALID",
  NEAR: "NEAR",
  FAR:"FAR"
} as const;