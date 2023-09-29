import React from 'react'
import './StartScreen.css'

const StartScreen = ({startGame}) => {
    return (
        <div className='start'>
            <div>
                <h2>Secret</h2>
                <h1>WO<span className='title-letter-R'>R</span><span className='title-letter-D'>D</span></h1>
            </div>
            <button onClick={startGame}>Play</button>
        </div>
    )
}

export default StartScreen