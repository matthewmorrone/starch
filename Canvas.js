function Canvas() {
	this.canvas = create("canvas")
	this.canvas.width = this.width = 100
	this.canvas.height = this.height = 100
	this.context = this.canvas.getContext("2d")
	this.c = this.context
	return this
}
Canvas.prototype.clear = function() {
	this.c.clearRect(0, 0, this.width, this.height)
	return this
}
Canvas.prototype.line = function(x1, y1, x2, y2, color, width) {
	if (x1.isArray()) {
		color = y1 || "black"
		width = x2 || 5
		y1 = x1.y1
		x2 = x1.x2
		y2 = x1.y2
		x1 = x1.x1
	}
	this.c.beginPath()
	this.c.moveTo(x1, y1)
	this.c.lineTo(x2, y2)
	this.c.strokeStyle = color || "black"
	this.c.lineWidth = width || 5
	this.c.stroke()
	this.c.closePath()
	return this
}
Canvas.prototype.square = function(x, y, e, w, color, fill) {
	if (color == '') {
		color = 'rgba(0, 0, 0, 0)'
	}
	this.c.beginPath()
	this.c.rect(x, y, e, e)
	this.c.lineWidth = w
	this.c.strokeStyle = color
	this.c.stroke()
	if (fill) {
		this.c.fillStyle = fill
		this.c.fillRect(x, y, e, e)
	}
	return this
}
function canvas() {
	canvas = document.getElementById('pane')
	cheight = canvas.height
	cwidth = canvas.width
	c = canvas.getContext('2d')
	return c
}
function c() {
	return $("canvas")[0].getContext("2d")
}
function clear() {
	this.c.clearRect(0, 0, this.width, this.height)
}
function origin() {
	return {
		hx: $("canvas").width() / 2,
		hy: $("canvas").height() / 2
	}
}
function grid() {
	c.strokeStyle = "rgba(0, 0, 255, 1)"
	c.lineWidth = 1
	for (var i = 0; i <= 20; i++) {
		c.beginPath();
		c.moveTo(i * 50, 0);
		c.lineTo(i * 50, 1000);
		c.stroke()
	}
	for (var j = 0; j <= 20; j++) {
		c.beginPath();
		c.moveTo(0, j * 50);
		c.lineTo(1000, j * 50);
		c.stroke()
	}

	c.beginPath()
	c.lineWidth = 4
	c.strokeStyle = "rgba(0, 0, 0, 1)"
	c.moveTo(0, 500)
	c.lineTo(1000, 500)
	c.stroke()

	c.beginPath()
	c.lineWidth = 4
	c.strokeStyle = "rgba(0, 0, 0, 1)"
	c.moveTo(500, 0)
	c.lineTo(500, 1000)
	c.stroke()

	c.strokeStyle = "rgba(0, 0, 0, 1)"
	c.lineWidth = 4
	for (var i = 0; i <= 20; i++) {
		c.beginPath();
		c.moveTo(i * 50, 490);
		c.lineTo(i * 50, 510);
		c.stroke()
	}
	for (var j = 0; j <= 20; j++) {
		c.beginPath();
		c.moveTo(490, j * 50);
		c.lineTo(510, j * 50);
		c.stroke()
	}
}
function redraw(i) {
	clear()
	draw()
}
function drawline(c, x1, y1, x2, y2, color) {
	c.beginPath()
	c.moveTo(x1, y1)
	c.lineTo(x2, y2)
	c.fillStyle = color
	c.stroke()
}
function line(m, b, s) {
	for (var i = -400; i <= 400; i++) {
		circle(canvas.width / 2 + (i * 1.25), canvas.height / 2 - ((i * m + b) * 1.25), 1, s, s)
	}
}
function piesection(a, b, color) {
	c.beginPath()
	c.arc(150, 150, 150, a, b, false)
	c.fillStyle = color
	c.lineTo(150, 150)
	c.fill()
}
function circle(x, y, r, w, s, f, l) {
	c.beginPath()
	c.arc(x, y, r, Math.PI, -Math.PI, false)
	c.lineWidth = w
	if (s != '') {
		c.strokeStyle = s;
		c.stroke()
	}
	if (f != '') {
		c.fillStyle = f;
		c.fill()
	}
	c.closePath()
	if (l != '') {
		label(l, x, y)
	}
}
function label(l, x, y) {
	c.font = "10pt Calibri"
	c.fillStyle = "rgba(0, 0, 0, 1)"
	c.textAlign = "center";
	c.textBaseline = "middle";
	c.fillText(l, x, y)
}
function pretty(x, y) {
	circle(x - 100, y, 100, 5, "", 'rgba(250, 0, 0, 0.5)');
	circle(x, y - 100, 100, 5, "", 'rgba(0, 0, 0, 0.5)');
	circle(x, y + 100, 100, 5, "", 'rgba(0, 250, 0, 0.5)');
	circle(x + 100, y, 100, 5, "", 'rgba(0, 0, 250, 0.5)');
	circle(x - 70, y - 70, 100, 5, "", 'rgba(250, 0, 250, 0.5)');
	circle(x + 70, y + 70, 100, 5, "", 'rgba(250, 250, 0, 0.5)');
	circle(x - 70, y + 70, 100, 5, "", 'rgba(0, 250, 250, 0.5)');
	circle(x + 70, y - 70, 100, 5, "", 'rgba(250, 250, 250, 0.5)');

	circle(x - 100, y, 100, 5, "black");
	circle(x, y - 100, 100, 5, "black");
	circle(x, y + 100, 100, 5, "black");
	circle(x + 100, y, 100, 5, "black");
	circle(x - 70, y - 70, 100, 5, "black");
	circle(x - 70, y + 70, 100, 5, "black");
	circle(x + 70, y - 70, 100, 5, "black");
	circle(x + 70, y + 70, 100, 5, "black");
}
function rectangle(x, y, dx, dy, s, f, l) {
	c.beginPath()
	if (s != '') {
		c.strokeStyle = s
		c.stroke()
	}
	if (f != '') {
		c.fillStyle = f
		c.fill()
	}
	c.fillRect(x, y, dx, dy)
	if (l != '') {
		label(l, x, y)
	}
	c.closePath()
}
function square(x, y, e, w, s, f) {
	if (s == "") {
		s = 'rgba(0, 0, 0, 0)'
	}
	c.beginPath()
	c.rect(x, y, e, e)
	c.lineWidth = w
	c.strokeStyle = s
	c.stroke()
	if (f) {
		c.fillStyle = f
		c.fillRect(x, y, e, e)
	}
}
function parabola(a, b, c, s) {
	for (var i = -400; i <= 400; i++) {
		x = i * 1.25
		y = (((a / 8) * Math.pow(i, 2)) + (b * i) + c) * 1.25
		circle(canvas.width / 2 + (x), canvas.height / 2 - (y), 1, s, s)
	}
}
function dot(c) {
	c.save()
	c.fillStyle = "black"
	c.fillRect(-2, -2, 4, 4)
		// c.fillRect(x-3, y-18, 4, 4)
	c.restore()
}
function bowtied(c) {
	c.fillRect(25, 25, 100, 100)
	c.clearRect(45, 45, 60, 60)
	c.strokeRect(50, 50, 50, 50)
}
function drawBowties(c) {
	c.translate(45, 45)

	c.save()
	drawBowtie(c, "red")
	dot(c)
	c.restore()

	c.save()
	c.translate(85, 0)
	c.rotate(45 * Math.PI / 180)
	drawBowtie(c, "green")
	dot(c)
	c.restore()

	c.save()
	c.translate(0, 85)
	c.rotate(135 * Math.PI / 180)
	drawBowtie(c, "blue")
	dot(c)
	c.restore()

	c.save()
	c.translate(85, 85)
	c.rotate(90 * Math.PI / 180)
	drawBowtie(c, "yellow")
	dot(c)
	c.restore()
}
function drawBowtie(c, color) {
	c.fillStyle = "rgba(200, 200, 200, 0.3)"
	c.fillRect(-30, -30, 60, 60)

	c.fillStyle = color
	c.globalAlpha = 1.0
	c.beginPath()
	c.moveTo(25, 25)
	c.lineTo(-25, -25)
	c.lineTo(25, -25)
	c.lineTo(-25, 25)
	c.closePath()
	c.fill()
}
function roundedRect(x, y, w, h, r) {
	c.beginPath()
	c.moveTo(x, y + r)
	c.lineTo(x, y + h - r)
	c.quadraticCurveTo(x, y + h, x + r, y + h)
	c.lineTo(x + w - r, y + h)
	c.quadraticCurveTo(x + w, y + h, x + w, y + h - r)
	c.lineTo(x + w, y + r)
	c.quadraticCurveTo(x + w, y, x + w - r, y)
	c.lineTo(x + r, y)
	c.quadraticCurveTo(x, y, x, y + r)
	c.stroke()
}
function smiley(x, y, r) {

	c.beginPath()
	c.arc(x, y, r / 2, 0, Math.PI * 2, true) //	 Outer circle
	c.stroke()
	c.closePath()

	c.beginPath()
	c.arc(x, y + r / 10, r / 4, 0, Math.PI, false) //	 Mouth (clockwise)
	c.stroke()
	c.closePath()

	c.beginPath()
	c.arc(x - r / 5, y - r / 8, r / 10, 0, Math.PI * 2, true) //	 Left eye
	c.stroke()
	c.closePath()

	c.beginPath()
	c.arc(x + r / 5, y - r / 8, r / 10, 0, Math.PI * 2, true) //	 Right eye
	c.stroke()
	c.closePath()
}
function triangle() {
	c.beginPath()
	c.moveTo(25, 25)
	c.lineTo(105, 25)
	c.lineTo(25, 105)
	c.fill()

	c.beginPath()
	c.moveTo(125, 125)
	c.lineTo(125, 45)
	c.lineTo(45, 125)
	c.closePath()
	c.stroke()
}
function arcs() {
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 3; j++) {
			c.beginPath()
			var x = 25 + j * 50 // x coordinate
			var y = 25 + i * 50 // y coordinate
			var r = 20 // Arc r
			var startAngle = 0 // Starting point on circle
			var endAngle = Math.PI + (Math.PI * j) / 2 // End point on circle
			var clockwise = i % 2 == 0 ? false : true // clockwise or anticlockwise

			c.arc(x, y, r, startAngle, endAngle, clockwise)

			if (i > 1) {
				c.fill()
			} else {
				c.stroke()
			}
		}
	}
}
function speechbubble() {
	c.beginPath()
	c.moveTo(75, 25)
	c.quadraticCurveTo(25, 25, 25, 62.5)
	c.quadraticCurveTo(25, 100, 50, 100)
	c.quadraticCurveTo(50, 120, 30, 125)
	c.quadraticCurveTo(60, 120, 65, 100)
	c.quadraticCurveTo(125, 100, 125, 62.5)
	c.quadraticCurveTo(125, 25, 75, 25)
	c.stroke()
}
function heart() {
	c.beginPath()
	c.moveTo(75, 40)
	c.bezierCurveTo(75, 37, 70, 25, 50, 25)
	c.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5)
	c.bezierCurveTo(20, 80, 40, 102, 75, 120)
	c.bezierCurveTo(110, 102, 130, 80, 130, 62.5)
	c.bezierCurveTo(130, 62.5, 130, 25, 100, 25)
	c.bezierCurveTo(85, 25, 75, 37, 75, 40)
	c.fill()
}
function pacman() {
	roundedRect(c, 12, 12, 150, 150, 15)
	roundedRect(c, 19, 19, 150, 150, 9)
	roundedRect(c, 53, 53, 49, 33, 10)
	roundedRect(c, 53, 119, 49, 16, 6)
	roundedRect(c, 135, 53, 49, 33, 10)
	roundedRect(c, 135, 119, 25, 49, 10)

	// Character 1
	c.beginPath()
	c.arc(37, 37, 13, Math.PI / 7, -Math.PI / 7, false)
	c.fillStyle = "gold"
	c.lineTo(34, 37)
	c.fill()
	c.fillStyle = "black"

	// blocks
	for (i = 0; i < 8; i++) {
		c.fillRect(51 + i * 16, 35, 4, 4)
	}
	for (i = 0; i < 6; i++) {
		c.fillRect(115, 51 + i * 16, 4, 4)
	}
	for (i = 0; i < 8; i++) {
		c.fillRect(51 + i * 16, 99, 4, 4)
	}

	// character 2
	c.beginPath()
	c.moveTo(83, 116)
	c.lineTo(83, 102)
	c.fillStyle = "green"
	c.bezierCurveTo(83, 94, 89, 88, 97, 88)
	c.bezierCurveTo(105, 88, 111, 94, 111, 102)
	c.lineTo(111, 116)
	c.lineTo(106.333, 111.333)
	c.lineTo(101.666, 116)
	c.lineTo(97, 111.333)
	c.lineTo(92.333, 116)
	c.lineTo(87.666, 111.333)
	c.lineTo(83, 116)
	c.fill()
	c.fillStyle = "white"
	c.beginPath()
	c.moveTo(91, 96)
	c.bezierCurveTo(88, 96, 87, 99, 87, 101)
	c.bezierCurveTo(87, 103, 88, 106, 91, 106)
	c.bezierCurveTo(94, 106, 95, 103, 95, 101)
	c.bezierCurveTo(95, 99, 94, 96, 91, 96)
	c.moveTo(103, 96)
	c.bezierCurveTo(100, 96, 99, 99, 99, 101)
	c.bezierCurveTo(99, 103, 100, 106, 103, 106)
	c.bezierCurveTo(106, 106, 107, 103, 107, 101)
	c.bezierCurveTo(107, 99, 106, 96, 103, 96)
	c.fill()
	c.fillStyle = "blue"
	c.beginPath()
	c.arc(101, 102, 2, 0, Math.PI * 2, true)
	c.fill()
	c.beginPath()
	c.arc(89, 102, 2, 0, Math.PI * 2, true)
	c.fill()
}






