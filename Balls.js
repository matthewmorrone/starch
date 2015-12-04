
function balls(c)
{
	var points = []
	var go = true

	var tick = function()
	{
		c.clearRect(0, 0, 512, 512)
		for(var i = 0; i < points.length; i++)
		{
			points[i].tick()
			points[i].display(c)
		}
		if (go == true) {setTimeout(tick, 15)}
	}
	var addBalls = function()
	{
		var color = {red:Math.floor(Math.random()*255), green:Math.floor(Math.random()*255), blue:Math.floor(Math.random()*255) }
		var velocity = { 'x':Math.floor(Math.random()*400)-200, 'y':Math.floor(Math.random()*100)}
		var r = Math.floor(Math.random()*30+10);
		var randomnumber=Math.floor(Math.random()*450)
		points.push(new Point(randomnumber+50, 512, color, velocity, r ))
		setTimeout(addBalls, 300)
		if (go == true) {}
	}
	addBalls()
	$("body").keydown(function(e)
	{
		if			(e.which == 37){for(var i = 0; i < points.length; i++){points[i].applyForce(-Math.random()*150-100, 0)}}
		else if (e.which == 38){for(var i = 0; i < points.length; i++){points[i].applyForce(0, Math.random()*150+100)}}
		else if (e.which == 39){for(var i = 0; i < points.length; i++){points[i].applyForce(Math.random()*150+100, 0)}}
		else if (e.which == 40){for(var i = 0; i < points.length; i++){points[i].applyForce(0, -Math.random()*150-100)}}
		else if (e.which == 32){points = []}
	})
	$("canvas").eq(0).toggle(function(e){go = false}, function(e){go = true; tick()})
	tick()
}

$(function()
{
	$("canvas").center()
	balls($("canvas").get(0).getContext("2d"))
})