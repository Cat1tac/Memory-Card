import { useState } from 'react'
import Randomize from './components/randomize'
import './App.css'


function App() {
  //Tracks score and which pokemon have been clicked already
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [saved, setSaved] = useState(new Set());

  return (
    <>
      <div className="score">
          <p>Score: {score}</p>
          <p>Best Score: {bestScore}</p>
      </div>
      <h1>Poké Memory</h1> 
      <Randomize 
        score={score}
        setScore={setScore}
        bestScore={bestScore}
        setBestScore={setBestScore}
        saved={saved}
        setSaved={setSaved}
        />
    </>
  )
}

export default App
