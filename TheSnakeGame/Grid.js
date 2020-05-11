class Grid {
  constructor(cellSize) {
    this.cellSize = cellSize;
    this.cols = floor(width/cellSize);
    this.rows = floor(height/cellSize);
  }

  draw() {
    for (var column = 0; column < this.cols; column++) {
       for (var row = 0; row < this.cols; row++) {
          rect(column * this.cellSize + 1, row * this.cellSize + 1, this.cellSize - 1, this.cellSize - 1);
       }
    }
  }

}
