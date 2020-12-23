function setup() {
  createCanvas(400, 400);
  frameRate(5);
  columns = floor(width / w);
  rows = floor(height / w);
  for(var i = 0;i < columns;i++) {
    grid[i] = new Array(rows);
  }
  for(var i = 0;i < columns;i++) {
    for(var j = 0;j < rows;j++) {
      grid[i][j] = new Cell(i, j);
    }
  }
  current = grid[0][0];
  start = grid[0][0];
  end = grid[columns-1][rows-1];
  open_set.push(start);
  nCurrent = grid[0][0];
}

function draw() {
  background(255);
  end.showPath(color(0, 255, 0));
  for(var j = 0;j < columns;j++) {
    for(var i = 0;i < rows;i++) {
      grid[i][j].show(0);
    }
  }
  current.visited = true;
  current.highlight();
  var next = current.checkNeighbours();
  if(next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  }
  else if(stack.length > 0) {
    current = stack.pop();
  }
  if(stack.length == 0 && solve) {
    document.getElementById('wait-msg').innerHTML = "";
    a_star();
    display();
  }
  else if(stack.length != 0 && solve) {
    solve = false;
    document.getElementById('wait-msg').innerHTML = "Please wait until the maze has been generated!";
  }
}
