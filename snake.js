$(document).ready(function(){
	var gameLoop;
	var keepPlaying = true;
	var currentFood;
	var score = 0;
	
	snake = new Snake();
	render();
	currentFood = makeFood();
	$(currentFood).addClass('food');
	gameLoop =	setInterval(function(){ 
		var headID = "#" + (snake.currentPosition[0][0]+1)+"x"+(snake.currentPosition[0][1]+1);
		redraw();

		if(currentFood == headID){
			//increment score
			score += 1;
			var scorestring = 'Score: ' + score;
			$('#score').text(scorestring);

			//make new food
			$(currentFood).removeClass('food');
			currentFood = makeFood();
			$(currentFood).addClass('food');
			
			//add body segment
			snake.currentPosition.push([snake.currentPosition[0][0],snake.currentPosition[0][0]]);
		}
		if(move()==false){			
			clearInterval(gameLoop);
		}						
	
	}, 100);

	$(document).keydown(function(event){ 
		switch(event.which){
			//left
			case 37:
				if (snake.direction != "right"){
					snake.direction = "left";
				}
				break;
			//up
			case 38:
				if (snake.direction != "down"){
					snake.direction = "up";
				}
				break;
			//right
			case 39:
				if (snake.direction != "left"){
					snake.direction = "right";
				}
				break;
			//down
			case 40:
				if (snake.direction != "up"){
					snake.direction = "down";
				}
				break;
		}
    });								
	
});

var grid = [];

function Snake() {
	this.initialPosition=  [20,20],
	this.direction=  "right",
	this.currentPosition= [[20,20]];//,[20,19],[20,18],[20,17],[20,16]];
	
}

function Square(x, y) {	
	this.state = ".inactive";
	this.container = '.grid';
	this.x = x+1;
	this.y = y+1;
	this.id = ""+ (x+1) + "x"+(y+1);
	this.cssclass ="cell";
};


for(i=0;i<40;i++){
	var row = [];
	for(j=0;j<40;j++){		
		row.push(new Square(i,j));
	}
	grid.push(row);
}

function render(){
	$('#titleContainer').append($('<h1 id="header">Snake!</h1>'));
		for(i=0;i<grid.length;i++){
			for(j=0;j<40;j++){
				var htmlstring = '<div id = "'+ grid[i][j].id+ '" class = "'+grid[i][j].cssclass+'"> </div>';
				$(grid[i][j].container).append($(htmlstring));		
			}			
		}		
		$('#container').append($('<h3 id="score">Score: 0</h3>'));
};

function move(){
	var tempSnake = snake.currentPosition[0].slice();
	if(snake.currentPosition[0][1] >= 41 || snake.currentPosition[0][1] <0 || snake.currentPosition[0][0] >40 || snake.currentPosition[0][0] <0 ){
			return false;
	}
	switch(snake.direction){
		case "right":
			tempSnake[1] += 1;			
			break;			
		case "left":
			//snake.currentPosition[0][1] -= 1;
			tempSnake[1] -= 1;	
			break;
		case "up":
			//snake.currentPosition[0][0] -= 1;
			tempSnake[0] -= 1;	
			break;
		case "down":
			//snake.currentPosition[0][0] += 1;
			tempSnake[0] += 1;	
			break;			
	}			

	snake.currentPosition.unshift(tempSnake);
	snake.currentPosition.pop();		
	return true;
		
		
}
function redraw(){
	if(snake.currentPosition[0][1] < 40 && snake.currentPosition[0][1] >=0 && snake.currentPosition[0][0] <40 && snake.currentPosition[0][0] >=0 ){
	$('.cell').removeClass('active');	
	
	for(s = 0; s<snake.currentPosition.length;s++){	
		var currentGrid = grid[snake.currentPosition[s][0]][snake.currentPosition[s][1]];
		var currentCell	= $("#" + currentGrid.x+"x"+currentGrid.y);
		//console.log("#" + currentGrid.x+"x"+currentGrid.y);	
		currentCell.addClass('active');				
	}
	}
	
}
function makeFood(){
	var randomRow = Math.floor(Math.random() * 40)+1;
	var randomColumn = Math.floor(Math.random() * 40)+1;
	var foodCell = "#" + randomRow+"x"+randomColumn;
	//console.log("#" + randomRow+"x"+randomColumn);	
	//foodCell.addClass('food');	
	return foodCell;
}