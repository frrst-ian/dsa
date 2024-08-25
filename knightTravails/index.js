/* eslint-disable no-undef */
function knightMoves(start, end) {
  const board = Array(8)
    .fill()
    .map(() => Array(8).fill(false));

  const queue = [[start]];

  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  while (queue.length > 0) {
    const path = queue.shift();

    const [x, y] = path[path.length - 1];

    if (x === end[0] && y === end[1]) {
      console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
      path.forEach((coord) => console.log(coord));

      return path;
    }
    for (let [dx, dy] of moves) {
      const newX = x + dx;
      const newY = y + dy;
      if (isValidMove(newX, newY) && !board[newX][newY]) {
        board[newX][newY] = true;

        queue.push([...path, [newX, newY]]);
      }
    }
  }
  return null;
}

function isValidMove(x, y) {
  return x >= 0 && x < 8 && y >= 0 && y < 8;
}

console.log(knightMoves([0, 0], [1, 2]));
console.log(knightMoves([0, 0], [3, 3]));
console.log(knightMoves([3, 3], [0, 0]));
console.log(knightMoves([0, 0], [7, 7]));
console.log(knightMoves([3, 3], [4, 3]));
