import players from '@/public/players.json'
import { comparePlayers, valid } from '../../lib/compare/country'
import { getGuessedAndToGuessPlayer, getRandomIndex } from '../../lib/random'
import { Player } from '../../lib/models/Player'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    const data = await req.json()
    if (!data.id) {
        NextResponse.json({ message: 'ID not found in body.' })
    }
    const guessedPlayer = players.find((p) => p.id === data.id)
    if (!guessedPlayer) {
        NextResponse.json({ message: 'ID not found in body.' })
    }
    const index = getRandomIndex()
    const playerToGuess = getGuessedAndToGuessPlayer(index, data.id)
    const resultWithCompare = comparePlayers(
        playerToGuess.guessed as Player,
        playerToGuess.toGuess as Player
    )
    if (
        valid(resultWithCompare) ||
        Number.parseInt(req.headers.get('Attemps') ?? '0') == 6
    ) {
        resultWithCompare.result = playerToGuess.toGuess
    }
    return NextResponse.json(resultWithCompare)
}
