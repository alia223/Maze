function a_star() {
  if(open_set.length > 0) {
    evaluate_open_set();
  }
  else {
    noLoop();
    return;
  }
}

function evaluate_open_set() {
  var winner_idx = 0;
  for(var i = 0;i < open_set.length;i++) {
    if(open_set[i].f < open_set[winner_idx].f) {
      winner_idx = i;
    }
  }
  nCurrent = open_set[winner_idx];
  if(nCurrent === end) {
    solve= false;
    noLoop();
    return;
  }
  remove_from_array(open_set, nCurrent);
  closed_set.push(nCurrent);
  for(var i = 0;i < columns;i++) {
    for(var j = 0;j < rows;j++) {
      grid[i][j].addNeighbours();
    }
  }
  var pathNeighbours = nCurrent.pathNeighbours;
  for(var i = 0;i < pathNeighbours.length;i++) {
    var neighbour = pathNeighbours[i];
    if(!closed_set.includes(neighbour)) {
      var tentative_g = nCurrent.g + 1;
      var newPath = false;
      if(open_set.includes(neighbour)) {
        if(tentative_g < neighbour.g) {
          neighbour.g = tentative_g;
          newPath = true;
        }
      }
      else {
        neighbour.g = tentative_g;
        newPath = true;
        open_set.push(neighbour);
      }
      if(newPath) {
        neighbour.h = heuristic(neighbour, end);
        neighbour.f = neighbour.g + neighbour.h;
        neighbour.previous = nCurrent;
      }
    }
  }
}
