import { shuffle, splitInto2dArray } from './array-helpers.js'
import { getAdjacents, coordsToVal } from './grid.js'

function Tile (id) {
  return {
    id,
    state: 'hidden' // Either 'hidden', 'revealed', or 'flagged'
  }
}

const Game = { map: [] }

// Create local coordsToVal() that uses Game.map
Game.coordsToTile = coords => coordsToVal(Game.map, coords)

Game.options = {
  width: 9,
  height: 9,
  numOfBombs: 10,
  timed: false
}

Game.generateMap = () => {
  const { width, height, numOfBombs } = Game.options
  const numOfCells = height * width

  const arr = []

  // Create 1D array with either bomb or 0
  for (let i = 0; i < numOfCells; i++) {
    if (i < numOfBombs) {
      arr.push(Tile('bomb'))
    } else {
      arr.push(Tile(0))
    }
  }

  const shuffled = shuffle(arr)

  // Split array into 2D array where each
  // sub-array has a length equal to the
  // height defined in the options
  Game.map = splitInto2dArray(shuffled, height)

  Game.map.forEach((row, x) => {
    row.forEach((tile, y) => {
      if (tile.id === 'bomb') return

      // Go through the 2D array and replace
      // all 0s with the appropriate number
      // of bombs surrounding them

      tile.id = getAdjacents(width, height, [x, y])
        .map(Game.coordsToTile)
        .reduce((count, {id}) => {
          return count + (id === 'bomb' ? 1 : 0)
        }, 0)
    })
  })

  return Game.map
}

// Game.reveal() may be doing too much right now
// Break out some of the code?
Game.reveal = (coordsQueue) => {
  const { width, height, numOfBombs } = Game.options

  coordsQueue.forEach(([x, y]) => {
    const selected = Game.map[x][y]

    // Small optimization (why bother at all
    // if the tile has already been revealed?)
    if (selected.state === 'revealed') return

    selected.state = 'revealed'

    switch (selected.id) {
    // Reveal everything if you reveal a bomb
    case 'bomb':
      Game.map.forEach((row, x) => {
        row.forEach((tile, y) => {
          tile.state = 'revealed'
        })
      })
      break;
    case 0:
      // If you reveal a 0, there are no bombs
      // directly adjacent, so just reveal all
      // adjacent tiles for the player
      Game.reveal(
        getAdjacents(width, height, [x, y])
      )
      break;
    }
  })
}

export default Game
