var Animator = Base.extend({
	initialize: function(flasher, point) {
		this.flasher = flasher;
		this.height = flasher.height;
		this.width = flasher.width;
		this.center = new Point(this.width / 2, this.height / 2);
		this.point = point || new Point();
		this.mousePoint = new Point(this.width / 3, this.height / 3);
		if(!this.frameRate)
			this.frameRate = 100;
	},

	setActive: function(active) {
		if(active) {
			if(!this.active) {
				var that = this;
				setTimeout(that.iterate, Math.round(1000 / this.frameRate));
				
			}
			this.active = true;
		} else {
			this.active = false;
		}
	},

	getMousePoint: function() {
		var vector = this.flasher.mousePoint.subtract(this.mousePoint).divide(6);
		return this.mousePoint = this.mousePoint.add(vector);//new Point(this.balls[this.count % this.balls.length].point);
	},

	getPoint: function() {
		return this.point;
	},
	
	getRandomPoint: function() {
		return new Point(this.width, this.height).multiply(new Point(Math.random(), Math.random()));
	}
});

var FollowAnimator = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.name = 'Follow Animator';
		this.vCount = 2;
		this.seekPoints = [];
		this.points = [];
		this.frameRate = 30;
		for(var i = 0; i < this.vCount; i++) {
			this.seekPoints.push(this.getRandomPoint());
			this.points.push(this.getRandomPoint());
		}
		this.count = 0;
	},
	
	
	iterate: function() {
		this.count++;
		for(var i = 0; i < this.vCount; i++) {
			var point = this.points[i];
			var seekPoint = this.seekPoints[i];
			var vector = seekPoint.subtract(point).divide(20);
			this.points[i] = point.add(vector);
			if(vector.getLength() < 0.1)
				this.seekPoints[i] = this.getRandomPoint();
		}
		this.point = this.points[this.count % this.vCount];
	} ,
		
	getPoints: function() {
		var points = this.points.slice(0);
		points.push(this.getMousePoint());
		return points;
	}
});

var CircleAnimator = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.frameRate = 30;
		this.name = 'Circle Animator';
		this.vector = new Point(200, 0);
	},
	
	iterate: function() {
		this.vector = this.vector.rotate(10);
		this.point = this.center.add(this.vector);//this.point.add(this.getMousePoint().subtract(this.point).divide(new Point(4, 4)));
	},
	
	getPoints: function() {
		return [this.point, this.getMousePoint()];
	}
});


var MultiAnimator2 = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.name = 'Multi Animator';
		this.vectors = [];
		this.vCount = 2;
		this.frameRate = 30;
		for(var i = 0; i < this.vCount; i++) {
			var offset = 200;//i % 2 ? 100 : 250;
			this.vectors.push(new Point(100, 0).rotate(20).rotate(360 / this.vCount * i).normalize(100 + i));
		}
		this.count = 0;
	},
	
	iterate: function() {
		this.count++;
		for(var i = 0, l = this.vectors.length; i < l; i++) {
			var vector = this.vectors[i];
			var sin = Math.abs(Math.sin(this.count / 30));
			this.vectors[i] = vector.rotate(3).normalize(200 * sin + 60);
		}

		this.point = this.center.add(this.vectors[this.count % this.vCount]);//this.getMousePoint().add(this.vector);//this.point.add(this.getMousePoint().subtract(this.point).divide(new Point(4, 4)));
	},
	
	getPoints: function() {
		var points = [];
		for(var i = 0, l = this.vectors.length; i < l; i++) {
			points.push(this.center.add(this.vectors[i]));
		}
		points.push(this.getMousePoint());
		return points;
	}
});

var MultiAnimator = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.name = 'Multi Animator';
		this.vectors = [];
		this.vCount = 12;
		this.frameRate = 40;
		// for(var i = 0; i < this.vCount; i++) {
		// 	var offset = 200;//i % 2 ? 100 : 250;
		// 	this.vectors.push(new Point(100, 0).rotate(360 / this.vCount * i).normalize(300 + i));
		// }
		for(var i = 0; i < this.vCount; i++) {
			var offset = 200;//i % 2 ? 100 : 250;
			this.vectors.push(new Point(100, 0).rotate(20).rotate(360 / this.vCount * i).normalize(100 + i));
		}
		this.count = 0;
	},
	
	iterate: function() {
		this.count++;
		for(var i = 0, l = this.vectors.length; i < l; i++) {
			var vector = this.vectors[i];
			var firstSine = Math.sin(this.count / 100);
			var secondSine = Math.sin(this.count / 100 + Math.PI / 2);
			this.vectors[i] = vector.rotate(3).normalize(this.flasher.mousePoint.getDistance(this.center) * (i % 2 ? secondSine : firstSine));
		}

		this.point = this.center.add(this.vectors[this.count % this.vCount]);//this.getMousePoint().add(this.vector);//this.point.add(this.getMousePoint().subtract(this.point).divide(new Point(4, 4)));
	},
	
	getPoints: function() {
		var points = [];
		for(var i = 0, l = this.vectors.length; i < l; i++) {
			points.push(this.center.add(this.vectors[i]));
		}
		// points.push(this.getMousePoint());
		return points;
	}
});

