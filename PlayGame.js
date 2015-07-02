var PlayGame = function()
{
	this.initialised = false;	
};

PlayGame.prototype.getMousePos = function(evt)
{
	this.mousePos.set(evt.x - canvas.offsetLeft, evt.y - canvas.offsetTop);
};

PlayGame.prototype.initialise = function()
{
	if (!this.initialised)
	{
		this.firstPlayer = new Player();
		this.rockManager = new RockManager();
	
		this.mousePos = new Vector2();
		
		var self = this;
		canvas.addEventListener('mousedown', function(evt) { self.getMousePos(evt); }, false);
	
		this.initialised = true;
	}
};

PlayGame.prototype.update = function(deltaTime)
{
	this.firstPlayer.update(deltaTime);
	this.rockManager.update(deltaTime, this.firstPlayer);
	
	for (var i = 0; i < this.firstPlayer.gun.projectiles.length; ++i)
	{
		var currentProjectile = this.firstPlayer.gun.projectiles[i];
		if (currentProjectile.alive)
		{
			for (var j = 0; j < this.rockManager.rocks.length; ++j)
			{
				var currentRock = this.rockManager.rocks[j];
				if (currentRock.alive)
				{
					if (currentProjectile.intersects(currentRock.position.x, currentRock.position.y, currentRock.dimensions.x, currentRock.dimensions.y))
					{
						this.firstPlayer.gun.firedHits++;
						currentRock.alive = false;
						currentProjectile.alive = false;						
						this.firstPlayer.currentScore += currentRock.scoreValue;
						var length = currentRock.dimensions.length();
						if (length > currentRock.size)
						{
							this.rockManager.createSmallRocks(2, new Vector2(currentRock.position.x, currentRock.position.y));
						}
						currentRock.moveOffscreen();
						currentProjectile.moveOffscreen();
						this.rockManager.numKilledOnPrevWave++;
					}
				}
			}
		}
	}
	
	if (!this.firstPlayer.alive || this.rockManager.gameOver)
	{
		gameStateManager.changeState(2);
		this.firstPlayer.reset();
		this.rockManager.reset();
	}
};

PlayGame.prototype.draw = function()
{
	this.firstPlayer.draw();
	this.rockManager.draw();
};
