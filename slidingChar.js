var SlidingChar = function(characterValue, position)
{
	this.characterValue = characterValue;
	this.position = new Vector2();
	this.position.set(position.x, position.y);
	this.startPosition = new Vector2();
	this.startPosition.set(this.position.x, this.position.y);
	this.maxDistanceFromStart = 500;
	this.distanceFromStart = 0;
	this.minMovementSpeed = 0.1;
	this.maxMovementSpeed = 5;
	this.movementSpeed = this.minMovementSpeed + Math.random() * (this.maxMovementSpeed - this.minMovementSpeed);
	this.velocity = new Vector2(0, Math.random() * this.movementSpeed);
	this.maxVelocity = 5;
	
	this.pauseBeforeFallTimer = 0;
	this.minFallReady = 2;
	this.maxFallReady = 5;
	this.fallReady = this.minFallReady + Math.random() * (this.maxFallReady - this.minFallReady);
	this.alive = true;
};

SlidingChar.prototype.update = function(deltaTime)
{
	if (this.alive)
	{
		this.pauseBeforeFallTimer += deltaTime;
	
		if (this.pauseBeforeFallTimer > this.fallReady)
		{
			if (this.velocity.length() > 0)
			{
				var mag = this.velocity.length();
				var temp = this.velocity.normalised();
				var minVal = Math.min(mag, this.maxVelocity);
				temp.multiply(minVal);
				this.velocity = temp;
			}
			this.position.add(this.velocity);
		}
		
		if (this.isOffscreen() || this.distanceFromStart > this.maxDistanceFromStart - 10)
		{
			this.alive = false;
		}
	}
};

SlidingChar.prototype.draw = function()
{
	if (this.alive)
	{
		context.save();
		this.distanceFromStart = Math.sqrt((this.startPosition.x - this.position.x) * (this.startPosition.x - this.position.x) +
									  (this.startPosition.y - this.position.y) * (this.startPosition.y - this.position.y));
		var ratio = this.distanceFromStart / this.maxDistanceFromStart;
		context.globalAlpha = 1 - ratio;
		
		context.fillText(this.characterValue, this.position.x, this.position.y, 10);
		context.restore();
	}
};

SlidingChar.prototype.isOffscreen = function()
{
	if (this.position.x < 0 ||
	    this.position.x > canvas.width ||
		this.position.y < 0 ||
		this.position.y > canvas.height + 50)
	{
		this.pauseBeforeFallTimer = 0;
		return true;
	}
	return false;
};

var SlidingWord = function(slidingWord, position)
{
	this.word = [];
	for (var i = 0; i < slidingWord.length; ++i)
	{
		this.word[i] = new SlidingChar(slidingWord[i], new Vector2(position.x + i * 10, position.y));
	}
};

SlidingWord.prototype.update = function(deltaTime)
{
	for (var i = 0; i < this.word.length; ++i)
	{
		this.word[i].update(deltaTime);
	}
	
	for (var i = 0; i < this.word.length; ++i)
	{
		if (!this.word[i].alive)
		{
			this.word.splice(i, 1);
		}
	}
};

SlidingWord.prototype.draw = function()
{
	for (var i = 0; i < this.word.length; ++i)
	{
		this.word[i].draw();
	}	
};

SlidingWord.prototype.isOffscreen = function()
{
	var counter = 0;
	for (var i = 0; i < this.word.length; ++i)
	{
		if (this.word[i].isOffscreen() || !this.word[i].alive)
		{
			counter++;
		}
	}
	
	if (counter == this.word.length)
	{
		return true;
	}
	return false;
};