var DVDAnimator = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.vector = new Point(100, 0).rotate(45).normalize(8);
		this.point = new Point(this.width / 2, this.height / 2);
	},
	
	iterate: function() {
		var pre = this.point.add(this.vector);
		if(pre.x < 0 || pre.x > this.width)
			this.vector.x = -this.vector.x;
		if(pre.y < 0 || pre.y > this.height) {
			this.vector.y = -this.vector.y;
		}
		this.point = this.point.add(this.vector);
	},
	
	getPoints: function() {
		return [this.point, this.getMousePoint()];
	}
});

var BallBouncerAnimator = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.frameRate = 100;
		this.vector = new Point(100, 0).rotate(45).normalize(30);
		this.point = new Point(this.width / 2, this.height / 2);
		this.dampen = 0.6;
		this.gravity = 0.8;
		this.bounce = -0.9;
	},
	
	iterate: function() {
		this.vector.y += this.gravity;

		var pre = this.point.add(this.vector);
		if(pre.x < 0 || pre.x > this.width) {
			this.vector.x *= -this.dampen;
			// this.vector.rotate(Math.random() * 5 - 2.5);
		}
		if(pre.y < 0 || pre.y > this.height) {
			this.vector.y *= this.bounce;
			// this.vector.rotate(Math.random() * 5 - 2.5);
		}
		this.point = this.point.add(this.vector);
		if(Math.abs(this.vector.x) < 3) {
			this.vector.x = 20;
			// this.vector.setLength(25);
			// this.vector.y *= 2;
			this.gravity *= -1;
		}
	},
	getPoints: function() {
		return [this.point, this.getMousePoint()];
	}
});

var BallBouncers = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.frameRate = 100;
		this.balls = [];
		for(var i = 0; i < 3; i++) {
			var startPos = Point.random().multiply(flasher.grid.realSize);
			var ball = new Ball(startPos, this);
			this.balls.push(ball);
		}
		this.count = 0;
	},
	iterate: function() {
		for(var i = 0, l = this.balls.length; i < l; i++) {
			var ball = this.balls[i];
			ball.iterate();
		}
		this.point = new Point(this.balls[this.count % this.balls.length].point);
		this.count++;
	},
	getPoints: function() {
		var points = [];
		for(var i = 0, l = this.balls.length; i < l; i++) {
			points.push(this.balls[i].point);
		}
		points.push(this.getMousePoint());
		return points;
	}
});

var Ball = Base.extend({
	initialize: function(point, animator) {
		this.vector = new Point(100, 0).rotate(45).normalize(Math.random() * 8 + 8);
		this.point = point;
		this.animator = animator;
		this.size = animator.flasher.grid.realSize;
	},
	
	checkCollisions: function() {
		var balls = this.animator.balls;
		for(var i = 0, l = balls.length; i < l; i++) {
			var ball = balls[i];
			if(ball != this) {
				if(ball.point.getDistance(this.point) < 50) {
					this.vector = this.vector.rotate(45);
				}
			}
		}
	},
	
	iterate: function() {
		var pre = this.point.add(this.vector);
		if(pre.x < 0 || pre.x > this.size.x)
			this.vector.x = -this.vector.x;
		if(pre.y < 0 || pre.y > this.size.y) {
			this.vector.y = -this.vector.y;
		}
		this.checkCollisions();
		this.point = this.point.add(this.vector);
	}
});

var MouseFollower = Animator.extend({
	initialize: function(flasher, point) {
		this.base(flasher, point);
		this.frameRate = 100;
	},
	iterate: function() {
		if(this.flasher && this.flasher.mousePoint) {
			var vector = this.flasher.mousePoint.subtract(this.point);//.divide(6);
			this.point = this.point.add(vector);//new Point(this.balls[this.count % this.balls.length].point);
		}
	}
});