


function Line(a, b)
{
	this.a = a
	this.b = b

	// if (!a || !b) {throw TypeError("Must provide two points.")}

	this.getA = function()	{return this.a}
	this.getB = function()	{return this.b}
	this.setA = function(a) {this.a = a}
	this.setB = function(b) {this.b = b}
	this.draw = function()
	{
		c.beginPath()
		c.moveTo(this.a.x, this.a.y)
		c.lineTo(this.b.x, this.b.y)
		c.stroke()
		c.closePath()
		return this
	}
	this.swap = function()
	{
		var c = this.a
		this.a = this.b
		this.b = c
	}
	this.slope = function()
	{
		return (a.y - b.y) / (a.x - b.x)
	}
	this.intercept = function()
	{
		return this.a.y - this.slope() * this.a.x
	}
	this.distance = function()
	{
		var dx = this.a.x - this.b.x
		var dy = this.a.y - this.b.y
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.equals = function(that)
	{
		return this.a.equals(that.a) && this.b.equals(that.b)
	}
}


