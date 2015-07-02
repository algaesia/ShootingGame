var Player = function()
{
	this.image = document.createElement("img");
	this.image.src = "blackSquare.png";
	
	this.position = new Vector2();
	this.position.set(canvas.width * 0.5, canvas.height * 0.5);
	
	this.dimensions = new Vector2();
	this.dimensions.set(16, 16);
	
	this.startPosition = new Vector2();
	this.startPosition.set(this.position.x, this.position.y);
	
	this.velocity = new Vector2();
	this.maxVelocity = 5;
	this.velocityDecay = 0.85;
	this.movementSpeed = new Vector2();
	this.movementSpeed.set(10, 10);
	
	this.currentMaxHealth = 100;
	this.currentHealth = this.currentMaxHealth;
	
	this.currentScore = 0;
	
	this.gun = new ProjectileManager();
	this.shootTimer = 0;
	this.shootReady = 0.5;
	
	this.alive = true;
};

Player.prototype.update = function(deltaTime)
{
	if (this.alive)
	{
		this.shootTimer += deltaTime;
	
		if (typeof this.rotation === "undefined")
			this.rotation = 0;
	
		if (keyboard.isKeyDown(keyboard.KEY_LEFT))
		{
			var leftDir = new Vector2();
			leftDir.set(-this.movementSpeed.x, 0);
			this.velocity.add(leftDir);
		}
		
		if (keyboard.isKeyDown(keyboard.KEY_RIGHT))
		{
			var rightDir = new Vector2();
			rightDir.set(this.movementSpeed.x, 0);
			this.velocity.add(rightDir);
		}
		
		if (keyboard.isKeyDown(keyboard.KEY_UP))
		{
			var upDir = new Vector2();
			upDir.set(0, -this.movementSpeed.y);
			this.velocity.add(upDir);
		}
		
		if (keyboard.isKeyDown(keyboard.KEY_DOWN))
		{
			var downDir = new Vector2();
			downDir.set(0, this.movementSpeed.y);
			this.velocity.add(downDir);
		}
		
		if (keyboard.isKeyDown(keyboard.KEY_SPACE) && this.shootTimer > this.shootReady)
		{
			this.shootTimer = 0;
			this.gun.shoot(new Vector2(this.position.x + 32, this.position.y - 32), new Vector2(0, -1), 1);
			this.gun.shoot(new Vector2(this.position.x - 32, this.position.y - 32), new Vector2(0, -1), 1);
		}
		
		if (this.velocity.length() > 0)
		{
			var mag = this.velocity.length();
			var temp = this.velocity.normalised();
			var minVal = Math.min(mag, this.maxVelocity) * this.velocityDecay;
			temp.multiply(minVal);
			this.velocity = temp;
		}
		
		this.position.add(this.velocity);
		
		this.checkBoundaries();
		
		if (this.currentHealth <= 0)
		{
			this.currentHealth = 0;
			this.alive = false;
		}
	}
	
	this.gun.update(deltaTime);
};

Player.prototype.draw = function()
{
	if (this.alive)
	{
		context.save();
		context.translate(this.position.x, this.position.y);
		context.rotate(this.rotation);
		context.drawImage(this.image, -this.dimensions.x / 2, -this.dimensions.y / 2, this.dimensions.x, this.dimensions.y);
		context.restore();
		
		context.fillText("Current score: " + Math.floor(this.currentScore), 5, 150, 200);
		context.fillText("Current health: " + Math.floor(this.currentHealth), 5, 170, 200);
	}
	
	this.gun.draw();
};

Player.prototype.checkBoundaries = function()
{
	if (this.position.x < this.dimensions.x * 0.5)
	{
		this.position.x = this.dimensions.x * 0.5;
	}
	
	if (this.position.x + this.dimensions.x * 0.5 > canvas.width)
	{
		this.position.x = canvas.width - this.dimensions.x * 0.5;
	}
	
	if (this.position.y < this.dimensions.y * 0.5)
	{
		this.position.y = this.dimensions.y * 0.5;
	}
	
	if (this.position.y + this.dimensions.y * 0.5 > canvas.height)
	{
		this.position.y = canvas.height - this.dimensions.y * 0.5;
	}
};

Player.prototype.intersects = function(otherX, otherY, otherWidth, otherHeight)
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

Player.prototype.reset = function()
{
	this.position.set(this.startPosition.x, this.startPosition.y);
	this.velocity.set(0, 0);
	this.currentScore = 0;
	this.alive = true;
	this.currentHealth = this.currentMaxHealth;
	this.gun.reset();
};
