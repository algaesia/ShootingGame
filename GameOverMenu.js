var GameOverMenu = function()
{
	this.initialised = false;
};

GameOverMenu.prototype.initialise = function()
{
	if (!this.initialised)
	{
		this.gameOverWord = new SlidingWord("GAME OVER", new Vector2(canvas.width * 0.35, 50));
	
		this.initialised = true;	
	}
};

GameOverMenu.prototype.update = function(deltaTime)
{
	if (keyboard.isKeyDown(keyboard.KEY_ESCAPE) || this.gameOverWord.isOffscreen())
	{
		gameStateManager.changeState(0);
	}
	
	this.gameOverWord.update(deltaTime);
};

GameOverMenu.prototype.draw = function()
{
	this.gameOverWord.draw();
};