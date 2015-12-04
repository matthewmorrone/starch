function Point(x, y, color, velocity, radius, mass)
{
	this.x = x || 0
	this.y = y || 0
	this.color = color || "black"
	this.mass = mass
	this.acceleration = {x: 0, y: -10}
	this.velocity = velocity
	this.radius = radius

	if (empty(color))	 {color = "black"}
	if (empty(mass))	{mass = 1.0}


	this.applyForce = function(x, y)
	{
		this.velocity.x += x
		return this.velocity.y += y
	}

	this.tick = function()
	{
		if (this.y + this.velocity.y * .1 < 0 && this.velocity.y <= 0.1)
		{
			this.velocity.y = -this.velocity.y * .7
		}
		if ((this.x + this.velocity.x * .1 < 0) || (this.x + this.velocity.x * .1 > 512))
		{
			this.velocity.x = -this.velocity.x * .7
		}
		this.y += this.velocity.y * .1
		this.x += this.velocity.x * .1
		this.velocity.x += this.acceleration.x
		return this.velocity.y += this.acceleration.y
	}

	this.display = function(ctx)
	{
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = "rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", .8)"
		ctx.arc(this.x, 512 - this.y, this.radius, 0, 20, true)
		ctx.fill()
		return ctx.restore()
	}

	this.draw = function()
	{
		c.beginPath()
		c.arc(this.x, this.y, 5, 0, 2*Math.PI)
		c.fill()
		c.fillStyle = color
		c.closePath()
		return this
	}
	this.recolor = function(color)
	{
		this.color = color
		c.beginPath()
		c.arc(this.x, this.y, 5, 0, 2*Math.PI)
		c.fillStyle = color
		c.fill()
		c.closePath()
		return this
	}
	this.equals = function(that)
	{
		return this.x == that.x && this.y == that.y
	}
	this.proximity = function(x, y)
	{
		var dx = this.x - (x - o.left)
		var dy = this.y - (y - o.top)
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.distance = function(that)
	{
		var dx = this.x - that.x
		var dy = this.y - that.y
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.getX = function() {return x}
	this.getY = function() {return y}
	this.setX = function(x) {this.x = x}
	this.setY = function(y) {this.y = y}
	this.clone = function()
	{
		return new Point(this.x, this.y)
	}

	this.draw()
	this.add = function(v)
	{
		return new Point(this.x + v.x, this.y + v.y)
	}
	this.clone = function()
	{
		return new Point(this.x, this.y)
	}
	this.degreesTo = function(v)
	{
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var angle = Math.atan2(dy, dx); //	 radians
		return angle * (180 / Math.PI); //	 degrees
	}
	this.distance = function(v)
	{
		var x = this.x - v.x;
		var y = this.y - v.y;
		return Math.sqrt(x * x + y * y)
	}
	this.equals = function(toCompare)
	{
		return this.x == toCompare.x && this.y == toCompare.y
	}
	this.interpolate = function(v, f)
	{
		return new Point((this.x + v.x) * f, (this.y + v.y) * f)
	}
	this.length = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}
	this.normalize = function(thickness)
	{
		var l = this.length();
		this.x = this.x / l * thickness;
		this.y = this.y / l * thickness;
	}
	this.orbit = function(origin, arcWidth, arcHeight, degrees)
	{
		var radians = degrees * (Math.PI / 180);
		this.x = origin.x + arcWidth * Math.cos(radians);
		this.y = origin.y + arcHeight * Math.sin(radians);
	}
	this.offset = function(dx, dy)
	{
		this.x += dx;
		this.y += dy;
	}
	this.subtract = function(v)
	{
		return new Point(this.x - v.x, this.y - v.y)
	}
	this.toString = function()
	{
		return "(x=" + this.x + ", y=" + this.y + ")"
	}
	return this
}
Point.interpolate = function(pt1, pt2, f)
{
	return new Point((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f)
}
Point.polar = function(len, angle)
{
	return new Point(len * Math.sin(angle), len * Math.cos(angle))
}
Point.distance = function(pt1, pt2)
{
	var x = pt1.x - pt2.x
	var y = pt1.y - pt2.y
	return Math.sqrt(x * x + y * y)
}

function halfway(a, b)
{
	var dx = (a[0] + b[0]) / 2
	var dy = (a[1] + b[1]) / 2
	return {dx: dx, dy: dy}
}


