# Node API for Simple Game

This repository contains a Node.js API for a simple guessing game. You can create a new game, get its state, and make a guess.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Create a New Game](#create-a-new-game)
  - [Get Game State](#get-game-state)
  - [Make a Guess](#make-a-guess)
- [Contributing](#contributing)
- [License](#license)

## Installation

First, make sure you have Node.js and npm installed. Then, clone this repository:

```bash
git clone https://github.com/yourusername/yourrepository.git
```

Navigate to the directory and install the dependencies:

```bash
cd yourrepository
npm install
```

Start the server:

```bash
npm start
```

## Usage

### Create a New Game

To create a new game, send a POST request to `/game`.

```bash
curl -X POST http://localhost:3000/game
```

You will get a JSON response with the game's current state.

### Get Game State

To get the state of a game, send a GET request to `/game/:id`.

Replace `:id` with the game's ID.

```bash
curl -X GET http://localhost:3000/game/YOUR_GAME_ID
```

### Make a Guess

To make a guess, send a POST request to `/game/:id/guess` with the `guess` parameter.

Replace `:id` with the game's ID.

```bash
curl -X POST -d "guess=A" http://localhost:3000/game/YOUR_GAME_ID/guess
```

The guess should be a single alphanumeric character. You'll get a JSON response indicating the game's current state.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
