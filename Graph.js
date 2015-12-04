

function Graph()
{
	this.vertices = []
	this.edges = []

	this.newV = function(x, y)	{var v = new Vertex(x, y); this.addV(v); return this.vertices[this.vertices.length-1]}
	this.addV = function(v)	 {this.vertices.push(v); v.draw()}
	this.newE = function(a, b)	{var e = new Edge(a, b); this.addE(e); return this.edges[this.edges.length-1]}
	this.addE = function(e)	 {this.edges.push(e); e.draw()}
	this.getV = function(i)	 {return this.vertices[i]}
	this.getE = function(i)	 {return this.edges[i]}

	this.collide = function(x, y)
	{
		for(var v in this.vertices)
		{
			if (this.vertices[v].proximity(x, y) < 5)
			{
				this.vertices[v].recolor("blue")
				return this.vertices[v]
			}
			else
			{
				this.vertices[v].recolor("black")
			}
		}
	}

	this.draw = function()
	{
		for(var v in this.vertices)
		{
			this.vertices[v].draw()
		}
		for(var e in this.edges)
		{
			this.edges[e].draw()
		}
	}
	this.crossCount = function()
	{
		var total = 0
		for(var i in range(0, this.edges.length-1))
		{
			for(var j in range(parseInt(i)+1, this.edges.length-1))
			{
				if (i == j) {continue}
				x1 = this.edges[i].a.x; y1 = this.edges[i].a.y
				x2 = this.edges[i].b.x; y2 = this.edges[i].b.y
				x3 = this.edges[j].a.x; y3 = this.edges[j].a.y
				x4 = this.edges[j].b.x; y4 = this.edges[j].b.y 
				// alert(i+" "+j+" "+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3+" "+x4+" "+y4)
				var den = (y4 - y3) * (x2 - x1) - (x4 * x3) * (y2 - y1)

				if (den == 0) {continue}

				var ua = ((x4 - x3) * (y1 - y3) - (y4 * y3) * (x1 - x3))
				var ub = ((x2 - x1) * (y1 - y3) - (y2 * y1) * (x1 - x3))

				if (ua > 0 && ua < 1 && ub > 0 && ub < 1)
				{
					total++
				}
			}
		}
		return total
	}
}



