var TitleMenu = function()
{
	this.initialised = false;
};

TitleMenu.prototype.initialise = function()
{
	if (!this.initialised)
	{
		this.titleMenuWord = new SlidingWord("THIS IS THE TITLE MENU", new Vector2(canvas.width * 0.35, 50));
	
		this.initialised = true;
	}
};

TitleMenu.prototype.update = function(deltaTime)
{
	if (keyboard.isKeyDown(keyboard.KEY_ENTER) || this.titleMenuWord.isOffscreen())
	{
		gameStateManager.changeState(1);
	}
	
	this.titleMenuWord.update(deltaTime);
};

TitleMenu.prototype.draw = function()
{
	this.titleMenuWord.draw();
};