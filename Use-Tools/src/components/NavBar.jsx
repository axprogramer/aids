import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="brand">Use-Tools</Link>
      <nav className="nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/tools/gcd">GCD / PGCD</NavLink>
      </nav>
    </header>
  )
}