var Keyboard = function()
{
	var self = this;
	
	window.addEventListener('keydown', function(evt) { self.onKeyDown(evt); }, false);
	window.addEventListener('keyup', function(evt) { self.onKeyUp(evt); }, false);
	
	this.currentKeys = new Array();
	this.heldKeys = new Array();
	
	this.KEY_SPACE = 32;
	this.KEY_LEFT = 37;
	this.KEY_UP = 38;
	this.KEY_RIGHT = 39;
	this.KEY_DOWN = 40;
	this.KEY_A = 65;
	this.KEY_D = 68;
	this.KEY_S = 83;
	this.KEY_W = 87;
	this.KEY_SHIFT = 16;
	this.KEY_ENTER = 13;
	this.KEY_ESCAPE = 27;
};

Keyboard.prototype.onKeyDown = function(evt)
{
	this.currentKeys[evt.keyCode] = true;
};

Keyboard.prototype.onKeyUp = function(evt)
{
	this.currentKeys[evt.keyCode] = false;
	this.heldKeys[evt.keyCode] = false;
};

Keyboard.prototype.isKeyDown = function(keyCode)
{
	return this.currentKeys[keyCode];
};
