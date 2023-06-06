/*
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/
  
  
  


const elts = {
	text1: document.getElementById("text1"),
	text2: document.getElementById("text2")
};

// The strings to morph between. You can change these to anything you want!
const texts = [
	"I",
	"Love",
	"Moscow",
	"Polytech",
	"I've done",
	"the work",
	"Creyache"
];

// Controls the speed of morphing.
const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
	morph -= cooldown;
	cooldown = 0;
	
	let fraction = morph / morphTime;
	
	if (fraction > 1) {
		cooldown = cooldownTime;
		fraction = 1;
	}
	
	setMorph(fraction);
}

// A lot of the magic happens here, this is what applies the blur filter to the text.
function setMorph(fraction) {
	// fraction = Math.cos(fraction * Math.PI) / -2 + .5;
	
	elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	fraction = 1 - fraction;
	elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
	elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
	
	elts.text1.textContent = texts[textIndex % texts.length];
	elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
	morph = 0;
	
	elts.text2.style.filter = "";
	elts.text2.style.opacity = "100%";
	
	elts.text1.style.filter = "";
	elts.text1.style.opacity = "0%";
}

// Animation loop, which is called every frame.
function animate() {
	requestAnimationFrame(animate);
	
	let newTime = new Date();
	let shouldIncrementIndex = cooldown > 0;
	let dt = (newTime - time) / 1000;
	time = newTime;
	
	cooldown -= dt;
	
	if (cooldown <= 0) {
		if (shouldIncrementIndex) {
			textIndex++;
		}
		
		doMorph();
	} else {
		doCooldown();
	}
}

// Start the animation.
animate();
setInterval(() => {
    // get time indicator elements
    let hours = document.getElementById('hours');
    let minutes = document.getElementById('minutes');
    let secondes = document.getElementById('seconds');
    let ampm = document.getElementById('ampm');
  
    // digits time indicator
    let hh = document.getElementById('hh');
    let mm = document.getElementById('mm');
    let ss = document.getElementById('ss');
  
  
    // dot time indicator
    let dotH = document.querySelector('.h_dot');
    let dotM = document.querySelector('.m_dot');
    let dotS = document.querySelector('.s_dot');
  
    // get current time
    let h = new Date().getHours();
    let m = new Date().getMinutes();
    let s = new Date().getSeconds();
    let ap = h >= 12 ? '' : 'AM';
  
    // convert to 12 hour format
    if (h > 12) {
      h = h - 12;
    }
  
    // add 0 before single digit
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
  
    // set time and label
    hours.innerHTML = h + '<br /><span>Hours</span>';
    minutes.innerHTML = m + '<br /><span>Minutes</span>';
    secondes.innerHTML = s + '<br /><span>Seconds</span>';
    ampm.innerHTML = ap;
  
    // set time circular indicator
    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;
  
    // set dot time position indicator
    dotH.style.transform = `rotate(${h * 30}deg)`;
    dotM.style.transform = `rotate(${m * 6}deg)`;
    dotS.style.transform = `rotate(${s * 6}deg)`;
  }, 1000);


  const spans = document.querySelectorAll('.word span');

  spans.forEach((span, idx) => {
	  span.addEventListener('click', (e) => {
		  e.target.classList.add('active');
	  });
	  span.addEventListener('animationend', (e) => {
		  e.target.classList.remove('active');
	  });
	  
	  // Initial animation
	  setTimeout(() => {
		  span.classList.add('active');
	  }, 750 * (idx+1))
  });
 
  setTimeout(function() {
	var NUMBER_OF_BARS = 50;
	var MAX_HEIGHT = 150;
	var MIN_HEIGHT = -150;
	
	var TOP_COLOR = "#B2E17A";
	var BOTTOM_COLOR = "#00FFCC"
	var AVG_COLOR = "#444"
	var BACKGROUND_COLOR = "#333";
	
	
	function getRandomInt (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	
	
	function toRadians(d) {
		return d * Math.PI / 180;
	}
	
	
	function Bar(x, y, width, height, inc) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.inc = height > 0 ? -inc : inc;
		this.topColor = TOP_COLOR;
		this.bottomColor = BOTTOM_COLOR;
	
		this.backgroundColor = "#444";
		this.maxHeight = Math.abs(height);
		this.minHeight = -this.maxHeight;
	
		this.draw = function(ctx) {
			ctx.beginPath();
			ctx.rect(this.x, y - this.maxHeight, this.width, this.maxHeight - this.minHeight);
			ctx.fillStyle = this.backgroundColor;
			ctx.fill();
			ctx.closePath();
	
			var y0;
	
			if (this.height > 0) {
				y0 = this.y - this.height;
			} else {
				y0 = y;
			}
	
			ctx.beginPath();
			ctx.rect(this.x, y0, this.width, Math.abs(this.height));
			ctx.fillStyle = this.height > 0 ? this.topColor : this.bottomColor;
			ctx.fill();
			ctx.closePath();
		};
	
		this.move = function() {
			if (this.height > this.maxHeight || this.height < this.minHeight){
				if (this.inc > 0) {
					this.minHeight = -getRandomInt(10, Math.abs(MIN_HEIGHT));
				} else {
					this.maxHeight = getRandomInt(10, MAX_HEIGHT);
				}
				this.inc *= -1;
			}
			this.height += this.inc;
		};
	
		this.getValue = function() {
			return this.height;
		}
	}
	
	
	function Hexagon(x, y, width, height, color) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		this.fontColor = BACKGROUND_COLOR;
		this.font = "bold 25px Arial";
		this.lineWidth = 1;
	
		this.draw = function(ctx, value, bars, topDraw) {
			var x0, x1, x2, x3, x4, x5;
			var y0, y1, y2, y3, y4, y5;
			x0 = x5 = Math.round(this.x - (this.width / 2));
			x1 = x4 = this.x;
			x2 = x3 = Math.round(this.x + (this.width / 2));
			y0 = y2 = Math.round(this.y - (this.height / 3));
			y1 = Math.round(this.y - (this.height / 2));
			y3 = y5 = Math.round(this.y + (this.height / 3));
			y4 = Math.round(this.y + (this.height / 2));
			ctx.beginPath();
			ctx.moveTo(x0, y0);
			ctx.lineTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.lineTo(x3, y3);
			ctx.lineTo(x4, y4);
			ctx.lineTo(x5, y5);
			ctx.fillStyle = this.color;
			ctx.fill();
			ctx.closePath();
			this._drawText(ctx, value);
			if (bars != null && bars.length > 0) {
				this._drawLines(ctx, bars, topDraw);
			}
		};
	
		this._drawText = function(ctx, value) {
			ctx.fillStyle = this.fontColor;
			ctx.textBaseline = "middle";
			ctx.textAlign = "center";
			ctx.font = this.font;
			ctx.fillText(value, this.x, this.y);
		};
	
		this._drawLines = function (ctx, bars, topDraw) {
			var x0 = this.x, y0, y1;
			var gap = 15;
			if (topDraw) {
				y0 = Math.round(this.y - gap - this.height / 2);
			} else {
				y0 = Math.round(this.y + gap + this.height / 2);
				y1 = y0 + gap;
				if (y0 > MIN_HEIGHT) {
					y1 = y0 + (y0 + MIN_HEIGHT);
				} else {
					y1 = y0 + gap;
				}
			}
			var bar, barY, barPointerX, barPointerY;
			for (i in bars) {
				bar = bars[i];
				barPointerX = Math.round(bar.x + bar.width / 2);
				ctx.beginPath();
				ctx.moveTo(x0, y0);
				if (topDraw) {
					if (y0 > bar.y - MAX_HEIGHT) {
						y1 = bar.y - MAX_HEIGHT - gap * 2;
					} else {
						y1 = y0 - gap * 2;
					}
					barPointerY = bar.y - bar.maxHeight - gap;
				} else {
					if (y0 < bar.y + Math.abs(MIN_HEIGHT)) {
						y1 = bar.y + Math.abs(MIN_HEIGHT) + gap * 2;
					} else {
						y1 = y0 + gap * 2;
					}
					barPointerY = bar.y + Math.abs(bar.minHeight) + gap;
				}
				ctx.lineTo(x0, y1);
				ctx.lineTo(barPointerX, y1);
				ctx.lineTo(barPointerX, barPointerY);
				ctx.strokeStyle = this.color;
				ctx.lineWidth = this.lineWidth;
				ctx.stroke();
				ctx.closePath();
				// Pointer
				var pointerWidth = 10, pointerHeight = 15;
				var px0, px1, px2, px3, px4, px5;
				var py0, py1, py2, py3, py4, py5;
	
				px0 = px3 = barPointerX;
				px1 = px2 = Math.round(barPointerX + pointerWidth / 2);
				px4 = px5 = Math.round(barPointerX - pointerWidth / 2);
				py0 = Math.round(barPointerY + pointerHeight / 2);
				py1 = py5 = Math.round(barPointerY + pointerHeight / 3);
				py2 = py4 = Math.round(barPointerY - pointerHeight / 3);
				py3 = Math.round(barPointerY - pointerHeight / 2);
				ctx.beginPath();
				ctx.moveTo(px0, py0);
				ctx.lineTo(px1, py1);
				ctx.lineTo(px2, py2);
				ctx.lineTo(px3, py3);
				ctx.lineTo(px4, py4);
				ctx.lineTo(px5, py5);
				ctx.lineTo(px0, py0);
				ctx.fillStyle = this.color;
				ctx.fill()
				ctx.closePath();
			}
		};
	}
	
	
	function Axis(x0, y0, x1, y1) {
		this.x0 = x0;
		this.y0 = y0;
		this.x1 = x1;
		this.y1 = y1;
		this.lineWidth = 5;
	
		this.draw = function(ctx) {
			ctx.beginPath();
			ctx.moveTo(this.x0, this.y0);
			ctx.lineTo(this.x1, this.y1);
			ctx.strokeStyle = "#333";
			ctx.lineWidth = this.lineWidth;
			ctx.stroke();
			ctx.closePath();
		};
	}
	
	
	function State(cnvId) {
		this.canvas = document.getElementById(cnvId);
		this.ctx = this.canvas.getContext('2d');
		this.bars = [];
		this.minHexagon;
		this.maxHexagon;
		this.avgHexagon;
	
		this.width = window.innerWidth;
		this.height = window.innerHeight;
	
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	
		// Axes
		this.xAxis;
	
		this.inc = 2;
		this.barMargin = 5; // margin between bars
		this.hexMargin = 40; // margin between hexagons
	
		this.createBars = function() {
			var x, y, barWidth, barHeight, inc;
			var graphWidth, graphHeight, horizontalMargin, verticalMargin;
			horizontalMargin = this.width / 4;
			verticalMargin = this.height / 4;
			graphWidth = horizontalMargin * 2;
			graphHeight = verticalMargin * 2;
			barWidth = (graphWidth / NUMBER_OF_BARS) - this.barMargin;
			x = horizontalMargin;
			y = verticalMargin * 2;
			this.xAxis = new Axis(x, y, x + graphWidth, y);
			for (i = 0; i < NUMBER_OF_BARS; i++) {
				barHeight = Math.round(Math.cos(toRadians(360 / NUMBER_OF_BARS * (i + 1))) * MAX_HEIGHT);
				inc = barHeight >= 0 ? this.inc : -this.inc;
				this.bars.push(new Bar(x, y, barWidth, barHeight, inc));
				x += barWidth + this.barMargin;
			}
	
			var hexWidth = 70;
			var hexHeight = 80;
			var x0 = x1 = x + (hexWidth / 2) + this.hexMargin;
			var y0 = y - (hexHeight / 2) - this.hexMargin;
			var y1 = y + (hexHeight / 2) + this.hexMargin;
			var x2 = Math.round(x0 + hexWidth / 2);
			var y2 = y;
			this.maxHexagon = new Hexagon(x0, y0, hexWidth, hexHeight, TOP_COLOR);
			this.minHexagon = new Hexagon(x1, y1, hexWidth, hexHeight, BOTTOM_COLOR);
			this.avgHexagon = new Hexagon(x2, y2, hexWidth, hexHeight, AVG_COLOR);
		};
	
		this.clear = function() {
			var cnv = this.canvas;
			this.ctx.clearRect(0, 0, cnv.width, cnv.height);
		};
	
		this.draw = function() {
			this.clear();
			var ctx = this.ctx;
			var bars = this.bars;
			var minValue = Number.MAX_VALUE, maxValue = Number.MIN_VALUE;
			var sum = 0; 
			var barValue, bar, minBars = [], maxBars = [];
			for(i in bars) {
				bar = bars[i];
				barValue = bar.getValue();
				bar.move();
				bar.draw(ctx);
				if (barValue < minValue) {
					minValue = barValue;
					minBars = [bar];
				} else if (barValue == minValue) {
					minBars.push(bar);
				}
				if (barValue > maxValue) {
					maxValue = barValue;
					maxBars = [bar];
				} else if (barValue == maxValue) {
					maxBars.push(bar);
				}
				sum += barValue;
			}
			this.maxHexagon.draw(ctx, maxValue, maxBars, true);
			this.minHexagon.draw(ctx, minValue, minBars, false);
			this.avgHexagon.draw(ctx, Math.round(sum / bars.length));
	
			this.xAxis.draw(ctx);
		};
	}
	
	
	var state = new State('cnv', NUMBER_OF_BARS);
	state.createBars();
	
	window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
				window.webkitRequestAnimationFrame || 
				window.mozRequestAnimationFrame    || 
				window.oRequestAnimationFrame      || 
				window.msRequestAnimationFrame     || 
				function( callback ){
					window.setTimeout(callback, 1000 / 60);
				};
	})();
	
	
	(function animloop() {
		requestAnimFrame(animloop);
		state.draw();
	})();
	  
	}, 100);