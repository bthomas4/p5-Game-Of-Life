let grid;
let next;
let cols;
let rows;

let resolution = 10;
let bias = 0.3
 
let paused = false;
let pauseButton;
let resetButton;
let infoButton;
let codeButton;

function setup() {
  frameRate(12); 
  createCanvas(windowWidth, windowHeight);
  initGrids(); // Initialize the grids
  
  // Create Pause Button
  pauseButton = createButton('Pause');
  pauseButton.position(10, 10);
  pauseButton.mousePressed(togglePause);

  // Create Reset Button
  resetButton = createButton('Reset');
  resetButton.position(10, 40);
  resetButton.mousePressed(initGrids);
  
  // Create Info Button
  infoButton = createButton('Info');
  infoButton.position(10, 70);
  infoButton.mousePressed(() => window.open('https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life', '_blank'));
  
  // Create Code Button
  codeButton = createButton('Code');
  codeButton.position(10, 100);
  codeButton.mousePressed(() => window.open('https://editor.p5js.org/bthomas4/sketches/RW9155jOR', '_blank'));
}

function draw() {
  if (paused) {
    return; // Skip the draw loop if paused
  }
  
  background(239, 235, 216);
  
  // Draw the current grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (grid[i][j] == 1) { 
        fill(230, 225, 195);
        stroke(230, 225, 195);
        rect(x, y, resolution, resolution);
      }
    }
  }
  
  // Compute the next generation
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let sum = count(grid, i, j);
      let state = grid[i][j];
      if (state == 0 && sum == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (sum < 2 || sum > 3)) {
        next[i][j] = 0;
      } else { 
        next[i][j] = grid[i][j];
      }
    }
  }
  
  // Swap the grids
  let tmp = grid;
  grid = next;
  next = tmp;
}

function initGrids() {
  cols = floor(width / resolution);
  rows = floor(height / resolution);
  
  grid = make2DArray(cols, rows);
  next = make2DArray(cols, rows);
  
  // Initialize the grid with random values (0 or 1)
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = random() < bias ? 1 : 0
    }
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols); 
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function count(grid, x, y) {
  let sum = 0;
  // Count the number of live neighbors
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y]; // Subtract the cell itself from the sum
  return sum;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); 
  initGrids(); 
}

function mouseDragged() { 
  let i = floor(mouseX / resolution); 
  let j = floor(mouseY / resolution); 
  if (i < cols && j < rows) {
    let x = i * resolution;
    let y = j * resolution;
    if (grid[i][j] == 1) {
      grid[i][j] = 0;
      fill(239, 235, 216);
      stroke(239, 235, 216);
      rect(x, y, resolution, resolution);
      
    } else {
      grid[i][j] = 1;
      fill(230, 225, 195);
      stroke(230, 225, 195);
      rect(x, y, resolution, resolution);
    }
  }
}

function mouseClicked() {
  mouseDragged()
}

// Toggle Pause/Resume
function togglePause() {
  paused = !paused;
  pauseButton.html(paused ? 'Resume' : 'Pause');
}

function keyTyped() {
  // Check for the " " character using key.
  if (key === ' ') {
    togglePause()
  } 
}