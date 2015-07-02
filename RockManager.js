var RockManager = function()
{
	this.rocks = [];
	this.currentLevel = 0;
	this.rocksPerWaveModifier = 0.5;
	this.rocksPerWave = 25;
	this.waveTimer = 0;
	this.newWaveReady = 30;
	this.waveTimerDecr = 10;
	this.maxRocksPerWave = 250;
	this.maxRocksOverall = 500;
	this.potentialScore = 0;
	this.numKilledOnPrevWave = 0;
	this.gameOver = false;
};

RockManager.prototype.generateWave = function(playerRef)
{
	if (this.rocks.length > this.maxRocksOverall)
	{
		return;
	}
	
	for (var i = 0; i < this.rocksPerWave; ++i)
	{
		var tempPos = new Vector2();
	                  //min = 100 max = canvas.width - 150
		tempPos.set(100 + Math.random() * (canvas.width - 250), 
					  //min = -canvas.height * 0.5 max = 0
					  -canvas.height * 0.25 + Math.random() * (-canvas.height * 0.25));
	    var tempRock = new Rock(tempPos);
		this.rocks.push(tempRock);
	}
	
	var removed = 10;
	while (removed >= 5)
	{
		removed = this.moveIntersectingRocks();
	}
	
	for (var i = 0; i < removed; ++i)
	{
		var tempPos = new Vector2();
	                  //min = 100 max = canvas.width - 150
		tempPos.set(100 + Math.random() * (canvas.width - 250), 
					  //min = -canvas.height * 0.5 max = 0
					  -canvas.height * 0.5 + Math.random() * (-canvas.height * 0.5));
	    var tempRock = new Rock(tempPos);
		this.rocks.push(tempRock);
	}
	
	this.currentLevel++;
	this.newWaveReady -= this.waveTimerDecr;
	this.newWaveReady += this.numKilledOnPrevWave * 0.5;
	
	this.rocksPerWave = this.currentLevel * this.rocksPerWaveModifier * ((playerRef.currentMaxHealth * this.currentLevel) - playerRef.currentHealth);
	if (this.rocksPerWave > this.maxRocksPerWave)
	{
		this.rocksPerWave = 250;
	}
	
	this.numKilledOnPrevWave = 0;
};

RockManager.prototype.moveIntersectingRocks = function()
{
	var numRemoved = 0;
	for (var i = 0; i < this.rocks.length; ++i)
	{
		for (var j = 0; j < this.rocks.length; ++j)
		{
			if (this.rocks[i] === this.rocks[j] || typeof this.rocks[i] === "undefined" || typeof this.rocks[j] === "undefined")
			{
				continue;
			}
			
			if (this.rocks[i].intersects(this.rocks[j].position.x, this.rocks[j].position.y, this.rocks[j].dimensions.x, this.rocks[j].dimensions.y))
			{
				this.rocks.splice(i, 1);
				this.rocks.splice(j, 1);
				
				numRemoved++;
			}
		}
	}
	
	return numRemoved;
};

RockManager.prototype.reset = function()
{
	this.rocks = [];
	this.currentLevel = 0;
	this.rocksPerWaveModifier = 0.1;
	this.rocksPerWave = 0;
	this.waveTimer = 0;
	this.newWaveReady = 30;
	this.waveTimerDecr = 2;
	this.maxRocksPerWave = 250;
	this.maxRocksOverall = 500;
	this.potentialScore = 0;
	this.numKilledOnPrevWave = 0;
	this.gameOver = false;
};

RockManager.prototype.update = function(deltaTime, playerRef)
{
	if (typeof playerRef === "undefined")
	{
		return;
	}

	if (this.newWaveReady <= 0)
	{
		this.gameOver = true;
	}
	
	this.waveTimer += deltaTime;
	if (this.waveTimer > this.newWaveReady)
	{
		this.waveTimer = 0;
		this.generateWave(playerRef);
	}

	for (var i = 0; i < this.rocks.length; ++i)
	{
		this.rocks[i].update(deltaTime);
		if (this.rocks[i].intersects(playerRef.position.x, playerRef.position.y, playerRef.dimensions.x, playerRef.dimensions.y))
		{
			this.rocks[i].alive = false;
			playerRef.currentHealth -= this.rocks[i].damageCaused;
			playerRef.currentScore += this.rocks[i].scoreValue * 0.5;
			this.numKilledOnPrevWave++;
		}
	}
	
	for (var i = 0; i < this.rocks.length; ++i)
	{
		if (!this.rocks[i].alive)
		{
			this.potentialScore += this.rocks[i].scoreValue;
			this.rocks.splice(i, 1);
		}
	}
};

RockManager.prototype.createSmallRocks = function(numberOfRocks, startPosition)
{
	for (var i = 0; i < numberOfRocks; ++i)
	{
		var tempPos = new Vector2(startPosition.x + i * 10 * (Math.random() * 2 - 1), startPosition.y + i * 10 * (Math.random() * 2 - 1));
		var tempRock = new Rock(tempPos);
		tempRock.velocity.set(Math.random() * 20 - 10, Math.random() * 20 - 10);
		this.rocks.push(tempRock);
	}
};

RockManager.prototype.draw = function()
{
	for (var i = 0; i < this.rocks.length; ++i)
	{
		this.rocks[i].draw();
	}
	
	context.fillText("Current level: " + this.currentLevel, 5, 50, 200);
	context.fillText("Rocks per wave: " + Math.floor(this.rocksPerWave), 5, 70, 200);
	context.fillText("Rocks left: " + this.rocks.length, 5, 90, 200);
	context.fillText("Time left: " + Math.floor(this.newWaveReady - this.waveTimer), 5, 110, 200);
	context.fillText("Potential score: " + Math.floor(this.potentialScore), 5, 130, 200);
	context.fillText("Kills on prev wave: " + Math.floor(this.numKilledOnPrevWave), 5, 190, 200);
};
