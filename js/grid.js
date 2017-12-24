export function getAdjacents (width, height, [x1, y1]) {
  const adjacent = []

  const ranges = {
    x: [x1 - 1, x1 + 1],
    y: [y1 - 1, y1 + 1],
  }

  // Look within the range, but exclude anything
  // outside of the map boundaries
  for (let y2 = ranges.y[0]; y2 <= ranges.y[1]; y2++) {
    if (y2 < 0 || y2 >= height) continue
    for (let x2 = ranges.x[0]; x2 <= ranges.x[1]; x2++) {
      if (x2 < 0 || x2 >= width) continue
      adjacent.push([x2, y2])
    }
  }

  return adjacent
}
