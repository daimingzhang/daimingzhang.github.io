load('http://code.jquery.com/jquery-1.4.4.min.js', 'js/Bootstrap.js', 'js/Stats.js')
.then('js/Grid.js', 'js/rhill-voronoi-core.js', 'js/VoronoiGrid.js', 'js/colors.js', 'js/Point.js', 'js/Flasher.js', 'js/Animator.js')
.thenRun(function () {
	$(function() {
		if($.browser.msie && parseInt(jQuery.browser.version) <= 9) {
			$('#noie').toggleClass('hide');
		} else {
			var flasher = new Flasher({
				animators: [MouseFollower]
			});
		}
	});
});