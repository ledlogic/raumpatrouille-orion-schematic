// applictaion singleton
var ros = {
	ctx: null,
	canvas: null,
	$canvas: null,
	fpts: [],
	$img: null,
	
	init: function() {
		// variable
		ros.$ctr = $('.ros-orion-container');
		ros.$canvas = $(".ros-orion-canvas");
		ros.canvas = ros.$canvas[0];
	    ros.ctx = ros.canvas.getContext("2d");

	    // events
	    ros.$img = $('.ros-orion');
	    ros.$ctr.zoom({onZoomIn: ros.onZoomIn, onZoomOut: ros.onZoomOut});
	    ros.$ctr.on('click', ros.onClick);
	    
	    // resize
	    ros.render();
	    $(window).on('resize', _.debounce(ros.render));
	},
	onClick: function(e) {		
		// fractional point
		var fpt = {x:e.offsetX /e.toElement.width, y:e.offsetY/e.toElement.height};
		ros.createFpt(fpt);
	},
	onZoomIn: function() {
		ros.$canvas.hide();
	},
	onZoomOut: function() {
		var $img = $(this);
		ros.$canvas.show();
	},
	createFpt: function(fpt) {
		ros.fpts.push(fpt);
		ros.render();
	},
	render: function() {
		ros.canvas.height = ros.$ctr.height();
		ros.canvas.width = ros.$ctr.width();
		ros.$canvas.height(ros.$ctr.height());
		ros.$canvas.width(ros.$ctr.width());
		
		// render fpts
		for (var i=0;i<ros.fpts.length;i++) {
			ros.renderFpt(ros.fpts[i]);
		}
	},
	renderFpt: function(fpt) {
		ros.ctx.beginPath();
	    ros.ctx.strokeStyle = "#0000ff";
	    ros.ctx.lineWidth = 0.5;
	    ros.ctx.ellipse(fpt.x*ros.$canvas.width(), fpt.y*ros.$canvas.height(), 4, 4, 0, 0, 2 * Math.PI);
	    ros.ctx.stroke();
	}
};

$(document).ready(function(){
	ros.init();
});