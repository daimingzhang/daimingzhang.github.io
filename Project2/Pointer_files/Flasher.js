window.trackOutboundLink = function(url) {
	_gaq.push(['_trackEvent', 'outbound', 'click', url]);
	setTimeout(function() {
		document.location = url;
	}, 1000);
}

var Flasher = Base.extend({
	initialize: function(param) {
		this.active = true;
		this.debug = false;
		var that = this;
		this.point = new Point();
		this.canvas = $('#flashes');
		this.ctx = this.canvas[0].getContext('2d');
		this.width = $(this.canvas).width();
		this.height = $(this.canvas).height();
		this.mousePoint = new Point(this.width / 3, this.height / 3);
		this.offset = new Point(20, 20);
		this.voronoiGrid = new VoronoiGrid(this.width, this.height);
		
		this.voronoi = new Voronoi();
		this.bbox = { xl: 0, xr: this.width, yt: 0, yb: this.height};
		
		this.animators = [];
		this.points = [];
		this.grid = new Grid({
			gridSize: new Point(30, 20),
			realSize: new Point(this.width, this.height)
		});
		
		for(var i = 0, l = param.animators.length; i < l; i++) {
			this.addAnimator(param.animators[i]);
		}

		$.getJSON('gridPositions.json', function(data) {
			var gridEntries = data.splice(0, 688);
			var srcs = [];
			for(var i = 0, l = gridEntries.length; i < l; i++) {
				var entry = gridEntries[i];
				entry.src = 'images/' + entry.src
				srcs.push(entry.src);
			}
			that.grid.populate(gridEntries);
			that.voronoiGrid.populate(gridEntries);
			that.preloaded(srcs);
			$("#loadingGfx").css("visibility", "hidden");
			$("#locating").html("Please move your cursor");
		});
		this.pointCount = 0;
	},
	
	preloaded: function() {
		if(this.debug) {
			this.stats = new Stats();

			// Align top-left
			this.stats.domElement.style.position = 'absolute';
			this.stats.domElement.style.left = '0px';
			this.stats.domElement.style.top = '0px';

			$('body').append( this.stats.domElement );
		}

		this.activateAnimator(0);
		// this.drawFrame();

		var that = this;
		var timeout;
		var timeout2;
		var first = true;
		var shown = false;
		var shownButton = false;
		var isReferred = /theuselessweb/.test(document.referrer);
		var likeMaxCount = isReferred ? 1 : 5;
		// setTimeout(function() {
			 var x, y;
			$("#content,#underlay").mousemove(function(e) {
				// Sometimes mousemove is fired twice on chrome:
				if(e.clientX == x && e.clientY == y)
					return;
				x = e.clientX;
				y = e.clientY;
				if (that.pointCount > likeMaxCount && !shown) {
					setTimeout(function() {
						$('#likeButton').animate({
							opacity: 1
						}, 500);
					}, 300);
					shown = true;
				} else if (that.pointCount > likeMaxCount + 1 && !shownButton) {
					setTimeout(function() {
						$('.fb-like span').animate({
							opacity: 1
						}, 500);
						$('.twitter-follow-button').animate({
							opacity: 1
						}, 500);
					}, 300);
					shownButton = true;
				}
				if (first) {
					$('#locating').html('Finding pointer... Please hold still.');
					$("#loadingGfx").css("visibility", "visible");
				}
				e.preventDefault();
				if (timeout) {
					clearTimeout(timeout);
					clearTimeout(timeout2);
				}
				var elem = this;
				timeout = setTimeout(function() {
					timeout2 = setTimeout(function() {
						that.mousePoint = new Point(e.pageX - elem.offsetLeft, e.pageY - elem.offsetTop);
						that.drawFrame();
						$('#flashes').show();
						that.pointCount++;
					}, 800);
					$('#locating').html('Pointer located. Pointing...');
				}, 1200);
				that.clearCanvas();
				$('#flashes').hide();
				$('#underlay').show();
			});
		// }, 2000);
	},
	
	log: function(string) {
		if(this.debug) {
			$('#message').html(string);
		}
	},
	
	drawFrame: function() {
		if(this.active) {
			if(this.debug)
				this.stats.update();
			this.animator.iterate();
			this.point = this.animator.getPoint();
			var gridPart = this.voronoiGrid.getNearestPoint(this.point);
			
			if (gridPart) {
				this.clearCanvas();
				this.log(gridPart.src + '?');
				this.oldSrc = gridPart.src;
				this.image = new Image();
				this.image.src = gridPart.src;
				var that = this;
				this.image.onload = function() {
					var position = new Point(gridPart.position.x, gridPart.position.y);
					var offset = that.point.subtract(position).subtract(that.offset).add(20, 20);
					that.ctx.drawImage(that.image, offset.x, offset.y);
					that.oldGridPart = gridPart;
					$('#locating').html('Finding pointer... Please hold still.');
					$('#underlay').hide();
				}
			}
			this.oldPoint = this.point;
			if(this.debug)
				this.drawCircle(this.point);
		}
	},
	
	removeOutsidePoints: function(points) {
		var selectedPoints = [];
		for(var i = 0, l = points.length; i < l; i++) {
			var point = points[i];
			if(point.x >= this.bbox.xl && point.x <= this.bbox.xr && point.y <= this.bbox.yb && point.y >= this.bbox.yt) {
				selectedPoints.push(point);
			}
		}
		return selectedPoints;
	},

	clearCanvas: function() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	},
	drawCircle: function(point) {
		this.ctx.beginPath();
		this.ctx.arc(point.x, point.y, 5, 0, Math.PI*2, true);
		this.ctx.closePath();
		this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
		this.ctx.fill();
	},
	
	addAnimator: function(animator) {
		this.animators.push(new animator(this));
	},
	
	activateAnimator: function(index) {
		for(var i = 0, l = this.animators.length; i < l; i++) {
			this.animators[i].setActive(false);
		}
		this.animatorIndex = index;
		this.animator = this.animators[index];
		this.animator.setActive(true);
	},
	
	activateNext: function(index) {
		var nextIndex = this.animatorIndex + 1 == this.animators.length ? 0 : this.animatorIndex + 1;
		this.activateAnimator(nextIndex);
	},
	
	activatePrevious: function(index) {
		var prevIndex = this.animatorIndex == 0 ? this.animators.length - 1 : this.animatorIndex - 1;
		this.activateAnimator(prevIndex);
	}
});