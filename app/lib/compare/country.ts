import { Player } from "../models/Player";
import { CountryProximity, Proximity } from "../models/Proximity";
import countries from '@/app/lib/compare/countries.json';
import { compareAge } from "./age";
import { Country, CountryData } from "../models/Country";

export function comparePlayers(guessed: Player, toGuess: Player): Proximity {
    if (guessed.id === toGuess.id) {
        return {
            player: toGuess,
            compare: {
                team: true,
                role: true,
                league: true,
                older: 0,
                country: CountryProximity.VALID
            }
        }
    }
    return {
        player: guessed,
        compare: {
            country: compareCountry(guessed.country, toGuess.country),
            team: guessed.team === toGuess.team,
            role: guessed.role === toGuess.role,
            league: guessed.league === toGuess.league,
            older: compareAge(guessed.birthDate, toGuess.birthDate)
        }
    }
}

export const valid = (prox: Proximity) => {
    if (prox.compare.role && prox.compare.team && prox.compare.league && prox.compare.older == 0 && prox.compare.country === "VALID") {
        return true;
    }
    return false;
}

function compareCountry(guessedCountry: string, countryToGuess: string): string {
    if (guessedCountry === countryToGuess){
        return CountryProximity.VALID;
    }
    const guessedCountryContinent = getCountryByCode(guessedCountry);
    const toGuessCountryContinent = getCountryByCode(countryToGuess);
    if (guessedCountryContinent.continent == toGuessCountryContinent.continent) {
        return CountryProximity.NEAR;
    }
    return CountryProximity.FAR;
}

export const getCountryByCode = (code: string): Country => {
    const test = countries as CountryData;
    return test[code];
}