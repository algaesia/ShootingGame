var Projectile = function(otherPosition, otherVelocity, otherDamageValue)
{
	this.image = document.createElement("img");
	this.image.src = "redSquare.png";

	this.position = new Vector2();
	this.position.set(otherPosition.x, otherPosition.y);
	
	this.dimensions = new Vector2();
	this.dimensions.set(8, 8);
	
	this.startPosition = new Vector2();
	this.startPosition.set(this.position.x, this.position.y);
	
	this.velocity = new Vector2();
	this.maxVelocity = 20;
	this.movementSpeed = new Vector2();
	this.movementSpeed.set(500, 500);
	this.velocity.set(otherVelocity.x * this.movementSpeed.x, otherVelocity.y * this.movementSpeed.y);
	
	this.damageValue = otherDamageValue;
	
	this.alive = true;
};

Projectile.prototype.checkBoundaries = function()
{
	if (this.position.x < this.dimensions.x * 0.5 ||
	    this.position.x + this.dimensions.x * 0.5 > canvas.width ||
		this.position.y < this.dimensions.y * 0.5 ||
	    this.position.y + this.dimensions.y * 0.5 > canvas.height)
	{
		this.alive = false;
	}
};

Projectile.prototype.intersects = function(otherX, otherY, otherWidth, otherHeight)
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

Projectile.prototype.update = function(deltaTime)
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
		
		this.checkBoundaries();
	}
};

Projectile.prototype.draw = function()
{
	if (this.alive)
	{
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
		context.restore();
	}
};

Projectile.prototype.moveOffscreen = function()
{
	this.position.set(-1000, -1000);
};
