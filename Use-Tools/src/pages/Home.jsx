import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section>
      <h1>Tools</h1>
      <p>Welcome to Use-Tools. Pick a tool below.</p>
      <ul className="tool-list">
        <li>
          <Link className="tool-card" to="/tools/gcd">
            <span className="tool-title">GCD / PGCD Calculator</span>
            <span className="tool-desc">Compute the greatest common divisor of two integers and save to Firebase.</span>
          </Link>
        </li>
      </ul>
    </section>
  )
}