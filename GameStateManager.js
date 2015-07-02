var GameStateManager = function()
{
	this.gameStates = [];
	this.currentGameState = 0;
};

GameStateManager.prototype.initialiseCurrentState = function()
{
	this.gameStates[this.currentGameState].initialise();
};

GameStateManager.prototype.updateCurrentState = function(deltaTime)
{
	this.gameStates[this.currentGameState].update(deltaTime);
};

GameStateManager.prototype.drawCurrentState = function()
{
	this.gameStates[this.currentGameState].draw();
};

GameStateManager.prototype.changeState = function(state)
{
	if (this.currentGameState < 0 || this.currentGameState > this.gameStates.length)
	{
		return;
	}
	
	this.currentGameState = state;
	this.gameStates[this.currentGameState].initialise();
};

GameStateManager.prototype.addState = function(stateToAdd)
{
	if (typeof stateToAdd === "undefined")
	{
		return;
	}
	
	this.gameStates.push(stateToAdd);
};
