import { shuffle, splitInto2dArray } from './array-helpers.js'
import { getAdjacents } from './grid.js'

function Tile (id) {
  return {
    id,
    state: 'hidden' // Either 'hidden', 'revealed', or 'flagged'
  }
}

function coordsToTile ([x, y]) {
  return Game.map[x][y]
}

const Game = { map: [] }

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

  for (let i = 0; i < numOfCells; i++) {
    if (i < numOfBombs) {
      arr.push(Tile('bomb'))
    } else {
      arr.push(Tile(0))
    }
  }

  Game.map = splitInto2dArray(shuffle(arr), height)

  Game.map.forEach((row, x) => {
    row.forEach((tile, y) => {
      if (tile.id === 'bomb') return

      tile.id = getAdjacents(width, height, [x, y])
        .map(coordsToTile)
        .reduce((count, {id}) => {
          return count + (id === 'bomb' ? 1 : 0)
        }, 0)
    })
  })

  return Game.map
}

Game.reveal = ([x, y]) => {
  const { width, height } = Game.options

  const selected = Game.map[x][y]
  if (selected.state === 'revealed') return
  selected.state = 'revealed'

  switch (selected.id) {
  case 'bomb':
    Game.map.forEach((row) => {
      row.forEach(tile => tile.state = 'revealed')
    })
    break;
  case 0:
    getAdjacents(width, height, [x, y])
      //.map(coordsToTile)
      .forEach((coords) => {
        const tile = coordsToTile(coords)

        if (tile.state === 'revealed') return

        Game.reveal([coords[0], coords[1]])
      })
    break;
  }
}

export default Game
