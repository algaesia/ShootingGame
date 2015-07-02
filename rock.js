var Rock = function(otherPosition)
{
	this.image = document.createElement("img");
	this.image.src = "square" + Math.floor(Math.random() * 4) + ".png";
	
	this.position = new Vector2();
	this.position.set(otherPosition.x, otherPosition.y);
	
	this.movementSpeed = new Vector2();
	this.movementSpeed.set(100 + Math.random() * 100, 100 + Math.random() * 100);
	
	this.velocity = new Vector2();
	this.velocity.set(0,
	                  //min: 0 max; 10
	                  Math.random() * 10 * this.movementSpeed.y);
	
	this.maxVelocity = 2;
	
	this.minScoreValue = 10;
	this.maxScoreValue = 20;
	this.scoreValue = this.minScoreValue + Math.random() * (this.maxScoreValue - this.minScoreValue);
	
	this.size = 64;
	this.dimensions = new Vector2();
	this.dimensions.set((this.scoreValue / this.maxScoreValue) * this.size, 
	                    (this.scoreValue / this.maxScoreValue) * this.size);
	
	this.damagePerPointModifier = 1.5;
	this.damageCaused = this.scoreValue * this.damagePerPointModifier;

	this.alive = true;
};

Rock.prototype.update = function(deltaTime)
{
	if (this.alive)
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
		
		if (this.checkOffscreen() || this.velocity.length < 0.01)
		{
			this.alive = false;
			this.position.set(-5000, -5000);
		}
	}
};

Rock.prototype.draw = function()
{
	if (this.alive)
	{
		context.save();
		context.translate(this.position.x, this.position.y);
		context.drawImage(this.image, -this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
		context.restore();
	}
};

Rock.prototype.checkOffscreen = function()
{
	if (this.position.x < this.dimensions.x * 0.5 ||
	    this.position.x + this.dimensions.x * 0.5 > canvas.width ||
		this.position.y + this.dimensions.y * 0.5 > canvas.height)
	{
		return true;
	}
	return false;
};

Rock.prototype.intersects = function(otherX, otherY, otherWidth, otherHeight)
{
	if ((this.position.x - this.dimensions.x * 0.5 < otherX + otherWidth * 0.5) &&
	    (this.position.x + this.dimensions.x * 0.5 > otherX - otherWidth * 0.5) &&
		(this.position.y - this.dimensions.y * 0.5 < otherY + otherHeight * 0.5) &&
        (this.position.y + this.dimensions.y * 0.5 > otherY - otherHeight * 0.5))
    {
		return true;
    }	
	return false;
};

Rock.prototype.moveOffscreen = function()
{
	this.position.set(-1000, -1000);
};
