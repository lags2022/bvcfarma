export const searchWordInsensite = (word: string, wordToSearch: string) => {
  for (let i = 0; i < wordToSearch.length; i++) {
    if (
      word[0].toLowerCase() === wordToSearch[i].toLowerCase() &&
      word.toLowerCase() ===
        wordToSearch.slice(i, word.length + i).toLowerCase()
    ) {
      return true
    }
  }
  return false
}