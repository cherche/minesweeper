import Game from './game.js'

window.Game = Game

const options = {
  width: 9,
  height: 9,
  numOfBombs: 10,
  timed: false
}

Game.generateMap()

function render () {
  if (options.timed) { /* Add timer */ }

  const map = Game.map.map((row, x) => {
    return row.map(tile => (tile.state === 'revealed') ? tile.id : '?')
  })

  document.body.innerHTML = ''
  map.forEach(row => document.body.innerHTML += row.join('') + '<br>')
}

window.reveal = (coords) => {
  Game.reveal(coords)

  render()
}

render()
