function commands() {
    var commandDiv = document.createElement('div');
    commandDiv.className = 'commandDiv';
    commandDiv.style.position = 'absolute';
    commandDiv.style.width = '55%';
    commandDiv.style.height = '3%';
    commandDiv.style.opacity = '0.86';
    commandDiv.style.left = '0';
    commandDiv.style.right = '0';
    commandDiv.style.marginLeft = 'auto';
    commandDiv.style.marginRight = 'auto';
    commandDiv.style.top = '0px';
    document.body.appendChild(commandDiv);

    commandDiv.innerHTML += '<input type="text" class="commandInput" placeHolder="A command..." />';
    var commandInput = document.getElementsByClassName('commandInput')[0];
    commandInput.focus();

    commandInput.style.width = '100%';
    commandInput.style.paddingLeft = '5px';
    commandInput.style.paddingRight = '5px';
    commandInput.style.opacity = '0.86';
    commandInput.style.height = '100%';
    commandInput.style.textAlign = 'left';

    var commandString;
    var bigCrunch = {
        'bigCrunchTimer': 0,
        'indexesWhite': [],
        'indexesYellow': [],
        'indexesBlue': [],
        'indexesRed': [],
        'indexesObject': [],
        'whiteEnded': false,
        'yellowEnded': false,
        'blueEnded': false,
        'redEnded': false,
        'objectEnded': false,
        'speed': game_settings.big_bang.speed,
        'text': 0
    };

    var screenCenter = {
        'x': window.screenWidth / 2,
        'y': window.screenHeight / 2,
        'width': 0,
        'height': 0,
        'distance': 0
    };

    commandInput.addEventListener('keypress', function(e) {

        if (e.keyCode === 13) {
            commandString = commandInput.value;

            if (commandString.contains('help') || commandString.toLowerCase().contains('help')) {
                alert('Available commands: <br /><center><strong>help</strong> \
                    <br /> <strong>delete</strong> \
                    <br /> <strong>move</strong> \
                    <br /> <strong>resize</strong> \
                    <br /> <strong>bigCrunch</strong> \
                    <br /> <strong>bigBang</strong> \
                    <br /> <strong>import</strong> \
                    <br /> <strong>export</strong> \
                    <br /> <strong>clear</strong> \
                    <br /> <strong>resize</strong> \
                    <br /> <strong>fullscreen</strong> \
                    <br /> <strong>version</strong> \
                    <br /> <strong>changelog</strong> \
                </center>');
                commandInput.value = '';
            }

            if (commandString.contains('delete') || commandString.toLowerCase().contains('delete')) {


                commandInput.value = '';
                commandInput.focus();
            }

            if (commandString.contains('move')) {

            }

            if (commandString.contains('resize')) {

            }

            if (commandString.contains('bigCrunch') || commandString.toLowerCase().contains('bigcrunch')) {

                if (window.theBigBang.isEnded === true) {
                    window.theBigBang.isEnded = false;

                    bigCrunch.bigCrunchTimer = window.setInterval(function() {
                        for (i = 0; i < game_settings.stars_settings.white; i++) {
                            if (bigCrunch.indexesWhite.indexOf(i) === -1) {
                                screenCenter.width = window['white_star' + i].getCoordinates().x - screenCenter.x;
                                screenCenter.height = window['white_star' + i].getCoordinates().y - screenCenter.y;

                                screenCenter.distance = (screenCenter.width * screenCenter.width) + (screenCenter.height * screenCenter.height);

                                if (screenCenter.distance < 0) {
                                    screenCenter.distance = -screenCenter.distance;
                                }

                                screenCenter.distance = Math.sqrt(screenCenter.distance);

                                if (Math.abs(screenCenter.x - window['white_star' + i].getCoordinates().x) < 1 && Math.abs(screenCenter.y - window['white_star' + i].getCoordinates().y) < 1) {
                                    bigCrunch.indexesWhite.push(i);
                                } else {
                                    window['white_star' + i].move({
                                        x: window['white_star' + i].getCoordinates().x - screenCenter.width / screenCenter.distance * bigCrunch.speed,
                                        y: window['white_star' + i].getCoordinates().y - screenCenter.height / screenCenter.distance * bigCrunch.speed
                                    });
                                }

                            } else {
                                if (bigCrunch.indexesWhite.length === game_settings.stars_settings.white) {
                                    bigCrunch.whiteEnded = true;
                                }
                            }
                        }

                        for (i = 0; i < game_settings.stars_settings.yellow; i++) {
                            if (bigCrunch.indexesYellow.indexOf(i) === -1) {
                                screenCenter.width = window['yellow_star' + i].getCoordinates().x - screenCenter.x;
                                screenCenter.height = window['yellow_star' + i].getCoordinates().y - screenCenter.y;

                                screenCenter.distance = (screenCenter.width * screenCenter.width) + (screenCenter.height * screenCenter.height);

                                if (screenCenter.distance < 0) {
                                    screenCenter.distance = -screenCenter.distance;
                                }

                                screenCenter.distance = Math.sqrt(screenCenter.distance);

                                if (Math.abs(screenCenter.x - window['yellow_star' + i].getCoordinates().x) < 1 && Math.abs(screenCenter.y - window['yellow_star' + i].getCoordinates().y) < 1) {
                                    bigCrunch.indexesYellow.push(i);
                                } else {
                                    window['yellow_star' + i].move({
                                        x: window['yellow_star' + i].getCoordinates().x - screenCenter.width / screenCenter.distance * bigCrunch.speed,
                                        y: window['yellow_star' + i].getCoordinates().y - screenCenter.height / screenCenter.distance * bigCrunch.speed
                                    });
                                }

                            } else {
                                if (bigCrunch.indexesYellow.length === game_settings.stars_settings.yellow) {
                                    bigCrunch.yellowEnded = true;
                                }
                            }
                        }

                        for (i = 0; i < game_settings.stars_settings.blue; i++) {
                            if (bigCrunch.indexesBlue.indexOf(i) === -1) {
                                screenCenter.width = window['blue_star' + i].getCoordinates().x - screenCenter.x;
                                screenCenter.height = window['blue_star' + i].getCoordinates().y - screenCenter.y;

                                screenCenter.distance = (screenCenter.width * screenCenter.width) + (screenCenter.height * screenCenter.height);

                                if (screenCenter.distance < 0) {
                                    screenCenter.distance = -screenCenter.distance;
                                }

                                screenCenter.distance = Math.sqrt(screenCenter.distance);

                                if (Math.abs(screenCenter.x - window['blue_star' + i].getCoordinates().x) < 1 && Math.abs(screenCenter.y - window['blue_star' + i].getCoordinates().y) < 1) {
                                    bigCrunch.indexesBlue.push(i);
                                } else {
                                    window['blue_star' + i].move({
                                        x: window['blue_star' + i].getCoordinates().x - screenCenter.width / screenCenter.distance * bigCrunch.speed,
                                        y: window['blue_star' + i].getCoordinates().y - screenCenter.height / screenCenter.distance * bigCrunch.speed
                                    });
                                }

                            } else {
                                if (bigCrunch.indexesBlue.length === game_settings.stars_settings.blue) {
                                    bigCrunch.blueEnded = true;
                                }
                            }
                        }

                        for (i = 0; i < game_settings.stars_settings.red; i++) {
                            if (bigCrunch.indexesRed.indexOf(i) === -1) {
                                screenCenter.width = window['red_star' + i].getCoordinates().x - screenCenter.x;
                                screenCenter.height = window['red_star' + i].getCoordinates().y - screenCenter.y;

                                screenCenter.distance = (screenCenter.width * screenCenter.width) + (screenCenter.height * screenCenter.height);

                                if (screenCenter.distance < 0) {
                                    screenCenter.distance = -screenCenter.distance;
                                }

                                screenCenter.distance = Math.sqrt(screenCenter.distance);

                                if (Math.abs(screenCenter.x - window['red_star' + i].getCoordinates().x) < 1 && Math.abs(screenCenter.y - window['red_star' + i].getCoordinates().y) < 1) {
                                    bigCrunch.indexesRed.push(i);
                                } else {
                                    window['red_star' + i].move({
                                        x: window['red_star' + i].getCoordinates().x - screenCenter.width / screenCenter.distance * bigCrunch.speed,
                                        y: window['red_star' + i].getCoordinates().y - screenCenter.height / screenCenter.distance * bigCrunch.speed
                                    });
                                }

                            } else {
                                if (bigCrunch.indexesRed.length === game_settings.stars_settings.red) {
                                    bigCrunch.redEnded = true;
                                }
                            }
                        }

                        for (i = 0, len = game_settings.added_objects.length; i < len; i++) {
                            if (bigCrunch.indexesObject.indexOf(i) === -1) {
                                screenCenter.width = window['object_' + i].getCoordinates().x - screenCenter.x;
                                screenCenter.height = window['object_' + i].getCoordinates().y - screenCenter.y;

                                screenCenter.distance = (screenCenter.width * screenCenter.width) + (screenCenter.height * screenCenter.height);

                                if (screenCenter.distance < 0) {
                                    screenCenter.distance = -screenCenter.distance;
                                }

                                screenCenter.distance = Math.sqrt(screenCenter.distance);

                                if (Math.abs(screenCenter.x - window['object_' + i].getCoordinates().x) < 1 && Math.abs(screenCenter.y - window['object_' + i].getCoordinates().y) < 1) {
                                    bigCrunch.indexesObject.push(i);
                                } else {
                                    window['object_' + i].move({
                                        x: window['object_' + i].getCoordinates().x - screenCenter.width / screenCenter.distance * bigCrunch.speed,
                                        y: window['object_' + i].getCoordinates().y - screenCenter.height / screenCenter.distance * bigCrunch.speed
                                    });

                                    window['object_' + i].resize({
                                        width: window['object_' + i].getCoordinates().width - (window['object_' + i].getCoordinates().width / screenCenter.distance * bigCrunch.speed),
                                        height: window['object_' + i].getCoordinates().height - (window['object_' + i].getCoordinates().height / screenCenter.distance * bigCrunch.speed)
                                    });
                                }

                            } else {
                                if (bigCrunch.indexesObject.length === game_settings.added_objects.length) {
                                    bigCrunch.objectEnded = true;
                                }
                            }                            

                        }

                        if (bigCrunch.whiteEnded === true && bigCrunch.yellowEnded === true && bigCrunch.blueEnded === true && bigCrunch.redEnded === true && bigCrunch.objectEnded === true) {
                            console.log('The Big Crunch ended.');
                            bigCrunch.indexesWhite.length = 0;
                            bigCrunch.indexesYellow.length = 0;
                            bigCrunch.indexesBlue.length = 0;
                            bigCrunch.indexesRed.length = 0;
                            bigCrunch.indexesObject.length = 0;
                            bigCrunch.whiteEnded = false;
                            bigCrunch.yellowEnded = false;
                            bigCrunch.blueEnded = false;
                            bigCrunch.redEnded = false;
                            bigCrunch.objectEnded = false;
                            clearInterval(bigCrunch.bigCrunchTimer);
                        }

                    }, 1000 / 60);
                }

                commandInput.value = '';
                commandInput.focus();
            }

            if (commandString.contains('import')) {

            }

            if (commandString.contains('bigBang') || commandString.toLowerCase().contains('bigbang')) {

                commandInput.value = '';
                commandInput.focus();
            }

            if (commandString.contains('export')) {

            }

            if (commandString.contains('clear')) {
                for(i = 0; i < game_settings.added_objects.length; i++) {
                    window['object_' + i].remove();
                    delete window['object_' + i];
                    game_settings.added_objects.splice(i, 1);
                }

                console.log(game_settings.added_objects)
            }

            if (commandString.contains('fullscreen')) {
                if ((document.fullScreenElement && document.fullScreenElement !== null) ||
                    (!document.mozFullScreen && !document.webkitIsFullScreen)) {
                    if (document.documentElement.requestFullScreen) {
                        document.documentElement.requestFullScreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullScreen) {
                        document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.cancelFullScreen) {
                        document.cancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    }
                }

                commandInput.value = '';
                commandInput.focus();
            }

            if (commandString.contains('version')) {

                commandInput.value = '';
            }

            if (commandString.contains('changelog')) {

                commandInput.value = '';
            }
        }

    }, false);

}