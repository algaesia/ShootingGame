var canvas = document.getElementById("gameCanvas");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var context = canvas.getContext("2d");

var keyboard = new Keyboard();
var gameStateManager = new GameStateManager();

gameStateManager.addState(new TitleMenu());
gameStateManager.addState(new PlayGame());
gameStateManager.addState(new GameOverMenu());

gameStateManager.changeState(0);

var fpsTime = 0;
var fpsCount = 0;
var fps = 0;

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();
function getDeltaTime()
{
	endFrameMillis = startFrameMillis;
	
	//returns time in milliseconds
	startFrameMillis = Date.now();
	
	//convert up to seconds -> multiply by 1 / 1000
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;
	if (deltaTime > 1)
	{
		deltaTime = 1;
	}
	return deltaTime;
}

function run()
{	
	var deltaTime = getDeltaTime();
	
	//update cycle
	//update fps counter
	fpsTime += deltaTime;
	fpsCount++;
	if (fpsTime >= 1)
	{
		fpsTime -= 1;
		fps = fpsCount;
		fpsCount = 0;
	}
	
	update(deltaTime);
	draw();
}

function update(deltaTime)
{
	gameStateManager.updateCurrentState(deltaTime);
}

function draw()
{
	//draw background
	context.fillStyle = "#f8fa6f";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//draw fps counter
	context.fillStyle = "#000";
	context.font = "24px Arial";
	context.fillText("FPS: " + fps, 5, 20, 100);
	
	gameStateManager.drawCurrentState();
}

(function() 
{
	var onEachFrame;
	if (window.requestAnimationFrame)
	{
		onEachFrame = function(cb)
		{
			var _cb = function()
			{
				cb();
				window.requestAnimationFrame(_cb);
			}
			_cb();
		};
	}
	else if (window.mozRequestAnimationFrame)
	{
		onEachFrame = function(cb)
		{
			var _cb = function()
			{
				cb();
				window.mozRequestAnimationFrame(_cb);
			}
			_cb();
		};
	}
	else
	{
		onEachFrame = function(cb)
		{
			setInterval(cb, 1000 / 60);
		}
	}
	window.onEachFrame = onEachFrame;
})();

window.onEachFrame(run);
