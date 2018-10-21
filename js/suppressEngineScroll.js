(function() {
	var oldScrollX = 0;
	var oldScrollY = 0;
	
	jQuery(document)
	.on(":passageinit", function() {
		oldScrollX = window.pageXOffset;
		oldScrollY = window.pageYOffset;
	})
	.on(":passagedisplay", function() {
		if(currPassage.section != 1 || State.length != State.size)
		window.scroll(oldScrollX, oldScrollY);
	});
})();