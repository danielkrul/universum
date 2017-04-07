function add(){
	var i, infoLine, infoLineTop;
	var addingDiv = document.createElement('div');
	addingDiv.className = "adding";
	addingDiv.style.position = 'absolute';
	addingDiv.style.width = '8%';
	addingDiv.style.minWidth = '95px';
	addingDiv.style.height = '100%';
	addingDiv.style.top = '0px';
	addingDiv.style.right = '0';
	addingDiv.style.textAlign = 'center';
	addingDiv.style.overflow = 'auto';
	addingDiv.style.background = 'black';
	document.body.appendChild(addingDiv);

	for(i = 0; i < game_settings.objects.length; i++) {
		addingDiv.innerHTML += '<img class="' + i + '" src="' + game_settings.objects[i].image + '" width="' + game_settings.objects[i].width + '" height="' + game_settings.objects[i].height + '" />';
		
	} 

	for(i = 0; i < game_settings.objects.length; i++) {
		document.getElementsByClassName(i)[0].addEventListener('mouseover', function(e) {
			infoLine = new LineTo({
				x: addingDiv.offsetLeft - 100,
				y: this.offsetTop + game_settings.objects[this.className].height / 2 - addingDiv.scrollTop,
				xt: addingDiv.offsetLeft,
				yt: this.offsetTop + game_settings.objects[this.className].height / 2 - addingDiv.scrollTop,
				parent: window.CanvasPainting,
				fill: 'white'
			});

			infoLineTop = new LineTo({
				x: addingDiv.offsetLeft - 140,
				y: this.offsetTop + game_settings.objects[this.className].height / 2 + 20 - addingDiv.scrollTop,
				xt: addingDiv.offsetLeft - 100,
				yt: this.offsetTop + game_settings.objects[this.className].height / 2 - addingDiv.scrollTop,
				parent: window.CanvasPainting,
				fill: 'white'
			});

			infoText = new Text({
				x: addingDiv.offsetLeft - 200,
				y: this.offsetTop + game_settings.objects[this.className].height / 2 - addingDiv.scrollTop + 35,
				parent: window.CanvasPainting
			});
			infoText.setFont('13px PressStart2P, Arial, sans-serif');
			infoText.setColor('white');
			infoText.setTextAlign('center');

			objectsInfo = game_settings.objects[this.className].info;
			textIndex = 0;
			countText = setInterval(function() {
				infoText.setText(infoText.getText() + objectsInfo.split('')[textIndex]);

				if(textIndex >= objectsInfo.length - 1) {
					textIndex = 0;
					clearInterval(countText);
				} else {
					textIndex++;
				}
			}, 90);
		}, false);

		document.getElementsByClassName(i)[0].addEventListener('mouseout', function(e) {
			infoLine.remove();
			infoLineTop.remove();
			infoText.remove();
			clearInterval(countText);
		}, false);

		document.getElementsByClassName(i)[0].addEventListener('click', clickEvent, false);
	}  

	var line = {
		'width': 0,
		'height': 0,
		'distance': 0,
		'clicked': false,
		'buffer': {
			'x': 0,
			'y': 0
		},
		'objectId': 0,
		'choosed': -1
	};

	function clickEvent(e){
		for (var i = 0; i < game_settings.objects.length; i++) {
			document.getElementsByClassName(i)[0].style.border = 'none';
		};
		this.style.border = '1px dotted white';
		line.choosed = this.className;
	}

	function mouseMove(e) {
		if(window.theBigBang.isEnded === true && e.button === 0 && line.clicked === true){
			window['linePush'].move({
				'xt': e.clientX,
				'yt': e.clientY
			});
		}
	}

	function mouseUp(e) {
		if(window.theBigBang.isEnded === true && e.button === 0 && line.clicked === true && line.choosed > -1){
			line.clicked = false;
			window['object_' + line.objectId] = new drawImage({
				x: line.buffer.x,
				y: line.buffer.y,
				width: game_settings.objects[line.choosed].real_width,
				height: game_settings.objects[line.choosed].real_height,
				url: game_settings.objects[line.choosed].image,
				parent: window.CanvasPainting
			});

			line.width = window['linePush'].getCoordinates().xt - line.buffer.x;
			line.height = window['linePush'].getCoordinates().yt - line.buffer.y;
			line.distance = Math.sqrt(Math.pow(line.width, 2) + Math.pow(line.height, 2));

			if(line.distance === 0){
				game_settings.added_objects.push({
					'mass': game_settings.objects[line.choosed].mass,
					'rotate': game_settings.objects[line.choosed].rotate,
					'rotateAngle': game_settings.objects[line.choosed].rotateAngle,
					'velocity': {
						'x': 0,
						'y': 0
					} 
				});
			} else {
				game_settings.added_objects.push({
					'mass': game_settings.objects[line.choosed].mass,
					'rotate': game_settings.objects[line.choosed].rotate,
					'rotateAngle': game_settings.objects[line.choosed].rotateAngle,
					'velocity': {
						'x': line.width / line.distance * Math.ceil(line.distance) / 10,
						'y': line.height / line.distance * Math.ceil(line.distance) / 10
					}
				});
			}

			

			window['linePush'].remove();
			line.objectId++;
			CanvasPainting.callback().removeEventListener('mousemove', mouseMove, false);
		}
		
	}

	function mouseDown(e) {
		if(window.theBigBang.isEnded === true && e.button === 0 && line.choosed > -1){
			window['linePush'] = new LineTo({
				x: e.clientX,
				y: e.clientY,
				xt: e.clientX,
				yt: e.clientY,
				parent: window.CanvasPainting
			});
			window['linePush'].setColor('white');

			line.clicked = true;
			line.buffer.x = e.clientX;
			line.buffer.y = e.clientY;
			window.CanvasPainting.callback().addEventListener('mousemove', mouseMove, false);
		}
	}

	window.CanvasPainting.callback().addEventListener('mousedown', mouseDown, false);
	window.CanvasPainting.callback().addEventListener('mouseup', mouseUp, false);

}