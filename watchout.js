// start slingin' some d3 here.

// we need to generate our data set of enemies
// we need a function that generates an object for each enemy with a random x, y position
  // the array will be an array of objects
// add our enemies to the svg with a random x,y
// update enemy positions (random)
// call setTimeout every x amount of ms, and update the position
// 'instantiate' our player and put player in the center of the board to begin with
  // player needs to have functionality, collision detection, and dragability
// calculate score and update to the screen (high score and current score)
// css for
//
//
//
//
// [notes]: properties for enemy (cx, cy, r)
// [notes]: look into the transform/translate svg property for the player circle movement
// [notes]: look into tweens for killer transitions????

var gameOptions = {
  width: 500,
  height: 500,
  numEnemies: 20,
  enemyRadius: 10,
  playerRadius: 20
};

var gameStats = {
  score: 0,
  highScore: 0,
  collisions: 0
}


// add an svg elememnt with defined height and width
var svg = d3.select('body').append('svg')
          .attr('width', gameOptions.width)
          .attr('height', gameOptions.height)
          .attr('class', 'board');

var updateScore = function(){
  gameStats.score = 0;
  gameStats.collisions++;
};

var updateScore_throttled = _.throttle(updateScore, 1000, {trailing:false});

var checkCollision = function(x,y) {
  //console.log('x', x,'y',y)
  var playerX = d3.selectAll('.player').datum().cx;
  var playerY = d3.selectAll('.player').datum().cy;
  // console.log('x:',playerX,'y:',playerY);
  var distance = Math.sqrt( Math.pow(x - playerX,2)+Math.pow(y - playerY,2));
  if (distance < gameOptions.enemyRadius + gameOptions.playerRadius){
    //update scoreboard
    updateScore_throttled();
  }
};

var getEnemies = function() {
  var arr = [];
  var r = gameOptions.enemyRadius;
  for ( var i = 0; i < gameOptions.numEnemies; i++ ) {
    var cx = Math.random() * gameOptions.width;
    var cy = Math.random() * gameOptions.height;
    arr.push({cx:cx, cy:cy, r:r});
  }

  return arr;
};

var dragMove = function(){

  var x = d3.event.x;
  var y = d3.event.y;
  d3.select('.player').data([{cx: x, cy:y, r: gameOptions.playerRadius}])
    .attr('cx', x).attr('cy', y);
}

//define drag behavior
var drag = d3.behavior.drag().on("drag", dragMove);


d3.select('svg').selectAll('.enemy').data(getEnemies())
  .enter().append('circle').attr('class', 'enemy')
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r});

//why is the location of this code affecting the drag behavoir???
svg.selectAll('.player').data([{cx: gameOptions.width / 2, cy:gameOptions.height / 2, r: gameOptions.playerRadius}])
  .enter().append('circle')
  .attr('class', 'player')
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r})
  .attr('fill','red').call(drag);

setInterval(function(){
  d3.select('svg').selectAll('.enemy').data(getEnemies())
    .transition().duration(1000)
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('r', function(d){return d.r});
}, 1000);

// this will check for collisions, and
setInterval(function(){
  d3.selectAll('.enemy')
  .attr('', function(d){checkCollision(d3.select(this).attr('cx'), d3.select(this).attr('cy'))});

  //updates score
  gameStats.score += 1;

  if ( gameStats.highScore < gameStats.score ) {
    gameStats.highScore = gameStats.score
  }

  // updates the score span
  d3.selectAll('.current').selectAll('span').text(""+ Math.floor(gameStats.score/20));
  d3.selectAll('.high').selectAll('span').text(""+ Math.floor(gameStats.highScore/20));
  d3.selectAll('.collisions').selectAll('span').text(""+ gameStats.collisions);



},1);












