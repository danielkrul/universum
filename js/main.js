/*
	Main file
	Used variables:

	game_settings - settings.js

	window.screenWidth - stars.js
	window.screenHeight - stars.js
	window.CanvasPainting - stars.js


*/
'use strict';
window.addEventListener('load', init());

function init(){
	String.prototype.contains = function(it){ 
		return this.indexOf(it) != -1; 
	};
	
	game_settings;
	stars();
	FPS_meter();
	commands();
	add();
}
