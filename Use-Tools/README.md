# Use-Tools

A React (Vite) web app with Firebase Realtime Database.

## Setup

1. Copy `.env.example` to `.env` and fill in your Firebase web app credentials, including the Realtime Database URL.
2. Install dependencies and run:

```bash
npm install
npm run dev
```

Visit the local address shown in the terminal.

## Tools

- GCD / PGCD Calculator: Compute the greatest common divisor of two integers. Saves recent calculations to `tools/gcd/calculations` in Firebase Realtime Database.