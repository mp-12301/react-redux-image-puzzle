# Puzzle Image Game

The objective was to develop a puzzle game where a user uploads an image, it is split up into tiles and these tiles are arranged randomly in a grid.  The user then must drag tiles around to rearrange them.  The game stops when the tiles are in the order that recreates the original image.  Upon completion, a modal pops up prompting the user for their name.  Their name and the number of moves they took to rearrange the image are then saved to a leaderboard below the puzzle, with the lowest number of moves on top.  Only the names of the 5 players with the fewest moves will show in the leaderboard.

## Installation

```
git clone --depth 1 https://github.com/mpereira96/react-redux-image-puzzle.git [project_name]
cd [project_name]
npm install or yarn install
```

## Usage

```
npm start                   # start server
npm run start:dashboard     # start server using webpack-dashboard
npm test                    # starts tests
```
After starting the server, you can start the game at http://localhost:8080 (by default).