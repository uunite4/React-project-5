import React from "react";
import { nanoid } from 'nanoid'
import Confetti from "react-confetti"

import Die from "./components/Die";

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  const [rolls, setRolls] = React.useState(0)
  const [bestRolls, setBestRolls] = React.useState(Infinity)

  React.useEffect(() => {
    const firstValue = dice[0].value
    const allHeld = dice.every(die => die.isHeld)
    const allSameValue = dice.every(die => die.value === firstValue)

    if (allHeld && allSameValue) {
      setTenzies(true)
      if (bestRolls > rolls) {
        setBestRolls(rolls)
      }
    }
  }, [dice])

  function generateNum() {
    return Math.floor(Math.random() * 6) + 1
  }

  function generateNewDie() {
    return {
      value: generateNum(),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    let newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }

  const DiceElements = dice.map((obj) => {
    return (
      <Die 
      value={obj.value} 
      isHeld={obj.isHeld} 
      key={obj.id} 
      hold={() => holdDice(obj.id)} 
      />
    )
  })

  function Roll() {
    if (tenzies) {
      setRolls(0)
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setRolls(prev => prev += 1)
      setDice(prev => prev.map(obj => {
        return obj.isHeld
        ? obj
        : generateNewDie()
      }))
    }
  }

  function holdDice(id) {
    setDice(prev => prev.map(obj => {
      return obj.id === id
      ? {...obj, isHeld: !obj.isHeld} 
      : obj
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="text-cont">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze</p>
        <p className="rolls">{`Rolls: ${rolls}`}</p>
        {tenzies && <p className="best-score">{`Best score: ${bestRolls}`}</p>}
      </div>
      <div className="die-cont">
        {DiceElements}
      </div>
      <button onClick={Roll}>{tenzies ? "NEW GAME" : "ROLL"}</button>
    </main>
  )
}