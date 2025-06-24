import words from '../data/words_spanish.json'


export const generateRandomWord = (letters: number) => {
  let randomWord = ''
  do {
    randomWord = words[Math.floor(Math.random() * words.length)]
  } while (randomWord.split("").length !== letters);
  return randomWord.toUpperCase()
}

const generateWordBox = (letters: number) => {
  return Array.from({ length: letters }, (_, index) => ({
    key: index + 1,
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