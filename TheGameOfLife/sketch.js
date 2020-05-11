var isActive = false  ;
var grid;
var mapX;
var mapY;

function setup () {
  createCanvas(400, 400);

   grid = new Grid(20);
   grid.randomize();
   textSize(8);
}

function draw () {
  background(250);
  grid.draw();
  if (isActive) {
    grid.updateNeighborCounts();
    grid.updatePopulation();
  }
  grid.calcLiveCells();
  document.querySelector('.liveCellsCount').textContent =
    `Live Cells: ${grid.liveCells}`;
  
  // Value for findind user selected cell
  mapX = map(mouseX, 0, width, 0, 400, true);
  mapY = map(mouseY, 0, height, 0, 400, true);
}

function mousePressed() {                 
  if (mouseX > 0 && mouseX < 400 && mouseY > 0 && mouseY < 400) {
    console.log("On grid");
    grid.toggleCell(floor(floor(mapX)/grid.cellSize),
        floor(floor(mapY)/grid.cellSize));
  }
}

function keyPressed() {
  if (keyCode === TAB) {
    isActive = !isActive;
  }
  if (keyCode === 82) {
    grid.randomize();
  }
  return false;
}

class Grid {
  constructor (cellSize) {
    // update the contructor to take cellSize as a parameter
    // use cellSize to calculate and assign values for numberOfColumns and numberOfRows
    this.cellSize = cellSize
    this.numberOfColumns = width/cellSize;
    this.numberOfRows = height/cellSize;
    this.liveCells = 0;
    
    this.cells = new Array(this.numberOfColumns);
    for (var i = 0; i < this.cells.length; i++) {
      this.cells[i] = new Array(this.numberOfRows);
    }
    
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row] = new Cell(column, row, this.cellSize)
      }
    }
  }

  draw () {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].draw();
      }
    }
  }
  
  randomize() {
    for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].setIsAlive(floor(random(2)));
      }
    }
  }
  
  updatePopulation() {
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        this.cells[column][row].liveOrDie();
      }
    }
  }
  
  getNeighbors(currentCell) {
    var neighbors = [];
    for (var xOffset = -1; xOffset <= 1; xOffset++) {
      for (var yOffset = -1; yOffset <= 1; yOffset++) {
        var neighborColumn = currentCell.column + xOffset;
        var neighborRow = currentCell.row + yOffset;
        if (neighborColumn === currentCell.column && neighborRow === currentCell.row) {
          //Do nothing
        } else if (this.isValidPosition(neighborColumn, neighborRow)) {
            neighbors.push(this.cells[neighborColumn][neighborRow]);
        }
      }
    }
    return neighbors;
  }
  
  isValidPosition (column, row) {
    if (column < 0 || row < 0) {
      return false;
    } else if (column >= this.numberOfColumns || row >= this.numberOfRows) {
      return false;
    } else {
      return true;
    }
  }
  
  updateNeighborCounts () {
  // for each cell in the grid
  for (var column = 0; column < this.numberOfColumns; column ++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        var cell = this.cells[column][row];
        var neighbors;
        
        cell.liveNeighborCount = 0;
        neighbors = this.getNeighbors(cell);
        
        neighbors.forEach((neighbor) => {
          if (neighbor.isAlive == true) {
            cell.liveNeighborCount += 1;
          }
        });
      }
    }
  }
  
  calcLiveCells() {
    this.liveCells = 0;
    for (var column = 0; column < this.numberOfColumns; column++) {
      for (var row = 0; row < this.numberOfRows; row++) {
        if (this.cells[column][row].isAlive) {
          this.liveCells += 1;
        }
      }
    }
  }
  
  toggleCell(column, row) {
    const cell = this.cells[column][row];
    cell.setIsAlive(!cell.isAlive);
  }
}

class Cell {
  constructor(column, row, size) {
    this.column = column;
    this.row = row;
    this.cellSize = size;
    this.isAlive = false;
    this.liveNeighborCount = 0;
  }
  
  draw () {
    if (this.isAlive == false) {
      fill(240); 
    } else if (isActive  == false) {
      fill(200,200,200);
    } else {
      fill(0,200,200);
    }
    noStroke();
    rect(this.column * this.cellSize + 1, this.row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
    // Show each cell's coordinates (only works with original 20x20 gid)
    fill(0);
    text(this.column, this.column * this.cellSize + 1, this.row * this.cellSize + 20);
    text(this.row, this.column * this.cellSize + 10, this.row * this.cellSize + 20);
  }
  
  setIsAlive(value) {
    if (value == true) {
      this.isAlive = true;
    } else if (value == false) {
      this.isAlive = false;
    } else {
      console.log("Value is not valid, make sure the parameter is set to true or false.");
    }
  }
  
  liveOrDie() {
    var count = this.liveNeighborCount;
    if (this.isAlive == true) {
      if (count < 2) {
        this.setIsAlive(false);
      } else if (count > 3) {this.setIsAlive(false);}
    } else {
      if (count === 3) {
        this.isAlive = true;
      }
    }

  }
  
  
  
}