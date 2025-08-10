import React, { useEffect, useState } from 'react'
import { writeGcdCalculation, subscribeToRecentCalculations } from '../firebase.js'

function computeGcd(a, b) {
  let x = Math.abs(a)
  let y = Math.abs(b)
  while (y !== 0) {
    const temp = y
    y = x % y
    x = temp
  }
  return x
}

export default function GcdTool() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const unsubscribe = subscribeToRecentCalculations(setHistory)
    return () => unsubscribe()
  }, [])

  function handleCompute(event) {
    event.preventDefault()
    setError('')
    const ai = parseInt(a, 10)
    const bi = parseInt(b, 10)
    if (Number.isNaN(ai) || Number.isNaN(bi)) {
      setResult(null)
      setError('Please enter two integers.')
      return
    }
    const gcd = computeGcd(ai, bi)
    setResult(gcd)
  }

  async function handleSave() {
    if (result === null) return
    try {
      await writeGcdCalculation(parseInt(a, 10), parseInt(b, 10), result)
    } catch (err) {
      setError('Failed to save to Firebase. Check configuration.')
    }
  }

  return (
    <section>
      <h1>GCD / PGCD Calculator</h1>
      <form onSubmit={handleCompute} className="gcd-form">
        <div className="field">
          <label>A</label>
          <input value={a} onChange={(e) => setA(e.target.value)} placeholder="Enter integer A" />
        </div>
        <div className="field">
          <label>B</label>
          <input value={b} onChange={(e) => setB(e.target.value)} placeholder="Enter integer B" />
        </div>
        <div className="buttons">
          <button type="submit">Compute</button>
          <button type="button" disabled={result === null} onClick={handleSave}>Save</button>
        </div>
      </form>
      {error && <p className="error">{error}</p>}
      {result !== null && (
        <p className="result">gcd({a || '?'}, {b || '?'}) = {result}</p>
      )}

      <h2>Recent</h2>
      <ul className="history">
        {history.map((item) => (
          <li key={item.id}>gcd({item.a}, {item.b}) = {item.result}</li>
        ))}
      </ul>
    </section>
  )
}