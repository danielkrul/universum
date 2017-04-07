function FPS_meter(){
	var FPSText = new Text({
        x: 10,
        y: 20,
        parent: window.CanvasPainting
    });
    FPSText.setFont('1em Open Sans, Arial, sans-serif');
    FPSText.setColor('white');
    FPSText.setText('FPS: ');

	var countFPS = setInterval(function() {
        FPSText.setText('FPS: ' + window.CanvasPainting.getFPS());
    }, 500);
}