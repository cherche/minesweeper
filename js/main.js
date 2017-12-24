import Game from './game.js'

window.Game = Game

const options = {
  width: 16,
  height: 16,
  numOfBombs: 40,
  timed: false
}

Game.options = options

Game.generateMap()

// render() is quite inefficient

// It's probably best to completely
// rewrite it from the ground up.

// Really, you only have to render
// everything when you hit a bomb

// Perhaps set up a queue of all tiles
// to reveal and pass it into render?

function render () {
  const { width, height } = Game.options

  if (options.timed) { /* Draw timer */ }

  // Transform game map into short IDs for rendering
  const idMap = Game.map.map((row, x) => {
    return row.map((tile) => {
      switch (tile.state) {
      case 'revealed':
        if (tile.id === 'bomb') return 'B'
        return tile.id
        break;
      case 'flagged':
        return 'F'
        break;
      // case 'hidden':
      default:
        return ''
      }
    })
  })

  // Build table (game board)
  const $table = document.createElement('table')
  for (let y = 0; y < height; y++) {
    const row = document.createElement('tr')
    for (let x = 0; x < width; x++) {
      const cell = document.createElement('td')
      const id = idMap[x][y]

      // Cell displays appropriate ID
      cell.textContent = id
      cell.className = `t${id}`

      cell.addEventListener('click', () => {
        const tile = Game.map[x][y]
        // It would be frustrating if you could
        // still reveal flagged tiles
        if (tile.state === 'flagged') return
        Game.reveal([[x, y]])
        render()
      })

      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        const tile = Game.map[x][y]
        // Disallow flagging already revealed squares
        if (tile.state === 'revealed') return
        tile.state = (tile.state === 'flagged') ? 'hidden' : 'flagged'
        render()
      })

      row.appendChild(cell)
    }
    $table.appendChild(row)
  }

  document.body.innerHTML = ''
  document.body.appendChild($table)
}

render()
