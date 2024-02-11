import { DateTime } from 'luxon'
import { Player } from './models/Player'
import seedrandom from 'seedrandom'
import players from '@/public/players.json'

/**
 * Retrieve the current Date at midnight (CET)
 */
export const getDateAtMidnight = (): DateTime => {
    return DateTime.now().setZone('CET').startOf('day')
}

export const getRandomIndex = () => {
    const seed = getDateAtMidnight().toUnixInteger()
    const random = seedrandom(seed.toString())
    const filteredPlayers = players.filter((s) => s.birthDate !== 'TBD')
    const randomValue = Math.abs(random.int32()) % filteredPlayers.length
    return randomValue
}

export const getGuessedAndToGuessPlayer = (
    toGuessIndex: number,
    guessedId: string
): { guessed?: Player; toGuess?: Player } => {
    let guessed: Player | undefined = undefined
    let toGuess: Player | undefined = undefined
    const pl = players.filter((s) => s.birthDate !== 'TBD')
    for (let index = 0; index < pl.length; index++) {
        if (pl[index].id === guessedId) {
            guessed = pl[index]
        }
        if (index === toGuessIndex) {
            toGuess = pl[index]
        }
        if (guessed && toGuess) {
            break
        }
    }
    return { guessed: guessed, toGuess: toGuess }
}

/**
 * Get daily localStorage key
 **/
export const getCurrentStorageKey = (): string => {
    const date: string = new Date(Date.now()).toJSON().slice(0, 10) // exemple : '2023-08-31T11:31:26.885Z'
    return `esportdle-${date}`
}
