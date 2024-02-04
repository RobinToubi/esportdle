import players from "@/public/players.json";
import { comparePlayers, valid } from "../../lib/compare/country";
import { getPlayerToGuess } from "../../lib/random";
import { Player } from "../../lib/models/Player";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.headers.get("Attemps"));
  const data = await req.json();
  if (!data.id) {
    NextResponse.json({ message: "ID not found in body." });
  }
  const guessedPlayer = players.find((p) => p.id === data.id);
  if (!guessedPlayer) {
    NextResponse.json({ message: "ID not found in body." });
  }
  const playerToGuess = getPlayerToGuess();
  const resultWithCompare = comparePlayers(guessedPlayer as Player, playerToGuess);
  if (valid(resultWithCompare) || Number.parseInt(req.headers.get("Attemps") ?? '0') == 6) {
    resultWithCompare.result = playerToGuess;
  }
  return NextResponse.json(resultWithCompare);
}
