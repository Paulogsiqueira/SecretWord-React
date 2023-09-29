import React from 'react'
import './GameOver.css'

const GameOver = ({ retry, score }) => {
    return (
        <div className='gameOver'>
            <h1>Fim de jogo</h1>
            <div className='scoreEnd'>
                <img src="trofeu.png"></img>
                <span>Você marcou </span>
                <p>{score} pontos</p>
            
            </div>


            <button onClick={retry}>Resetar jogo</button>
        </div>


    )
}

export default GameOver