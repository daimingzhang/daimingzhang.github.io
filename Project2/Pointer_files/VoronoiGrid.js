VoronoiGrid = Base.extend({
	initialize: function(width, height) {
		this.voronoi = new Voronoi();
		this.sites = {};
		this.bbox = { xl: 0, xr: width, yt: 0, yb: height};
		this.canvas = document.getElementById('data');
		this.ctx = this.canvas.getContext('2d');
	},

	populate: function(entries) {
		var points = [];
		for(var i = 0, l = entries.length; i < l; i++) {
			var entry = entries[i];
			points.push(new Point(entry.position.x, entry.position.y).round());
		}
		this.voronoi.setSites(points);
		var diagram = this.voronoi.compute(this.bbox);
		// how many sites do we have?
		var sites = diagram.sites;
		
		for(var i = 0, l = sites.length; i < l; i++) {
			var cell = diagram.cells[sites[i].id];
			// there is no guarantee a Voronoi cell will exist for any
			// particular site
			if (cell !== undefined) {
				var color = colors[i];
				this.sites[color] = entries[i];
				var halfedges = cell.halfedges;
				var nHalfedges = halfedges.length;
				if (nHalfedges < 3) return;
				var v = halfedges[0].getStartpoint();
				this.ctx.beginPath();
				this.ctx.moveTo(v.x,v.y);
				for (var iHalfedge=0; iHalfedge<nHalfedges; iHalfedge++) {
					v = halfedges[iHalfedge].getEndpoint();
					this.ctx.lineTo(v.x,v.y);
				}
				this.ctx.fillStyle = '#' + color;
				this.ctx.fill();
			}
		}
	},
	getNearestPoint: function(point) {
		var pos = point.floor();
		var color = this.getColor(pos);
		var nearest = this.sites[color];
		if(!nearest) {
			pos.x += 2;
			pos.y += 2;
			color = this.getColor(pos);
			nearest = this.sites[color];
		}
		if(!nearest) {
			this.ctx.beginPath();
			this.ctx.rect(pos.x-0.5,pos.y-0.5,1,1);
			this.ctx.stroke();
		}
		return nearest;
	},
	getColor: function(point) {
		var data = this.ctx.getImageData(point.x, point.y, 1, 1).data;
		var hex = [];
		for (var i = 0; i < 3; i++) {
			var bit = (data[i] - 0).toString(16);
			hex.push(bit.length == 1 ? '0' + bit : bit);
		}
		return hex.join('').toUpperCase();
	}
});