import { useState, useCallback, useEffect } from 'react'
import './App.css'
import StartScreen from './components/StartScreen/StartScreen'
import { wordsList } from './data/words'
import Game from './components/Game/Game'
import GameOver from './components/GaveOver/GameOver'

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState("")
  const [pickedCategory, setPickedCategory] = useState("")
  const [letters, setLetters] = useState("")
  const [guessedLetter, setGuessedLetter] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3);
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const wordArray = wordsList[category];
    const arrayLength = wordArray.length;
    const randomIndex = Math.floor(Math.random() * arrayLength);
    const word = wordArray[randomIndex];

    return { word, category }

  },[words])

  const startGame = useCallback (() => {
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");
    wordLetters = wordLetters.map((letter) => { return letter.toLowerCase() })

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name)
  },[pickWordAndCategory])

  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    if (guessedLetter.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
      retrun
    } else {
      if (letters.includes(normalizedLetter)) {
        setGuessedLetter((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter])
      } else {
        setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter])
        setGuesses((actual) => actual - 1)
      }
    }
  }
  const clearLetterStates = () => {
    setGuessedLetter([]);
    setWrongLetters([]);
  }

  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])


  useEffect(() => {

    const uniqueLetter = [... new Set(letters)]
    if (uniqueLetter.length === guessedLetter.length && gameStage === stages[1].name) {
      clearLetterStates();
      startGame();
      setGuesses(3)
      setScore((score) => score + 100)
    }

  }, [guessedLetter,letters,startGame])


  const retry = () => {
    setScore(0);
    setGuesses(3);
    setGameStage(stages[0].name)
  }

  return (
    <div className='App'>
      {gameStage === 'start' ? <StartScreen startGame={startGame} /> : ""}
      {gameStage === 'game' ? <Game verifyLetter={verifyLetter} pickedWord={pickedWord} pickedCategory={pickedCategory} letters={letters} guessedLetter={guessedLetter} wrongLetters={wrongLetters} guesses={guesses} score={score} /> : ""}
      {gameStage === 'end' ? <GameOver retry={retry} score={score} /> : ""}
    </div>
  )
}

export default App
