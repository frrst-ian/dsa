// Function to find the shortest path for a knight's move
function knightMoves(start, end) {
    // Create an 8x8 chessboard, initially all squares are unvisited (false)
    const board = Array(8).fill().map(() => Array(8).fill(false));
    
    // Initialize queue with the starting position
    // Each element in the queue is a path (array of positions)
    const queue = [[start]];
    
    // All possible moves a knight can make
    const moves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
    ];
  
    // Continue while there are paths to explore
    while (queue.length > 0) {
      // Get the next path to explore
      const path = queue.shift();
      // Get the last position in this path
      const [x, y] = path[path.length - 1];
  
      // If we've reached the target position
      if (x === end[0] && y === end[1]) {
        // Print the number of moves and the path
        console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
        path.forEach(coord => console.log(coord));
        // Return the successful path
        return path;
      }
  
      // Explore all possible moves from the current position
      for (let [dx, dy] of moves) {
        // Calculate the new position
        const newX = x + dx;
        const newY = y + dy;
  
        // If the new position is valid and unvisited
        if (isValidMove(newX, newY) && !board[newX][newY]) {
          // Mark the new position as visited
          board[newX][newY] = true;
          // Add the new path (including this new position) to the queue
          queue.push([...path, [newX, newY]]);
        }
      }
    }
  
    // If we've explored all possibilities and haven't found the target
    return null;
  }
  
  // Helper function to check if a move is within the chessboard
  function isValidMove(x, y) {
    // Check if x and y are both within 0-7 (inclusive)
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }
  
  // Test cases
  console.log(knightMoves([0,0], [1,2]));
  console.log(knightMoves([0,0], [3,3]));
  console.log(knightMoves([3,3], [0,0]));
  console.log(knightMoves([0,0], [7,7]));
  console.log(knightMoves([3,3], [4,3]));