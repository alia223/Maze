function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.previous = undefined;
  this.walls = [true, true, true, true];
  this.visited = false;
  this.neighbours = [];
  this.pathNeighbours = [];
  this.addNeighbours = function() {
    var i = this.i;
    var j = this.j;
    if(j > 0 && !this.walls[0]) this.pathNeighbours.push(grid[i][j - 1]);
    if(i < columns - 1 && !this.walls[1]) this.pathNeighbours.push(grid[i + 1][j]);
    if(j < rows - 1 && !this.walls[2]) this.pathNeighbours.push(grid[i][j + 1]);
    if(i > 0 && !this.walls[3]) this.pathNeighbours.push(grid[i - 1][j]);
  }

  this.checkNeighbours = function() {
    var neighbours = [];

    var top;
    var right;
    var bottom;
    var left;

    if(i > 0) {
      top = grid[i - 1][j];
    }
    else {
      top = -1;
    }
    if(i < columns - 1) {
      right = grid[i + 1][j];
    }
    else {
      right = -1;
    }
    if(j < rows - 1) {
      bottom = grid[i][j + 1];
    }
    else {
      bottom = -1;
    }
    if(j > 0) {
      left =  grid[i][j - 1];
    }
    else {
      left = -1;
    }

    if(top !== -1 && !top.visited) {
      neighbours.push(top);
    }
    if(right !== -1 && !right.visited) {
      neighbours.push(right);
    }
    if(bottom !== -1 && !bottom.visited) {
      neighbours.push(bottom);
    }
    if(left !== -1 && !left.visited) {
      neighbours.push(left);
    }


    if(neighbours.length > 0) {
      var r = floor(random(0, neighbours.length));
      return neighbours[r];
    }
    else {
      return undefined;
    }
  }

  this.highlight = function() {
      var x = this.i * w;
      var y = this.j * w;
      noStroke();
      fill(0, 0, 0);
      rect(x+10, y+10, w/2, w/2);
  }

  this.show = function(colour) {
    var x = this.i * w;
    var y = this.j * w;
    stroke(colour);
    if(this.walls[0]) {
      line(x, y, x + w, y);
    }
    if(this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if(this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if(this.walls[3]) {
      line(x, y + w, x, y);
    }
  }

  this.showPath = function(colour) {
    fill(colour);
    noStroke();
    rect((this.i*w)+10, (this.j*w)+10, (w-1)/2, (w-1)/2);
  }
}
