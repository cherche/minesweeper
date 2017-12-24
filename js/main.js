import Game from './game.js'

const options = {
  width: 9,
  height: 9,
  numOfBombs: 10,
  timed: false
}

Game.generateMap()

function render () {
  if (options.timed) { /* Draw timer */ }

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
      default:
        return '?'
      }
    })
  })

  const $table = document.createElement('table')
  for (let x = 0; x < idMap.length; x++) {
    const row = document.createElement('tr')
    for (let y = 0; y < idMap[x].length; y++) {
      const cell = document.createElement('td')
      cell.textContent = idMap[x][y]

      cell.addEventListener('click', () => {
        const tile = Game.map[x][y]
        if (tile.state === 'flagged') return
        Game.reveal([x, y])
        render()
      })

      cell.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        const tile = Game.map[x][y]
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
