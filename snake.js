$(document).ready(function(){
	var gameLoop;
	var keepPlaying = true;
	snake = new Snake();
	render();	
	
	
	
	gameLoop =	setInterval(function(){ 
		redraw();
		if(move()==false){			
			clearInterval(gameLoop);
		}
						
	
	}, 100);

	$(document).keydown(function(event){ 
		switch(event.which){
			//left
			case 37:
				snake.direction = "left";
				break;
			//up
			case 38:
				snake.direction = "up";
				break;
			//right
			case 39:
				snake.direction = "right";
				break;
			//down
			case 40:
				snake.direction = "down";
				break;
		}
		console.log(snake.direction);
    });								
	
});

var grid = [];

function Snake() {
	this.initialPosition=  [20,20],
	this.direction=  "right",
	this.currentPosition= [[20,20],[20,19],[20,18],[20,17],[20,16]];
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
		for(i=0;i<grid.length;i++){
			for(j=0;j<40;j++){
				var htmlstring = '<div id = "'+ grid[i][j].id+ '" class = "'+grid[i][j].cssclass+'"> </div>';
				$(grid[i][j].container).append($(htmlstring));		
			}			
		}		
};

function move(){
	var tempSnake = snake.currentPosition[0].slice();
	console.log(tempSnake);	
	if(snake.currentPosition[0][1] >= 41 || snake.currentPosition[0][1] <0 || snake.currentPosition[0][0] >40 || snake.currentPosition[0][0] <0 ){
			return false;
	}
	switch(snake.direction){
		case "right":						
			//snake.currentPosition[0][1] += 1;
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
		console.log("#" + currentGrid.x+"x"+currentGrid.y);	
		currentCell.addClass('active');				
	}
	}
	
	
}