function balls(c) {
	var points = []
	var go = true

	var tick = function() {
		c.clearRect(0, 0, 512, 512)
		for (var i = 0; i < points.length; i++) {
			points[i].tick()
			points[i].display(c)
		}
		if (go == true) {
			setTimeout(tick, 15)
		}
	}
	var addBalls = function() {
		var color = {
			red: Math.floor(Math.random() * 255),
			green: Math.floor(Math.random() * 255),
			blue: Math.floor(Math.random() * 255)
		}
		var velocity = {
			'x': Math.floor(Math.random() * 400) - 200,
			'y': Math.floor(Math.random() * 100)
		}
		var r = Math.floor(Math.random() * 30 + 10);
		var randomnumber = Math.floor(Math.random() * 450)
		points.push(new Point(randomnumber + 50, 512, color, velocity, r))
		setTimeout(addBalls, 300)
		if (go == true) {}
	}
	addBalls()
	$("body").keydown(function(e) {
		if (e.which == 37) {
			for (var i = 0; i < points.length; i++) {
				points[i].applyForce(-Math.random() * 150 - 100, 0)
			}
		} else if (e.which == 38) {
			for (var i = 0; i < points.length; i++) {
				points[i].applyForce(0, Math.random() * 150 + 100)
			}
		} else if (e.which == 39) {
			for (var i = 0; i < points.length; i++) {
				points[i].applyForce(Math.random() * 150 + 100, 0)
			}
		} else if (e.which == 40) {
			for (var i = 0; i < points.length; i++) {
				points[i].applyForce(0, -Math.random() * 150 - 100)
			}
		} else if (e.which == 32) {
			points = []
		}
	})
	$("canvas").eq(0).toggle(function(e) {
		go = false
	}, function(e) {
		go = true;
		tick()
	})
	tick()
}

