export const calculateAge = (birthDate: Date) => {
  const ageDifMs = Date.now() - new Date(birthDate).getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

/**
 * Compare two dates to determine if the player to guess is younger/older
 * than the guessed player's birthdate
 * @param guessedBirthDate Guessed player's birthdate
 * @param toGuessBirthDate Player to guess' birthdate
 * @returns -1: Younger | 0: Same age | 1: Older
 */
export const compareAge = (
  guessedBirthDate: string,
  toGuessBirthDate: string
): number => {
  const [guessed, toGuess] = [
    new Date(guessedBirthDate).getTime(),
    new Date(toGuessBirthDate).getTime(),
  ];
  if (guessed > toGuess) {
    return 1;
  }
  if (guessed < toGuess) {
    return -1;
  }
  return 0;
};
