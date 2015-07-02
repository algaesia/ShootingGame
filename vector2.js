var Vector2 = function(x, y)
{
	if (typeof x === "undefined")
	{
		this.x = 0;
	}
	else
	{
		this.x = x;
	}
	
	if (typeof y === "undefined")
	{
		this.y = 0;
	}
	else
	{
		this.y = y;
	}	
};

Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
};

Vector2.prototype.normalise = function()
{
	var length = Math.sqrt(this.x * this.x + this.y * this.y);
	if (length != 0)
	{
		this.x /= length;
		this.y /= length;
	}
};

Vector2.prototype.normalised = function()
{	
	var temp = this;
	var length = Math.sqrt(temp.x * temp.x + temp.y * temp.y);
	if (length != 0)
	{
		temp.x /= length;
		temp.y /= length;
	}
	return temp;
};

Vector2.prototype.add = function(otherVector2)
{
	this.x += otherVector2.x;
	this.y += otherVector2.y;
};

Vector2.prototype.subtract = function(otherVector2)
{
	this.x -= otherVector2.x;
	this.y -= otherVector2.y;
};

Vector2.prototype.multiply = function(scalar)
{
	this.x *= scalar;
	this.y *= scalar;
};

Vector2.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
