// BRESENHAM

var gridsize = 18;
var gridscale = 0.8;
var gridstep;
var grid = [];

var x_off, y_off;

var gz = gridsize;
var bh_lines = [
	new Bh_coords(11,13,23,17,fl(gz/4),fl(gz/4),fl(gz/4*3),fl(gz/4)),
	new Bh_coords(11,13,7,19,fl(gz/4),fl(gz/4),fl(gz/2),fl(gz/4*3)),
	new Bh_coords(23,17,7,19,fl(gz/4*3),fl(gz/4),fl(gz/2),fl(gz/4*3))
	]

function setup() {
    createCanvas(windowWidth, windowHeight);
    $("#defaultCanvas0").addClass("p5canvas");
    calcGrid();
    noStroke();
    
    for (var i = 0; i < sq(gridsize); i++) {
		grid.push(false);
	}
	
	background(33);
}

function draw() {
    
    background(33);
    
    for (var i = 0; i < sq(gridsize); i++) {
		grid[i] = false;
	}
	
	for (var i = 0; i < bh_lines.length; i++) {
		bh_lines[i].update();
	}
    
    //fill(33,40);
    //rect(x_off, y_off, gridstep * gz, gridstep * gz);
    //rect(0, 0, windowWidth, windowHeight);
    
    fill(245);
    for (var i = 0; i < grid.length; i++) {
		if (grid[i]) {
			rect(i % gridsize * gridstep + x_off, fl(i / gridsize) * gridstep + y_off, gridstep, gridstep);
		}
	}
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    calcGrid();
    
    background(33);
}

function calcGrid() {
	gridstep = (windowWidth < windowHeight) ? windowWidth : windowHeight;
	gridstep = fl(gridstep / gridsize * gridscale);
    
    x_off = windowWidth / 2 - gridstep * gz / 2;
    y_off = windowHeight / 2 - gridstep * gz / 2;
	
}

function bh_line(x0, y0, x1, y1) {
    var dx = abs(x1 - x0);
    var dy = abs(y1 - y0);
    
    var sx = (x0 < x1) ? 1 : -1;
    var sy = (y0 < y1) ? 1 : -1;
    
    var err = dx - dy;
    var e2;
    
    while(1) {
        grid[y0 * gridsize + x0] = true;
        
        if ((x0 - x1) == 0 && (y0 - y1) == 0) break;
        e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }
}

function Bh_coords(x1_speed, y1_speed, x2_speed, y2_speed, x1_coord, y1_coord, x2_coord, y2_coord) {
	this.coords = [x1_coord, y1_coord, x2_coord, y2_coord];
	this.speeds = [x1_speed, y1_speed, x2_speed, y2_speed];
	this.fwds = [true, true, true, true];
	this.x1_speed = x1_speed;
	this.y1_speed = y1_speed;
	this.x2_speed = x2_speed;
	this.y2_speed = y2_speed;
	this.x1_fwd = true;
	this.x2_fwd = true;
	this.y1_fwd = true;
	this.y2_fwd = true;
	
	this.update = function() {
		for (var i = 0; i < 4; i++) {
			if (this.speeds != 0) {
				if (frameCount % this.speeds[i] == 0) {
					if (this.fwds[i]) {this.coords[i]++;}
					else {this.coords[i]--;}
					if (this.coords[i] < 0) {
						this.fwds[i] = !this.fwds[i];
						this.coords[i] = 1;
					}
					if (this.coords[i] >= gridsize) {
						this.fwds[i] = !this.fwds[i];
						this.coords[i] = gridsize - 1;
					}
				}
			}
		}
		bh_line(this.coords[0], this.coords[1], this.coords[2], this.coords[3]);
	}
};

function fl(input) {
	return Math.floor(input);
}
