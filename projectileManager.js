var ProjectileManager = function()
{
	this.projectiles = [];
	this.firedShots = 0;
	this.firedHits = 0;
};

ProjectileManager.prototype.update = function(deltaTime)
{
	for (var i = 0; i < this.projectiles.length; ++i)
	{
		this.projectiles[i].update(deltaTime);
	}
	
	for (var i = 0; i < this.projectiles.length; ++i)
	{
		if (!this.projectiles[i].alive)
		{
			this.projectiles.splice(i, 1);
		}
	}
};

ProjectileManager.prototype.draw = function()
{
	for (var i = 0; i < this.projectiles.length; ++i)
	{
		this.projectiles[i].draw();
	}
	
	context.fillText("Fired: " + this.firedShots, 5, 210, 200);
	context.fillText("Hit: " + this.firedHits, 5, 230, 200);
	context.fillText("Accuracy: " + Math.floor(this.firedShots > 0 ? ((this.firedHits / this.firedShots) * 100) : 100) + "%", 5, 250, 200);
};

ProjectileManager.prototype.shoot = function(otherPosition, otherVelocity, otherDamageValue)
{
	this.projectiles.push(new Projectile(otherPosition, otherVelocity, otherDamageValue));
	this.firedShots++;
};

ProjectileManager.prototype.reset = function()
{
	this.projectiles = [];
	this.firedShots = 0;
	this.firedHits = 0;
};
