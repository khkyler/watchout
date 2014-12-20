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
  numEnemies: 15,
  enemyRadius: 10,
  playerRadius: 20
};

var gameStats = {
  score: 0,
  highScore: 0
}


// add an svg elememnt with defined height and width
var svg = d3.select('body').append('svg')
          .attr('width', gameOptions.width)
          .attr('height', gameOptions.height)
          .attr('class', 'board');



var distance = function(enemyObj) {
  // note: datum() might not be correct...
  var playerX = d3.selectAll('.player').datum().cx;
  var playerY = d3.selectAll('.player').datum().cy;
  // console.log('x:',playerX,'y:',playerY);
  return Math.sqrt( Math.pow(enemyObj.cx - playerX,2)+Math.pow(enemyObj.cy - playerY,2));
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
  //attach a on drag click handler that calls our drag move function
}

var drag = d3.behavior.drag().on("drag", dragMove);
//define drag behavior


//define a function that updates the x,y position of our player



// d3.selectAll('.player').on('click', function(){
//   console.log(d3.event);
// });

d3.select('svg').selectAll('.enemy').data(getEnemies())
  .enter().append('circle').attr('class', 'enemy')
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r});

//why is the location of this code affecting the drag behavoir???
svg.selectAll('.player').data([{cx: gameOptions.width / 2, cy:gameOptions.height / 2, r: gameOptions.playerRadius}]).enter().append('circle')
  .attr('class', 'player')
  .attr('cx', function(d){return d.cx})
  .attr('cy', function(d){return d.cy})
  .attr('r', function(d){return d.r})
  .attr('fill','red').call(drag);

setInterval(function(){
  d3.select('svg').selectAll('.enemy').data(getEnemies())
    .transition().duration(1000).tween('checkCollision', function (data){

      return function(t){
        console.log(t);
        // We might need to interpolate the x,y position of the enemy, instead of actually retrieving it
        if (distance(data) < (15)){
          debugger;
        console.log('collision');
          //call updateScoreBoard
        }
      }
    })
    .attr('cx', function(d){return d.cx})
    .attr('cy', function(d){return d.cy})
    .attr('r', function(d){return d.r});
}, 1000);


// collision detection??
  //
  //
  //

// calcalate distance between player and the enemy
// data obj will be the data object for each enemy that will be passed to the function











