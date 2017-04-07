function stars(){
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;

	var i, c;

	var CanvasPainting = new Canvas({
		x: 0,
		y: 0,
		width: screenWidth,
		height: screenHeight,
		parent: document.body,
		child: '#screen'
	});
	CanvasPainting.setBackground({
		color: 'rgba(0, 0, 0, 1.0)'
	});
	CanvasPainting.callback().style.cursor = 'none';
	//CanvasPainting.autoResize();

	for(i = 0; i < game_settings.stars_settings.white; i++) {

		window['white_star' + i] = new Circle({
			x: screenWidth / 2,
			y: screenHeight / 2,
			radius: Math.random(),
			parent: CanvasPainting
		});

		window['white_star' + i].setFill('white');
	}

	for(i = 0; i < game_settings.stars_settings.yellow; i++) {

		window['yellow_star' + i] = new Circle({
			x: screenWidth / 2,
			y: screenHeight / 2,
			radius: Math.random(),
			parent: CanvasPainting
		});

		window['yellow_star' + i].setFill('yellow');
	}

	for(i = 0; i < game_settings.stars_settings.blue; i++) {

		window['blue_star' + i] = new Circle({
			x: screenWidth / 2,
			y: screenHeight / 2,
			radius: Math.random(),
			parent: CanvasPainting
		});

		window['blue_star' + i].setFill('blue');
	}

	for(i = 0; i < game_settings.stars_settings.red; i++) {

		window['red_star' + i] = new Circle({
			x: screenWidth / 2,
			y: screenHeight / 2,
			radius: Math.random(),
			parent: CanvasPainting
		});

		window['red_star' + i].setFill('darkred');
	}

	/*
		Let the Big Bang will begin!
	*/

	/*var bigBangText = new Text({x: 0, y: screenHeight / 2, parent: CanvasPainting});
	bigBangText.setFont('1em Open Sans, Arial, sans-serif');
    bigBangText.setColor('white');
    bigBangText.setText(game_settings.big_bang.text);*/

	var theBigBang = {
		'isEnded': false,
		'xWhite': [],
		'yWhite': [],
		'xYellow': [],
		'yYellow': [],
		'xBlue': [],
		'yBlue': [],
		'xRed': [],
		'yRed': [],
		'width': 0,
		'height': 0,
		'distance': 0,
		'bigBangTimer': 0,
		'minusWidth': 0,
		'minusHeight': 0,
		'isWhite': false,
		'isYellow': false,
		'isBlue': false,
		'isRed': false,
		'indexesWhite': [],
		'indexesYellow': [],
		'indexesBlue': [],
		'indexesRed': [],
		'whiteEnded': false,
		'yellowEnded': false,
		'blueEnded': false,
		'redEnded': false,
		'speed': game_settings.big_bang.speed
	};

	theBigBang.bigBangTimer = window.setInterval(function() {
		if(theBigBang.isWhite === false) {
			for(i = 0; i < game_settings.stars_settings.white; i++) {
				theBigBang.currentRadius = window['white_star' + i].getCoordinates().radius;
				theBigBang.xWhite[i] = Math.floor(Math.random() * (screenWidth - theBigBang.currentRadius)) + theBigBang.currentRadius;
				theBigBang.yWhite[i] = Math.floor(Math.random() * (screenHeight - theBigBang.currentRadius)) + theBigBang.currentRadius;
			}

			theBigBang.isWhite = true;
		}

		if(theBigBang.isYellow === false) {
			for(i = 0; i < game_settings.stars_settings.yellow; i++) {
				theBigBang.currentRadius = window['yellow_star' + i].getCoordinates().radius;
				theBigBang.xYellow[i] = Math.floor(Math.random() * (screenWidth - theBigBang.currentRadius)) + theBigBang.currentRadius;
				theBigBang.yYellow[i] = Math.floor(Math.random() * (screenHeight - theBigBang.currentRadius)) + theBigBang.currentRadius;
			}

			theBigBang.isYellow = true;
		}

		if(theBigBang.isBlue === false) {
			for(i = 0; i < game_settings.stars_settings.blue; i++) {
				theBigBang.currentRadius = window['blue_star' + i].getCoordinates().radius;
				theBigBang.xBlue[i] = Math.floor(Math.random() * (screenWidth - theBigBang.currentRadius)) + theBigBang.currentRadius;
				theBigBang.yBlue[i] = Math.floor(Math.random() * (screenHeight - theBigBang.currentRadius)) + theBigBang.currentRadius;
			}

			theBigBang.isBlue = true;
		}

		if(theBigBang.isRed === false) {
			for(i = 0; i < game_settings.stars_settings.red; i++) {
				theBigBang.currentRadius = window['red_star' + i].getCoordinates().radius;
				theBigBang.xRed[i] = Math.floor(Math.random() * (screenWidth - theBigBang.currentRadius)) + theBigBang.currentRadius;
				theBigBang.yRed[i] = Math.floor(Math.random() * (screenHeight - theBigBang.currentRadius)) + theBigBang.currentRadius;
			}

			theBigBang.isRed = true;
		}

		for(i = 0; i < game_settings.stars_settings.white; i++) {
			if(theBigBang.indexesWhite.indexOf(i) === -1) {
				theBigBang.width = theBigBang.xWhite[i] - screenWidth / 2;
				theBigBang.height = theBigBang.yWhite[i] - screenHeight / 2;

				theBigBang.distance = (theBigBang.width * theBigBang.width) + (theBigBang.height * theBigBang.height);

				if(theBigBang.distance < 0) {
					theBigBang.distance = -theBigBang.distance;
				}

				theBigBang.distance = Math.sqrt(theBigBang.distance);

				theBigBang.minusWidth = theBigBang.width / theBigBang.distance * theBigBang.speed;
				theBigBang.minusHeight = theBigBang.height / theBigBang.distance * theBigBang.speed;

				if(theBigBang.minusWidth < 0) {
					theBigBang.minusWidth = -theBigBang.minusWidth;
				}
				if(theBigBang.minusHeight < 0) {
					theBigBang.minusHeight = -theBigBang.minusHeight;
				}

				if(Math.abs(theBigBang.xWhite[i] - window['white_star' + i].getCoordinates().x) >= theBigBang.speed / 2) {
					if(theBigBang.xWhite[i] >= screenWidth / 2 && theBigBang.yWhite[i] <= screenHeight / 2) {
						// 1

						window['white_star' + i].move({
							x: window['white_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['white_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xWhite[i] <= screenWidth / 2 && theBigBang.yWhite[i] <= screenHeight / 2) {
						// 2

						window['white_star' + i].move({
							x: window['white_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['white_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xWhite[i] <= screenWidth / 2 && theBigBang.yWhite[i] >= screenHeight / 2) {
						// 3

						window['white_star' + i].move({
							x: window['white_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['white_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}

					if(theBigBang.xWhite[i] >= screenWidth / 2 && theBigBang.yWhite[i] >= screenHeight / 2) {
						// 4

						window['white_star' + i].move({
							x: window['white_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['white_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}
				} else {
					theBigBang.indexesWhite.push(i);
				}
			} else {
				if(theBigBang.indexesWhite.length === game_settings.stars_settings.white) {
					theBigBang.whiteEnded = true;
				}
			}

		}

		////////////////////////////////////////////////////////////////////

		for(i = 0; i < game_settings.stars_settings.yellow; i++) {
			if(theBigBang.indexesYellow.indexOf(i) === -1) {
				theBigBang.width = theBigBang.xYellow[i] - screenWidth / 2;
				theBigBang.height = theBigBang.yYellow[i] - screenHeight / 2;

				theBigBang.distance = (theBigBang.width * theBigBang.width) + (theBigBang.height * theBigBang.height);

				if(theBigBang.distance < 0) {
					theBigBang.distance = -theBigBang.distance;
				}

				theBigBang.distance = Math.sqrt(theBigBang.distance);

				theBigBang.minusWidth = theBigBang.width / theBigBang.distance * theBigBang.speed;
				theBigBang.minusHeight = theBigBang.height / theBigBang.distance * theBigBang.speed;

				if(theBigBang.minusWidth < 0) {
					theBigBang.minusWidth = -theBigBang.minusWidth;
				}
				if(theBigBang.minusHeight < 0) {
					theBigBang.minusHeight = -theBigBang.minusHeight;
				}

				if(Math.abs(theBigBang.xYellow[i] - window['yellow_star' + i].getCoordinates().x) >= theBigBang.speed / 2) {
					if(theBigBang.xYellow[i] >= screenWidth / 2 && theBigBang.yYellow[i] <= screenHeight / 2) {
						// 1

						window['yellow_star' + i].move({
							x: window['yellow_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['yellow_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xYellow[i] <= screenWidth / 2 && theBigBang.yYellow[i] <= screenHeight / 2) {
						// 2

						window['yellow_star' + i].move({
							x: window['yellow_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['yellow_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xYellow[i] <= screenWidth / 2 && theBigBang.yYellow[i] >= screenHeight / 2) {
						// 3

						window['yellow_star' + i].move({
							x: window['yellow_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['yellow_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}

					if(theBigBang.xYellow[i] >= screenWidth / 2 && theBigBang.yYellow[i] >= screenHeight / 2) {
						// 4

						window['yellow_star' + i].move({
							x: window['yellow_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['yellow_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}
				} else {
					theBigBang.indexesYellow.push(i);
				}
			} else {
				if(theBigBang.indexesYellow.length === game_settings.stars_settings.yellow) {
					theBigBang.yellowEnded = true;
				}
			}

		}

		//////////////////////////////////////////////////////

		for(i = 0; i < game_settings.stars_settings.blue; i++) {
			if(theBigBang.indexesBlue.indexOf(i) === -1) {
				theBigBang.width = theBigBang.xBlue[i] - screenWidth / 2;
				theBigBang.height = theBigBang.yBlue[i] - screenHeight / 2;

				theBigBang.distance = (theBigBang.width * theBigBang.width) + (theBigBang.height * theBigBang.height);

				if(theBigBang.distance < 0) {
					theBigBang.distance = -theBigBang.distance;
				}

				theBigBang.distance = Math.sqrt(theBigBang.distance);

				theBigBang.minusWidth = theBigBang.width / theBigBang.distance * theBigBang.speed;
				theBigBang.minusHeight = theBigBang.height / theBigBang.distance * theBigBang.speed;

				if(theBigBang.minusWidth < 0) {
					theBigBang.minusWidth = -theBigBang.minusWidth;
				}
				if(theBigBang.minusHeight < 0) {
					theBigBang.minusHeight = -theBigBang.minusHeight;
				}

				if(Math.abs(theBigBang.xBlue[i] - window['blue_star' + i].getCoordinates().x) >= theBigBang.speed / 2) {
					if(theBigBang.xBlue[i] >= screenWidth / 2 && theBigBang.yBlue[i] <= screenHeight / 2) {
						// 1

						window['blue_star' + i].move({
							x: window['blue_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['blue_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xBlue[i] <= screenWidth / 2 && theBigBang.yBlue[i] <= screenHeight / 2) {
						// 2

						window['blue_star' + i].move({
							x: window['blue_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['blue_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xBlue[i] <= screenWidth / 2 && theBigBang.yBlue[i] >= screenHeight / 2) {
						// 3

						window['blue_star' + i].move({
							x: window['blue_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['blue_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}

					if(theBigBang.xBlue[i] >= screenWidth / 2 && theBigBang.yBlue[i] >= screenHeight / 2) {
						// 4

						window['blue_star' + i].move({
							x: window['blue_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['blue_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}
				} else {
					theBigBang.indexesBlue.push(i);
				}
			} else {
				if(theBigBang.indexesBlue.length === game_settings.stars_settings.blue) {
					theBigBang.blueEnded = true;
				}
			}

		}

		for(i = 0; i < game_settings.stars_settings.red; i++) {
			if(theBigBang.indexesRed.indexOf(i) === -1) {
				theBigBang.width = theBigBang.xRed[i] - screenWidth / 2;
				theBigBang.height = theBigBang.yRed[i] - screenHeight / 2;

				theBigBang.distance = (theBigBang.width * theBigBang.width) + (theBigBang.height * theBigBang.height);

				if(theBigBang.distance < 0) {
					theBigBang.distance = -theBigBang.distance;
				}

				theBigBang.distance = Math.sqrt(theBigBang.distance);

				theBigBang.minusWidth = theBigBang.width / theBigBang.distance * theBigBang.speed;
				theBigBang.minusHeight = theBigBang.height / theBigBang.distance * theBigBang.speed;

				if(theBigBang.minusWidth < 0) {
					theBigBang.minusWidth = -theBigBang.minusWidth;
				}
				if(theBigBang.minusHeight < 0) {
					theBigBang.minusHeight = -theBigBang.minusHeight;
				}

				if(Math.abs(theBigBang.xRed[i] - window['red_star' + i].getCoordinates().x) >= theBigBang.speed / 2) {
					if(theBigBang.xRed[i] >= screenWidth / 2 && theBigBang.yRed[i] <= screenHeight / 2) {
						// 1

						window['red_star' + i].move({
							x: window['red_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['red_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xRed[i] <= screenWidth / 2 && theBigBang.yRed[i] <= screenHeight / 2) {
						// 2

						window['red_star' + i].move({
							x: window['red_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['red_star' + i].getCoordinates().y - theBigBang.minusHeight
						});
					}

					if(theBigBang.xRed[i] <= screenWidth / 2 && theBigBang.yRed[i] >= screenHeight / 2) {
						// 3

						window['red_star' + i].move({
							x: window['red_star' + i].getCoordinates().x - theBigBang.minusWidth,
							y: window['red_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}

					if(theBigBang.xRed[i] >= screenWidth / 2 && theBigBang.yRed[i] >= screenHeight / 2) {
						// 4

						window['red_star' + i].move({
							x: window['red_star' + i].getCoordinates().x + theBigBang.minusWidth,
							y: window['red_star' + i].getCoordinates().y + theBigBang.minusHeight
						});
					}
				} else {
					theBigBang.indexesRed.push(i);
				}
			} else {
				if(theBigBang.indexesRed.length === game_settings.stars_settings.red) {
					theBigBang.redEnded = true;
				}
			}

		}

		if(theBigBang.whiteEnded === true && theBigBang.yellowEnded === true && theBigBang.blueEnded === true && theBigBang.redEnded === true){
			theBigBang.isEnded = true;
			console.log('The Big Bang ended.');
			clearInterval(theBigBang.bigBangTimer);
		}

	}, 16);

	/*
		Moving with stars
	*/

	var bufferMove = {
		'x': 0,
		'y': 0
	};

	function mouseMove(e) {
		if(e.button === 1 && theBigBang.isEnded === true) {
			for(i = 0; i < game_settings.stars_settings.white; i++) {
				window['white_star' + i].move({
					x: window['white_star' + i].getCoordinates().x + (e.offsetX - bufferMove.x),
					y: window['white_star' + i].getCoordinates().y + (e.offsetY - bufferMove.y)
				});
			}

			for(i = 0; i < game_settings.stars_settings.yellow; i++) {
				window['yellow_star' + i].move({
					x: window['yellow_star' + i].getCoordinates().x + (e.offsetX - bufferMove.x),
					y: window['yellow_star' + i].getCoordinates().y + (e.offsetY - bufferMove.y)
				});
			}


			for(i = 0; i < game_settings.stars_settings.blue; i++) {
				window['blue_star' + i].move({
					x: window['blue_star' + i].getCoordinates().x + (e.offsetX - bufferMove.x),
					y: window['blue_star' + i].getCoordinates().y + (e.offsetY - bufferMove.y)
				});
			}

			for(i = 0; i < game_settings.stars_settings.red; i++) {
				window['red_star' + i].move({
					x: window['red_star' + i].getCoordinates().x + (e.offsetX - bufferMove.x),
					y: window['red_star' + i].getCoordinates().y + (e.offsetY - bufferMove.y)
				});
			}

			for(i = 0; i < game_settings.added_objects.length; i++) {
				window['object_' + i].move({
					x: window['object_' + i].getCoordinates().x + (e.offsetX - bufferMove.x),
					y: window['object_' + i].getCoordinates().y + (e.offsetY - bufferMove.y)
				});
			}

			bufferMove.x = e.offsetX;
			bufferMove.y = e.offsetY;
		}

	}

	function mouseUp(e) {
		if(e.button === 1 && theBigBang.isEnded === true) {
			CanvasPainting.callback().removeEventListener('mousemove', mouseMove, true);
		}
	}

	function mouseDown(e) {
		if(e.button === 1 && theBigBang.isEnded === true) {

			bufferMove.x = e.offsetX;
			bufferMove.y = e.offsetY;

			CanvasPainting.callback().addEventListener('mousemove', mouseMove, true);
		}
	}

	CanvasPainting.callback().addEventListener('mousedown', mouseDown, false);
	CanvasPainting.callback().addEventListener('mouseup', mouseUp, false);

	window['gravity'] = {
		'width': 0,
		'height': 0,
		'distance': 0,
		'constant': 0.01,
		'total': 0
	};

	function Vector(x, y) {
		this.x = x;
		this.y = y;
	}

	var forceSum;

	function loop() {


		for(i = 0; i < game_settings.added_objects.length; i++) {
			forceSum = new Vector(0, 0);

			for(c = 0; c < game_settings.added_objects.length; c++) {
				if(c !== i){
					window['gravity'].width = window['object_' + i].getCoordinates().x - window['object_' + c].getCoordinates().x;
					window['gravity'].height = window['object_' + i].getCoordinates().y - window['object_' + c].getCoordinates().y;

					window['gravity'].distance = Math.sqrt(Math.pow(window['gravity'].width, 2) + Math.pow(window['gravity'].height, 2));
					
					if (window['gravity'].distance < (window['object_' + i].getCoordinates().width / 3) + (window['object_' + c].getCoordinates().width / 3)) {
						//game_settings.added_objects.splice(c, 0);
						//window['object_' + c].remove();
					} else {
						window['gravity'].total = window['gravity'].constant * (game_settings.added_objects[i].mass * game_settings.added_objects[c].mass) / Math.pow(window['gravity'].distance, 2);

						forceSum.x -= Math.abs(window['gravity'].total * (window['gravity'].width / window['gravity'].distance)) * Math.sign(window['gravity'].width);
  						forceSum.y -= Math.abs(window['gravity'].total * (window['gravity'].height / window['gravity'].distance)) * Math.sign(window['gravity'].height);
					}
					
				}
			}

			game_settings.added_objects[i].velocity.x += forceSum.x / game_settings.added_objects[i].mass;
			game_settings.added_objects[i].velocity.y += forceSum.y / game_settings.added_objects[i].mass;
		}

		for(i = 0; i < game_settings.added_objects.length; i++) {
			window['object_' + i].move({
				x: window['object_' + i].getCoordinates().x + (game_settings.added_objects[i].velocity.x / 10),
				y: window['object_' + i].getCoordinates().y + (game_settings.added_objects[i].velocity.y / 10)
			});
		}

		window.requestAnimationFrame(loop);
	}

	window['mainCycle'] = window.requestAnimationFrame(loop);

	var yLine = new LineTo({x: 0, y: 10, xt: screenWidth, yt: 10, parent: CanvasPainting});
	yLine.setLineWidth(0.5);
	yLine.setLineDash(2);
	yLine.setColor('white');

	var xLine = new LineTo({x: 20, y: 0, xt: 10, yt: screenHeight, parent: CanvasPainting});
	xLine.setLineWidth(0.5);
	xLine.setLineDash(2);
	xLine.setColor('white');

	var xText = new Text({x: 0, y: screenHeight - 10, parent: CanvasPainting});
	xText.setFont('1em Open Sans, Arial, sans-serif');
    xText.setColor('white');
    xText.setText('x: ');

    var yText = new Text({x: 10, y: 0, parent: CanvasPainting});
	yText.setFont('1em Open Sans, Arial, sans-serif');
    yText.setColor('white');
    yText.setText('y: ');

	function lineSight(e){
		xLine.move({x: e.offsetX, xt: e.offsetX});
		yLine.move({y: e.offsetY, yt: e.offsetY});

		xText.move({x: e.offsetX + 10});
		xText.setText('x: ' + e.offsetX + 'px');

		yText.move({y: e.offsetY + 20});
		yText.setText('y: ' + e.offsetY + 'px');
	}

	CanvasPainting.callback().addEventListener('mousemove', lineSight, false);

	// Audio system

    var play = true;
    var audio = document.getElementById('bgmusic');
    audio.play();

    function againMusic() {
        audio.play();
    }

    audio.addEventListener('ended', function() {
        againMusic();
    });

    window['soundControl'] = new drawImage({
        x: 30,
        y: 50,
        width: 25,
        height: 25,
        url: './design/icons/sound.png',
        parent: CanvasPainting
    });

    window['soundControl'].click(function() {
        if(play === true) {
            window['soundControl'].setUrl('./design/icons/sound_mute.png');
            audio.pause();
            play = false;
        } else {
            window['soundControl'].setUrl('./design/icons/sound.png');
            audio.play();
            play = true;
        }
    });

    window['gravityConstant'] = new Text({
        x: 10,
        y: 90,
        parent: CanvasPainting
    });

    window['gravityConstant'].setFont('1em Open Sans, Arial, sans-serif');
    window['gravityConstant'].setColor('white');
    window['gravityConstant'].setText('Gravity constant: ' + window['gravity'].constant);

    CanvasPainting.callback().addEventListener('mousewheel', function(e) {
        if(e.wheelDelta > 0) {
        	console.log('Gravity constant up');
        	window['gravity'].constant *= 1.2;
        	window['gravityConstant'].setText('Gravity constant: ' + window['gravity'].constant);
        } else {
        	console.log('Gravity constant down');
        	window['gravity'].constant /= 1.2;
        	window['gravityConstant'].setText('Gravity constant: ' + window['gravity'].constant);
        }
    });

	window.CanvasPainting = CanvasPainting;
	window.screenWidth = screenWidth;
	window.screenHeight = screenHeight;
	window.theBigBang = theBigBang;
}