function showGraph(graph) {
	showPopup()
	var gr = ((gety2() - gety1()) + 1) + ":" + graph.substring(0, graph.length - 1)
	$("#popupcontents").html("<iframe src= \"http://g.ivank.net/g.html#" + gr + "\" width=\"300\" height=\"300\" style= \"border:none;\"></iframe>")
}
function showPopup() {
	var popup = $("#contents").append("<div id='popupbox'><div id='popupcontents'></div><div id='expandright'></div></div>")
	$("#popupbox").css({
		"position": "fixed",
		"left": "150px",
		"top": "150px",
		"width": "300px",
		"height": "300px",
		"z-index": "5",
		"opacity": ".5",
		"background-color": "black",
		"border": "none"
	})
	$("#expandright").css({
		"height": "100%",
		"width": "2px",
		"float": "right",
		"cursor": "e-resize"
	})
	$("#popupcontents").css({
		"height": "100%",
		"width": "100%"
	})
	pressedP = false
	$("#popupbox").mousedown(function(e) {
		$(this).css("cursor", "move")
		startP = $(this)
		startPX = e.pageX
		startPY = e.pageY
		pressedP = true
	})
	pressedRPX = false
	$("#expandright").mousedown(function(e) {
		startPR = $(this).parent()
		startPWX = startPR.width()
		startPRX = e.pageX
		pressedRPX = true
	})
	$(document).mousemove(function(e) {
		if (pressedP == true) {
			startP.css({
				"left": (startPX + (e.pageX - startPX)) - ($("#popupbox").width() / 2),
				"top": (startPY + (e.pageY - startPY)) - ($("#popupbox").height() / 2)
			})
		}
		if (pressedRPX == true) {
			startPR.width(startPWX + (e.pageX - startPRX))
		}
	})
	$(document).mouseup(function(e) {
		pressedP = false
		pressedRPX = false
		$("#popupbox").css("cursor", "")
	})
	$("#popupbox").dblclick(function() {
		$(this).remove()
	})
}
$("#makepiechart").click(function(e) {
	if ($("#dx").html() != 2) {
		return
	}
	$(".popup").remove()
	var popup = $(".visible").append("<div id='piechart' class='popup'></div>")
	pressedP = false
	$("#piechart").css({
			"position": "fixed",
			"left": "150px",
			"top": "150px",
			"width": "320px",
			"height": "320px",
			"z-index": "5",
			"background-color": "black",
			"border": "none"
		}) //"opacity":".5",
	$("#piechart").mousedown(function(e) {
		startP = $(this)
		startPX = e.pageX
		startPY = e.pageY
		pressedP = true
	})
	$(document).mousemove(function(e) {
		if (pressedP == true) {
			startP.css({
				"left": (startPX + (e.pageX - startPX)) - ($("#piechart").width() / 2),
				"top": (startPY + (e.pageY - startPY)) - ($("#piechart").height() / 2)
			})
		}
	})
	$(document).mouseup(function(e) {
		pressedP = false
		$("#piechart").css("cursor", "")
	})
	$("#piechart").html("<canvas id='graphcanvas' width='300px' height='300px'></canvas>") //class='control'
	$("#graphcanvas").after("<button id='savegraph'>Save</button><button id='closegraph'>Close</button>")

	var canvas = document.getElementById("graphcanvas")
	var c = canvas.getContext("2d")
	$("#graphcanvas").css({
		"background-color": "white",
		"margin-top": "10px",
		"margin-left": "10px",
	})
	$("#savegraph").click(function() {
		window.open(c.canvas.toDataURL('image/png'), '_blank')
	})
	$("#closegraph").click(function() {
		$("#piechart").remove()
	})

	var twodarray = []
	for (var j = gety1(); j <= gety2(); j++) {
		var row = []
		for (var i = getx1(); i <= getx2(); i++) {
			var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
			if (!cell.hasClass("selected")) {
				continue
			}
			if (cell.val() != "") {
				row.push(cell.val())
			}
		}
		twodarray.push(row)
	}

	c.beginPath()
	c.arc(150, 150, 150, Math.PI, -Math.PI, false)
	c.stroke()

	var total = 0
	for (i in twodarray) {
		total += parseInt(twodarray[i][1])
	}

	var spot = 0
	for (i in twodarray) {
		var min = spot
		var max = (((parseInt(twodarray[i][1]) / total) * 360) * (0.0174532925)) + min
		pie_section(c, min, max, random_color())

		var theta = (max - min) / 2 + min
		var l = 100
		var bx = 150 + l * Math.cos(theta)
		var by = 150 + l * Math.sin(theta)
		c.fillStyle = "white"
		c.font = "bold 18px sans-serif";
		c.textAlign = "center"
		c.textBaseline = "middle"
		c.fillText(twodarray[i][0], bx, by)

		spot = max
	}
})
$("#makescatterplot").click(function(e) {
	if ($("#dx").html() != 2) {
		return
	}
	$(".popup").remove()
	var popup = $(".visible").append("<div id='scatterplot' class='popup'></div>")
	pressedP = false

	$("#scatterplot").css({
			"position": "fixed",
			"left": "150px",
			"top": "150px",
			"width": "320px",
			"height": "320px",
			"z-index": "5",
			"background-color": "black",
			"border": "none"
		}) //"opacity":".5",
	$("#scatterplot").mousedown(function(e) {
		$(this).css("cursor", "move")
		startP = $(this)
		startPX = e.pageX
		startPY = e.pageY
		pressedP = true
	})
	$(document).mousemove(function(e) {
		if (pressedP == true) {
			startP.css({
				"left": (startPX + (e.pageX - startPX)) - ($("#scatterplot").width() / 2),
				"top": (startPY + (e.pageY - startPY)) - ($("#scatterplot").height() / 2)
			})
		}
	})
	$(document).mouseup(function(e) {
		pressedP = false
		$("#scatterplot").css("cursor", "")
	})
	$("#scatterplot").html("<canvas id='graphcanvas' width='300px' height='300px'></canvas>") //class='control'
	$("#graphcanvas").after("<button id='savegraph'>Save</button><button id='closegraph'>Close</button>")

	var canvas = document.getElementById("graphcanvas")
	var c = canvas.getContext("2d")
	$("#graphcanvas").css({
		"background-color": "white",
		"margin-top": "10px",
		"margin-left": "10px",
	})
	$("#savegraph").click(function() {
		window.open(c.canvas.toDataURL('image/png'), '_blank')
	})
	$("#closegraph").click(function() {
		$("#scatterplot").remove()
	})
	var twodarray = []
	for (var j = gety1(); j <= gety2(); j++) {
		var row = []
		for (var i = getx1(); i <= getx2(); i++) {
			var cell = $(".visible tr").eq(j).children().eq(i).children(".cell")
			if (!cell.hasClass("selected")) {
				continue
			}
			if (cell.val() != "") {
				row.push(cell.val())
			}
		}
		twodarray.push(row)
	}
	var line = least_squares(twodarray)
	var minx = twodarray[0][0]
	var miny = twodarray[0][1]
	var maxx = twodarray[0][0]
	var maxy = twodarray[0][1]
	for (i in twodarray) {
		if (parseInt(twodarray[i][0]) < minx) {
			minx = twodarray[i][0]
		}
		if (parseInt(twodarray[i][1]) < miny) {
			miny = twodarray[i][1]
		}
		if (parseInt(twodarray[i][0]) > maxx) {
			maxx = twodarray[i][0]
		}
		if (parseInt(twodarray[i][1]) > maxy) {
			maxy = twodarray[i][1]
		}
	}
	c.fillStyle = "black"
	c.textAlign = "center"
	c.textBaseline = "middle"
	c.fillText(minx, 20, 288)
	c.fillText(miny, 12, 280)
	c.fillText(maxx, 280, 288)
	c.fillText(maxy, 12, 20)

	draw_line(c, 15, 20, 20, 20, "black")
	draw_line(c, 20, 20, 20, 285, "black")
	draw_line(c, 15, 280, 280, 280, "black")
	draw_line(c, 280, 280, 280, 285, "black")

	var point1 = []
	var point2 = []
	point1.push(0)
	point1.push(0 * line[1] + line[0])
	point2.push(maxx)
	point2.push(maxx * line[1] + line[0])
	draw_line(c, (280 - (point1[0] * 260 / maxx)), (280 - (point1[1] * 260 / maxy)), (280 - (point2[0] * 260 / maxx)), (280 - (point2[1] * 260 / maxy)), "black")

	for (a in twodarray) {
		c.fillRect(280 - (twodarray[a][0] * (260 / maxx)) - 2.5, 280 - (twodarray[a][1] * (260 / maxy)) - 2.5, 5, 5);
	}
})
$("#popup").click(function(e) {
	$("#popupbox").remove()
	var popup = $(".visible").append("<div id='popupbox'><div id='expandright'></div></div>")
	pressedP = false
	$("#popupbox").css({
			"position": "fixed",
			"left": "150px",
			"top": "150px",
			"width": "300px",
			"height": "300px",
			"z-index": "5",
			"background-color": "black",
			"border": "none"
		}) //"opacity":".5",
	$("#popupbox").mousedown(function(e) {
		$(this).css("cursor", "move")
		startP = $(this)
		startPX = e.pageX
		startPY = e.pageY
		pressedP = true
	})
	$(document).mousemove(function(e) {
		if (pressedP == true) {
			startP.css({
				"left": (startPX + (e.pageX - startPX)) - ($("#popupbox").width() / 2),
				"top": (startPY + (e.pageY - startPY)) - ($("#popupbox").height() / 2)
			})
		}
	})
	$(document).mouseup(function(e) {
		pressedP = false;
		$("#popupbox").css("cursor", "")
	})
	$("#popupbox").html("<canvas id='myCanvas' width='280px' height='280px'></canvas><button id='closegraph'>x</button>") //class='control'
	var canvas = document.getElementById("myCanvas")
	$("#myCanvas").css({
		"background-color": "white",
		"margin-top": "10px",
		"margin-left": "10px",
	})
	$("#closegraph").click(function() {
		$("#popupbox").remove()
	})
	var c = canvas.getContext("2d")

	c.beginPath();
	c.moveTo(20, 20);
	c.lineTo(20, 260);
	c.fillStyle = "black"
	c.stroke()

	c.beginPath()
	c.moveTo(20, 260)
	c.lineTo(260, 260)
	c.fillStyle = "black"
	c.stroke()

	x1 = getx1()
	y1 = gety1()
	dx = getdx()
	dy = getdy()
	var twodarray = []
	for (var j = y1; j < (dy + y1); j++) {
		var row = []
		for (var i = x1; i < (dx + x1); i++) {
			var cell = $(".visible tr").eq(j).find(".cell").eq(i)
			row.push(cell.val())
		}
		twodarray.push(row)
	}
	for (a in twodarray) {
		c.fillRect(260 - twodarray[a][0] * 30, 260 - twodarray[a][1] * 30, 5, 5);
	}
})

