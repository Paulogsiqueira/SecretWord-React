import React, { useState, useRef } from 'react'
import './Game.css'

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetter, wrongLetters, guesses, score }) => {
    const [letter, setLetter] = useState("")
    const letterInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyLetter(letter);
        setLetter("");

        letterInputRef.current.focus()
    }


    return (
        <div className='game'>
            <p className='points'></p>
            <div className='score'>
                <span>Pontuação</span>
                <p>{score}</p>
            </div>

            <h1>Advinhe a palavra</h1>
            <h3 className='tip'>Dica sobre a palavra:<span className='tipWord'>{pickedCategory}</span></h3>
            <p>Voce ainda tem {guesses} tentativa(s)</p>
            <div className='wordContainer'>
                {letters.map((letter, index) => (
                    guessedLetter.includes(letter) ? (<span key={index} className="letter">{letter}</span>) : (<span key={index} className="blankSquare"></span>)))}
            </div>
            <div className='letterContainer'>
                <p>Tente advinhar uma letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="letter" maxLength={1} required onChange={(e) => (setLetter(e.target.value))} value={letter} ref={letterInputRef} />
                    <button>Jogar!</button>
                </form>
            </div>
            <div className='wrongLettersContainer'>
                <p>Letras já utilizadas:</p>
                {wrongLetters.map((letter, index) => (
                    <span key={index}>{letter}, </span>
                ))}

            </div>
        </div>

    )
}

export default Game