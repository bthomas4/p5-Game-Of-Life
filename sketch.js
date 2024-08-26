let grid
let cols
let rows
let resolution = 10


function setup() {
  frameRate(15)
  createCanvas(400, 400)
  cols = width / resolution
  rows = height / resolution
  
  grid = make2DArray(cols, rows)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2))
    }
  }
}

function draw() {
  background(0)
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution
      let y = j * resolution
      if (grid[i][j] ==1) {
        fill(255)
        stroke(0)
        rect(x, y, resolution-1, resolution-1);
      }
    }
  }
  
    let next = make2DArray(cols, rows)
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let sum = count(grid, i, j)
      let state = grid[i][j]
      if (state == 0 && sum == 3) {
        next[i][j] = 1
      } else if (state == 1 && (sum < 2 || sum > 3)) {
        next[i][j] = 0
      } else {
        next[i][j] = grid[i][j]
      }
    }
  }
  
  grid = next
  
  
}

function make2DArray(cols, row) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
  }
  return arr
}

function count(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x+i+cols) % cols
      let row = (y+j+ rows) % rows
      sum += grid[col][row]
    }
  }
  sum -= grid[x][y]
  return sum;
}