function Point(x, y, color, velocity, radius, mass) {
	this.x = x || 0
	this.y = y || 0
	this.color = color || "black"
	this.mass = mass
	this.acceleration = {
		x: 0,
		y: -10
	}
	this.velocity = velocity
	this.radius = radius

	if (empty(color)) {
		color = "black"
	}
	if (empty(mass)) {
		mass = 1.0
	}

	this.applyForce = function(x, y) {
		this.velocity.x += x
		return this.velocity.y += y
	}

	this.tick = function() {
		if (this.y + this.velocity.y * .1 < 0 && this.velocity.y <= 0.1) {
			this.velocity.y = -this.velocity.y * .7
		}
		if ((this.x + this.velocity.x * .1 < 0) || (this.x + this.velocity.x * .1 > 512)) {
			this.velocity.x = -this.velocity.x * .7
		}
		this.y += this.velocity.y * .1
		this.x += this.velocity.x * .1
		this.velocity.x += this.acceleration.x
		return this.velocity.y += this.acceleration.y
	}

	this.display = function(ctx) {
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = "rgba(" + this.color.red + ", " + this.color.green + ", " + this.color.blue + ", .8)"
		ctx.arc(this.x, 512 - this.y, this.radius, 0, 20, true)
		ctx.fill()
		return ctx.restore()
	}

	this.draw = function() {
		c.beginPath()
		c.arc(this.x, this.y, 5, 0, 2 * Math.PI)
		c.fill()
		c.fillStyle = color
		c.closePath()
		return this
	}
	this.recolor = function(color) {
		this.color = color
		c.beginPath()
		c.arc(this.x, this.y, 5, 0, 2 * Math.PI)
		c.fillStyle = color
		c.fill()
		c.closePath()
		return this
	}
	this.equals = function(that) {
		return this.x == that.x && this.y == that.y
	}
	this.proximity = function(x, y) {
		var dx = this.x - (x - o.left)
		var dy = this.y - (y - o.top)
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.distance = function(that) {
		var dx = this.x - that.x
		var dy = this.y - that.y
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.getX = function() {
		return x
	}
	this.getY = function() {
		return y
	}
	this.setX = function(x) {
		this.x = x
	}
	this.setY = function(y) {
		this.y = y
	}
	this.clone = function() {
		return new Point(this.x, this.y)
	}

	this.draw()
	this.add = function(v) {
		return new Point(this.x + v.x, this.y + v.y)
	}
	this.clone = function() {
		return new Point(this.x, this.y)
	}
	this.degreesTo = function(v) {
		var dx = this.x - v.x;
		var dy = this.y - v.y;
		var angle = Math.atan2(dy, dx); //	 radians
		return angle * (180 / Math.PI); //	 degrees
	}
	this.distance = function(v) {
		var x = this.x - v.x;
		var y = this.y - v.y;
		return Math.sqrt(x * x + y * y)
	}
	this.equals = function(toCompare) {
		return this.x == toCompare.x && this.y == toCompare.y
	}
	this.interpolate = function(v, f) {
		return new Point((this.x + v.x) * f, (this.y + v.y) * f)
	}
	this.length = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y)
	}
	this.normalize = function(thickness) {
		var l = this.length();
		this.x = this.x / l * thickness;
		this.y = this.y / l * thickness;
	}
	this.orbit = function(origin, arcWidth, arcHeight, degrees) {
		var radians = degrees * (Math.PI / 180);
		this.x = origin.x + arcWidth * Math.cos(radians);
		this.y = origin.y + arcHeight * Math.sin(radians);
	}
	this.offset = function(dx, dy) {
		this.x += dx;
		this.y += dy;
	}
	this.subtract = function(v) {
		return new Point(this.x - v.x, this.y - v.y)
	}
	this.toString = function() {
		return "(x=" + this.x + ", y=" + this.y + ")"
	}
	return this
}
Point.interpolate = function(pt1, pt2, f) {
	return new Point((pt1.x + pt2.x) * f, (pt1.y + pt2.y) * f)
}
Point.polar = function(len, angle) {
	return new Point(len * Math.sin(angle), len * Math.cos(angle))
}
Point.distance = function(pt1, pt2) {
	var x = pt1.x - pt2.x
	var y = pt1.y - pt2.y
	return Math.sqrt(x * x + y * y)
}
function halfway(a, b) {
	var dx = (a[0] + b[0]) / 2
	var dy = (a[1] + b[1]) / 2
	return {
		dx: dx,
		dy: dy
	}
}
function Line(a, b) {
	this.a = a
	this.b = b

	// if (!a || !b) {throw TypeError("Must provide two points.")}

	this.getA = function() {
		return this.a
	}
	this.getB = function() {
		return this.b
	}
	this.setA = function(a) {
		this.a = a
	}
	this.setB = function(b) {
		this.b = b
	}
	this.draw = function() {
		c.beginPath()
		c.moveTo(this.a.x, this.a.y)
		c.lineTo(this.b.x, this.b.y)
		c.stroke()
		c.closePath()
		return this
	}
	this.swap = function() {
		var c = this.a
		this.a = this.b
		this.b = c
	}
	this.slope = function() {
		return (a.y - b.y) / (a.x - b.x)
	}
	this.intercept = function() {
		return this.a.y - this.slope() * this.a.x
	}
	this.distance = function() {
		var dx = this.a.x - this.b.x
		var dy = this.a.y - this.b.y
		return Math.sqrt(dx * dx + dy * dy)
	}
	this.equals = function(that) {
		return this.a.equals(that.a) && this.b.equals(that.b)
	}
}
function Graph() {
	this.vertices = []
	this.edges = []

	this.newV = function(x, y) {
		var v = new Vertex(x, y);
		this.addV(v);
		return this.vertices[this.vertices.length - 1]
	}
	this.addV = function(v) {
		this.vertices.push(v);
		v.draw()
	}
	this.newE = function(a, b) {
		var e = new Edge(a, b);
		this.addE(e);
		return this.edges[this.edges.length - 1]
	}
	this.addE = function(e) {
		this.edges.push(e);
		e.draw()
	}
	this.getV = function(i) {
		return this.vertices[i]
	}
	this.getE = function(i) {
		return this.edges[i]
	}

	this.collide = function(x, y) {
		for (var v in this.vertices) {
			if (this.vertices[v].proximity(x, y) < 5) {
				this.vertices[v].recolor("blue")
				return this.vertices[v]
			} else {
				this.vertices[v].recolor("black")
			}
		}
	}

	this.draw = function() {
		for (var v in this.vertices) {
			this.vertices[v].draw()
		}
		for (var e in this.edges) {
			this.edges[e].draw()
		}
	}
	this.crossCount = function() {
		var total = 0
		for (var i in range(0, this.edges.length - 1)) {
			for (var j in range(parseInt(i) + 1, this.edges.length - 1)) {
				if (i == j) {
					continue
				}
				x1 = this.edges[i].a.x;
				y1 = this.edges[i].a.y
				x2 = this.edges[i].b.x;
				y2 = this.edges[i].b.y
				x3 = this.edges[j].a.x;
				y3 = this.edges[j].a.y
				x4 = this.edges[j].b.x;
				y4 = this.edges[j].b.y
					// alert(i+" "+j+" "+x1+" "+y1+" "+x2+" "+y2+" "+x3+" "+y3+" "+x4+" "+y4)
				var den = (y4 - y3) * (x2 - x1) - (x4 * x3) * (y2 - y1)

				if (den == 0) {
					continue
				}

				var ua = ((x4 - x3) * (y1 - y3) - (y4 * y3) * (x1 - x3))
				var ub = ((x2 - x1) * (y1 - y3) - (y2 * y1) * (x1 - x3))

				if (ua > 0 && ua < 1 && ub > 0 && ub < 1) {
					total++
				}
			}
		}
		return total
	}
}





