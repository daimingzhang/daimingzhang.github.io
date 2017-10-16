Grid = Base.extend({
	initialize: function(param) {
		this.gridSize = param.gridSize;
		this.realSize = param.realSize || param.gridSize;
		this.maxPoint = new Point(this.gridSize.x - 1, this.gridSize.y - 1);
		this.minPoint = new Point(0, 0);
		this.cellSize = this.realSize.divide(this.gridSize);
	},
	populate: function(entries) {
		this.entries = entries;
	},
	constrain: function(position) {
		var oldPos = new Point(position);
		position.x = Math.min(Math.max(position.x, this.minPoint.x), this.maxPoint.x);
		position.y = Math.min(Math.max(position.y, this.minPoint.y), this.maxPoint.y);
		return position;
	},
	convertToGridCoordinates: function(pos) {
		var halfCell = this.cellSize.divide(2);
		return pos.subtract(halfCell).divide(this.realSize).multiply(this.gridSize).round();
	},
	get: function(pos, gridCoords) {
		if(gridCoords)
			pos = this.convertToGridCoordinates(pos);
		this.position = this.constrain(pos);
		var index = this.getIndex(this.position);
		return this.entries[index];
	},
	getOffset: function(offset) {
		var position = this.constrain(offset.add(this.position));
		var index = this.getEntryIndex(position)
		return this.entries[index];
	},
	getIndex: function(position) {
		return position.x * this.gridSize.y + position.y;
	},
	getRandom: function() {
		var pos = Point.random().multiply(this.maxPoint).round();
		var index = this.getIndex(pos);
		return this.entries[index];
	}
});