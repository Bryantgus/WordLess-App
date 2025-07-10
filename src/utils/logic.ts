import words from '../data/words_english.json'


export const generateRandomWord = (letters: number) => {
  let randomWord = ''
  do {
    randomWord = words[Math.floor(Math.random() * words.length)]
  } while (randomWord.split("").length !== letters);
  return randomWord.toUpperCase()
}

const generateWordBox = (letters: number) => {
  return Array.from({ length: letters }, () => ({
    letter: '',
    isFill: false,
    isCorrect: 0,
    wasAnswer: false
  }))
}

export const generateAttempts = (letters: number, attempts: number) => {  
  return Array.from({ length: attempts }, () => {
    return generateWordBox(letters)
  })
}

export const removeLastWord = (word: string) => {
  const wordSplited = word.split('')
  wordSplited.pop()
  return wordSplited.join('')
}

export function replaceOneWithSpace(arr: string[], value: string) {
  const index = arr.indexOf(value);
  if (index !== -1) {
    arr[index] = ' ';
  }
  return arr;
}