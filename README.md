# Node API for Word Guessr 🎮

This repository contains the Node.js backend API for Word Guessr, a simple word guessing game. The backend is designed to handle game logic such as creating new games, tracking game state, and managing guesses. A [React repository](https://github.com/MMcBreezy/word-guessr-react) is available for the frontend UI.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Create a New Game](#create-a-new-game)
   - [Get Game State](#get-game-state)
   - [Make a Guess](#make-a-guess)
4. [Architecture](#architecture)
   - [Game Class](#game-class)
   - [Memory Class](#memory-class)
   - [Word Helper](#word-helper)
5. [React Frontend](#react-frontend)
6. [Contributing](#contributing)

## Features

- Create a new game
- Get the state of a specific game by ID
- Make a guess in a game
- Stateless server design using a simple in-memory database

## Installation

```bash
git clone https://github.com/YourUsername/word-guessr-api.git
cd word-guessr-api
npm install
npm start
```

## Usage

### Create a New Game

Send a POST request to /game.

```bash
curl -X POST http://localhost:3001/game
```

You will get a JSON response with the game's current state.

### Get Game State

Send a GET request to /game/:id, replacing \:id with the game's ID.

```bash
curl -X GET http://localhost:3001/game/YOUR_GAME_ID
```

### Make a Guess

Send a POST request to /game/:id/guess with a single alphanumeric guess parameter, replacing \:id with the game's ID.

```bash
curl -X POST -H "Content-Type: application/json" -d '{"guess": "A"}' http://localhost:3001/game/YOUR_GAME_ID/guess

```

The guess should be a single alphanumeric character. You'll get a JSON response indicating the game's current state.

Example of a JSON object of a completed game state:

```json
{
  "id": "37a8a959-b2ca-4c89-ba52-deea7cfdfe08",
  "letters": [null, null, "'a'", null, "'n'", null, null],
  "guesses": ["'a'", "'d'", "'e'", "'f'", "'n'", "'r'", "'s'", "'t'"],
  "guessesRemaining": 0,
  "userWon": false,
  "userLost": true,
  "userFinished": true,
  "revealedWord": "'plainly'"
}
```

## Architecture

### Game Class

Handles the logic for individual games, including managing guesses and tracking state.

### Memory Class

A simple in-memory database that stores game states.

### Word Helper

Provides random words for the game.

### React Frontend

Please check the [React repository](https://github.com/MMcBreezy/word-guessr-react) for details on the frontend UI.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
