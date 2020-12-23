var columns, rows;
var w = 40;
var grid = [];
var nCurrent, current = [];
var stack = [];
var path = [];
var open_set = [];
var closed_set = [];
var start, end = [];
var count = 0;
var solve = false;
function removeWalls(a, b) {
  var x = a.i - b.i;
  if(x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  }
  else if(x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  var y = a.j - b.j;
  if(y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  }
  else if(y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

function display() {
  for(var i = 0;i < open_set.length;i++) {
    open_set[i].showPath(color(255));
  }

  for(var i = 0;i < closed_set.length;i++) {
    closed_set[i].showPath(color(255));
  }

  path = [];
  var temp = nCurrent;
  path.push(temp);
  while(temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }

  for(var i = 0;i < path.length;i++) {
    if(i === 0) {
      path[i].showPath(color(0, 255, 0));
    }
    else if(i === path.length - 1) {
      path[i].showPath(color(0, 0, 0));
    }
    else {
      path[i].showPath(color(255, 0, 0));
    }
  }
}

function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function remove_from_array(arr, elem) {
  for(var i = arr.length - 1;i>=0;i--) {
    if(arr[i] == elem) {
      arr.splice(i,1);
    }
  }
}

function reset() {
  end = grid[columns-1][rows-1];
  start.wall = false;
  end.wall = false;
  open_set = [];
  open_set.push(start);
  closed_set = [];
  nCurrent = [];
}

function solveClicked() {
  solve = true;
}
