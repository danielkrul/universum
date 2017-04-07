var Canvas = function (params) {

    for(var current in params) {
        switch(current) {
            case 'x':
                this.x = params[current];
                break;

            case 'y':
                this.y = params[current];
                break;

            case 'width':
                this.width = params[current];
                break;

            case 'height':
                this.height = params[current];
                break;

            case 'parent':
                this.parent = params[current];
                break;

            case 'child':
                this.child = params[current];
                break;
        }
    }

    if(this.child[0] == '#') {
        this.child = this.child.substring(1);
        this.htmlCanvas = document.createElement('div');
        this.htmlCanvas.id = this.child;
        this.htmlCanvas.style.width = this.width + 'px';
        this.htmlCanvas.style.height = this.height + 'px';
        this.htmlCanvas.style.position = 'relative';
        this.parent.appendChild(this.htmlCanvas);

        this.canvas_1 = document.createElement('canvas');

        this.canvas_1.className = this.child + '_1';
        this.canvas_1.width = this.width;
        this.canvas_1.height = this.height;
        this.canvas_1.style.display = 'block';
        this.canvas_1.style.position = 'relative';

        this.htmlCanvas.appendChild(this.canvas_1);
    }

    if(this.child[0] == '.') {
        this.child = this.child.substring(1);
        this.htmlCanvas = document.createElement('div');
        this.htmlCanvas.className = this.child;
        this.htmlCanvas.style.width = this.width + 'px';
        this.htmlCanvas.style.height = this.height + 'px';
        this.htmlCanvas.style.position = 'relative';
        this.parent.appendChild(this.htmlCanvas);

        this.canvas_1 = document.createElement('canvas');

        this.canvas_1.className = this.child + '_1';
        this.canvas_1.width = this.width;
        this.canvas_1.height = this.height;
        this.canvas_1.style.position = 'relative';
        this.canvas_1.style.display = 'block';

        this.htmlCanvas.appendChild(this.canvas_1);
    }

    this.context_1 = this.canvas_1.getContext('2d');

    this.Objects = {
        'Circle': [],

        'Rectangle': [],

        'Text': [],

        'Image': [],

        'Line': []
    };

    var i, d, lines, image, length;
    var functionBuffer = this;

    var FPS_variables = {
        'startTime': Date.now(),
        'endTime': 0,
        'fps': 0,
        'PI': Math.PI * 2,
        'PI_radians': Math.PI / 180
    };

    function loop() {
        window.requestAnimationFrame(loop);

        FPS_variables.endTime = Date.now();
        if(FPS_variables.endTime > FPS_variables.startTime){
            FPS_variables.fps = (Math.ceil(1 / ((FPS_variables.endTime - FPS_variables.startTime) / 1000))); 
            if(FPS_variables.fps > 60){
                FPS_variables.fps = 60; 
            }
        }
        
        FPS_variables.startTime = Date.now();
    

        if(functionBuffer.Objects && functionBuffer.context_1) {

            functionBuffer.context_1.clearRect(0, 0, functionBuffer.context_1.canvas.width, functionBuffer.context_1.canvas.height);

            for(i = 0, len = functionBuffer.Objects.Circle.length; i < len; i++) {
                functionBuffer.context_1.save();
                functionBuffer.context_1.beginPath();
                functionBuffer.context_1.lineWidth = functionBuffer.Objects.Circle[i].lineWidth;
                functionBuffer.context_1.shadowColor = functionBuffer.Objects.Circle[i].shadowColor;
                functionBuffer.context_1.strokeStyle = functionBuffer.Objects.Circle[i].strokeStyle;
                functionBuffer.context_1.shadowBlur = functionBuffer.Objects.Circle[i].shadowBlur;
                functionBuffer.context_1.shadowOffsetX = functionBuffer.Objects.Circle[i].shadowOffsetX;
                functionBuffer.context_1.shadowOffsetY = functionBuffer.Objects.Circle[i].shadowOffsetY;
                functionBuffer.context_1.fillStyle = functionBuffer.Objects.Circle[i].fill;
                functionBuffer.context_1.arc(functionBuffer.Objects.Circle[i].x, functionBuffer.Objects.Circle[i].y, functionBuffer.Objects.Circle[i].radius, 0, FPS_variables.PI, true);
                functionBuffer.context_1.fill();
                functionBuffer.context_1.stroke();
                functionBuffer.context_1.restore();
            }

            for(i = 0, len = functionBuffer.Objects.Text.length; i < len; i++) {
                functionBuffer.context_1.save();
                functionBuffer.context_1.beginPath();
                functionBuffer.context_1.fillStyle = functionBuffer.Objects.Text[i].fill;
                functionBuffer.context_1.font = functionBuffer.Objects.Text[i].font;
                functionBuffer.context_1.textAlign = functionBuffer.Objects.Text[i].textAlign;
                lines = functionBuffer.Objects.Text[i].text.split('\n');

                for(d = 0; d < lines.length; d++) {
                    functionBuffer.context_1.fillText(lines[d], functionBuffer.Objects.Text[i].x, functionBuffer.Objects.Text[i].y + (d * parseInt(functionBuffer.Objects.Text[i].font + 5)));
                }
                functionBuffer.context_1.restore();

            }

            for(i = 0, len = functionBuffer.Objects.Line.length; i < len; i++) {
                functionBuffer.context_1.save();
                functionBuffer.context_1.setLineDash([functionBuffer.Objects.Line[i].lineDash, functionBuffer.Objects.Line[i].lineDash]);
                functionBuffer.context_1.beginPath();
                functionBuffer.context_1.moveTo(functionBuffer.Objects.Line[i].x, functionBuffer.Objects.Line[i].y);
                functionBuffer.context_1.lineTo(functionBuffer.Objects.Line[i].xt, functionBuffer.Objects.Line[i].yt);
                functionBuffer.context_1.lineWidth = functionBuffer.Objects.Line[i].lineWidth;
                functionBuffer.context_1.strokeStyle = functionBuffer.Objects.Line[i].fill;
                functionBuffer.context_1.stroke();
                functionBuffer.context_1.restore();
            }

            for(i = 0, len = functionBuffer.Objects.Rectangle.length; i < len; i++) {
                functionBuffer.context_1.setLineDash([functionBuffer.Objects.Rectangle[i].lineDash, functionBuffer.Objects.Rectangle[i].lineDash]);
                functionBuffer.context_1.beginPath();
                functionBuffer.context_1.rect(functionBuffer.Objects.Rectangle[i].x, functionBuffer.Objects.Rectangle[i].y, functionBuffer.Objects.Rectangle[i].width, functionBuffer.Objects.Rectangle[i].height);
                functionBuffer.context_1.fillStyle = functionBuffer.Objects.Rectangle[i].fill;
                functionBuffer.context_1.fill();
                functionBuffer.context_1.lineWidth = functionBuffer.Objects.Rectangle[i].lineWidth;
                functionBuffer.context_1.strokeStyle = functionBuffer.Objects.Rectangle[i].strokeStyle;
                functionBuffer.context_1.stroke();
                functionBuffer.context_1.restore();
            }

            length = functionBuffer.Objects.Image.length

            for(i = 0; i < length; i++) {
                image = new Image();
                image.src = functionBuffer.Objects.Image[i].url;

                functionBuffer.context_1.save();

                functionBuffer.context_1.globalAlpha = functionBuffer.Objects.Image[i].opacity;
                functionBuffer.context_1.translate(functionBuffer.Objects.Image[i].x, functionBuffer.Objects.Image[i].y);
                functionBuffer.context_1.rotate(functionBuffer.Objects.Image[i].angle * FPS_variables.PI_radians);
                functionBuffer.context_1.drawImage(image, -functionBuffer.Objects.Image[i].width / 2, -functionBuffer.Objects.Image[i].height / 2, functionBuffer.Objects.Image[i].width, functionBuffer.Objects.Image[i].height);
                functionBuffer.context_1.rotate(-(functionBuffer.Objects.Image[i].angle * FPS_variables.PI_radians));
                functionBuffer.context_1.translate(-functionBuffer.Objects.Image[i].x, -functionBuffer.Objects.Image[i].y);

                functionBuffer.context_1.restore();
            }

        }
    }
    loop();

    Canvas.prototype.getFPS = function(){
        return FPS_variables.fps;
    };

    Canvas.prototype.setBackground = function(params){
        for(var current in params) {
            switch(current) {
                case 'color':
                    this.color = params[current];
                    break;
            }
        }

        this.canvas_1.style.backgroundColor = this.color;
    };

    Canvas.prototype.setSize = function(params){
        for(var current in params) {
            switch(current) {
                case 'width':
                    this.width = params[current];
                    break;

                case 'height':
                    this.height = params[current];
                    break;
            }
        }

        this.htmlCanvas.style.width = this.width + 'px';
        this.htmlCanvas.style.height = this.height + 'px';

        this.canvas_1.width = this.width;
        this.canvas_1.height = this.height;
    };

    Canvas.prototype.callback = function(){
        return this.canvas_1;
    };

    Canvas.prototype.autoResize = function() {
        // TODO: Do it soon...
        var htmlCanvas = this.htmlCanvas;
        var canvas_1 = this.canvas_1;
        var Objects = this.Objects;

        window.addEventListener('resize', function(e) {
            /*htmlCanvas.style.width = window.innerWidth + 'px';
            htmlCanvas.style.height = window.innerHeight + 'px';

            canvas_1.width = window.innerWidth;
            canvas_1.height = window.innerHeight;*/
            location.reload();
        }, false);
    };

};

var Circle = function(params){

    for(var current in params) {
        switch(current) {
            case 'x':
                this.x = params[current];
                break;

            case 'y':
                this.y = params[current];
                break;

            case 'radius':
                this.radius = params[current];
                break;

            case 'fill':
                this.fill = params[current];
                break;

            case 'parent':
                this.parent = params[current];
                break;
        }
    }

    this.id = this.parent.Objects.Circle.length;

    this.parent.Objects.Circle.push({
        'x': this.x,
        'y': this.y,
        'radius': this.radius,
        'fill': this.fill,
        'lineWidth': 0,
        'strokeStyle': 'transparent',
        'shadowColor': '',
        'shadowBlur': 0,
        'shadowOffsetX': 0,
        'shadowOffsetY': 0
    });

    Circle.prototype.setFill = function(properties){
        this.parent.Objects.Circle[this.id].fill = properties;
    };

    Circle.prototype.move = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;
            }
        }

        this.parent.Objects.Circle[this.id].x = this.x;
        this.parent.Objects.Circle[this.id].y = this.y;
    };

    Circle.prototype.getCoordinates = function(){
        return {
            'x': this.x,
            'y': this.y,
            'radius': this.radius
        };
    };

    Circle.prototype.remove = function(){
        this.parent.Objects.Circle.splice(this.id, 1);
    };

    Circle.prototype.setShadow = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'shadowColor':
                    this.shadowColor = properties[current];
                    break;

                case 'shadowBlur':
                    this.shadowBlur = properties[current];
                    break;

                case 'shadowOffsetX':
                    this.shadowOffsetX = properties[current];
                    break;

                case 'shadowOffsetY':
                    this.shadowOffsetY = properties[current];
                    break;
            }
        }

        this.parent.Objects.Circle[this.id].shadowColor = this.shadowColor;
        this.parent.Objects.Circle[this.id].shadowBlur = this.shadowBlur;
        this.parent.Objects.Circle[this.id].shadowOffsetX = this.shadowOffsetX;
        this.parent.Objects.Circle[this.id].shadowOffsetY = this.shadowOffsetY;
    };

    Circle.prototype.resize = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'radius':
                    this.radius = properties[current];
                    break;

                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;
            }
        }

        this.parent.Objects.Circle[this.id].radius = this.radius;
        this.parent.Objects.Circle[this.id].x = this.x;
        this.parent.Objects.Circle[this.id].y = this.y;
    };

    Circle.prototype.click = function(properties){
        var buffering = this.parent.htmlCanvas;
        var x = this.x;
        var y = this.y
        var radius = this.radius;
        var id = this.id;

        buffering.addEventListener('click', function(e) {
            if ((e.pageX - buffering.offsetLeft) < x + radius && (e.pageX - buffering.offsetLeft) > x - radius && (e.pageY - buffering.offsetTop) > y - radius && (e.pageY - buffering.offsetTop) < y + radius) {
                function sameAsEval(inst) {

                    inst();
                }
                sameAsEval(properties);

                e.preventDefault();
                return false;
            }
        }, false);
    };

};

var Rectangle = function(params){

    for(var current in params) {
        switch(current) {
            case 'x':
                this.x = params[current];
                break;

            case 'y':
                this.y = params[current];
                break;

            case 'width':
                this.width = params[current];
                break;

            case 'height':
                this.height = params[current];
                break;

            case 'fill':
                this.fill = params[current];
                break;

            case 'parent':
                this.parent = params[current];
                break;
        }
    }

    this.id = this.parent.Objects.Rectangle.length;

    this.parent.Objects.Rectangle.push({
        'x': this.x,
        'y': this.y,
        'width': this.width,
        'height': this.height,
        'fill': this.fill,
        'lineWidth': 0,
        'strokeStyle': 'transparent',
        'shadowColor': '',
        'shadowBlur': 0,
        'shadowOffsetX': 0,
        'shadowOffsetY': 0,
        'lineDash': 0
    });

    Rectangle.prototype.setFill = function(properties){
        this.parent.Objects.Rectangle[this.id].fill = properties;
    };

    Rectangle.prototype.setLineWidth = function(properties){
        this.parent.Objects.Rectangle[this.id].lineWidth = properties;
    };

    Rectangle.prototype.setLineFill = function(properties){
        this.parent.Objects.Rectangle[this.id].strokeStyle = properties;
    };

    Rectangle.prototype.move = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;
            }
        }

        this.parent.Objects.Rectangle[this.id].x = this.x;
        this.parent.Objects.Rectangle[this.id].y = this.y;
    };

    Rectangle.prototype.getCoordinates = function(){
        return {
            'x': this.x,
            'y': this.y,
            'width': this.width,
            'height': this.height
        };
    };

    Rectangle.prototype.remove = function(){
        this.parent.Objects.Rectangle.splice(this.id, 1);
    };

    Rectangle.prototype.setShadow = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'shadowColor':
                    this.shadowColor = properties[current];
                    break;

                case 'shadowBlur':
                    this.shadowBlur = properties[current];
                    break;

                case 'shadowOffsetX':
                    this.shadowOffsetX = properties[current];
                    break;

                case 'shadowOffsetY':
                    this.shadowOffsetY = properties[current];
                    break;
            }
        }

        this.parent.Objects.Rectangle[this.id].shadowColor = this.shadowColor;
        this.parent.Objects.Rectangle[this.id].shadowBlur = this.shadowBlur;
        this.parent.Objects.Rectangle[this.id].shadowOffsetX = this.shadowOffsetX;
        this.parent.Objects.Rectangle[this.id].shadowOffsetY = this.shadowOffsetY;
    };

    Rectangle.prototype.resize = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'width':
                    this.width = properties[current];
                    break;
                case 'height':
                    this.height = properties[current];
                    break;

                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;
            }
        }

        this.parent.Objects.Rectangle[this.id].width = this.width;
        this.parent.Objects.Rectangle[this.id].height = this.height;
        this.parent.Objects.Rectangle[this.id].x = this.x;
        this.parent.Objects.Rectangle[this.id].y = this.y;
    };

    Rectangle.prototype.click = function(properties){
        var buffering = this.parent.htmlCanvas;
        var x = this.x;
        var y = this.y
        var width = this.width;
        var height = this.height;
        var id = this.id;

        buffering.addEventListener('click', function(e) {
            if((e.pageX - buffering.offsetLeft) >= x && (e.pageY - buffering.offsetTop) >= y && (e.pageX - buffering.offsetLeft) <= (x + width) && (e.pageY - buffering.offsetTop) <= (y + height)) {
                function sameAsEval(inst) {

                    inst();
                }
                sameAsEval(properties);

                e.preventDefault();
                return false;
            }
        }, false);
    };

    Rectangle.prototype.setLineDash = function(properties){
        this.parent.Objects.Rectangle[this.id].lineDash = properties;
    };

};

var Text = function(params){
    for(var current in params) {
        switch(current) {
            case 'x':
                this.x = params[current];
                break;

            case 'y':
                this.y = params[current];
                break;

            case 'parent':
                this.parent = params[current];
                break;
        }
    }

    this.id = this.parent.Objects.Text.length;

    this.parent.Objects.Text.push({
        'x': this.x,
        'y': this.y,
        'font': '',
        'text': '',
        'fill': 'black',
        'textAlign': 'left'
    });

    Text.prototype.setFont = function(properties){
        this.parent.Objects.Text[this.id].font = properties;
    };

    Text.prototype.setColor = function(properties){
        this.parent.Objects.Text[this.id].fill = properties;
    };

    Text.prototype.setText = function(properties){
        this.parent.Objects.Text[this.id].text = properties;
    };

    Text.prototype.setTextAlign = function(properties){
        this.parent.Objects.Text[this.id].textAlign = properties;
    };

    Text.prototype.remove = function(){
        this.parent.Objects.Text.splice(this.id, 1);
    };

    Text.prototype.getText = function(){
        return this.parent.Objects.Text[this.id].text;
    };

    Text.prototype.move = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;
            }
        }

        this.parent.Objects.Text[this.id].x = this.x;
        this.parent.Objects.Text[this.id].y = this.y;
    };
};

var drawImage = function(params){
    for(var current in params) {
        switch(current) {
            case 'x':
                this.x = params[current];
                break;

            case 'y':
                this.y = params[current];
                break;

            case 'width':
                this.width = params[current];
                break;

            case 'height':
                this.height = params[current];
                break;

            case 'url':
                this.url = params[current];
                break;

            case 'parent':
                this.parent = params[current];
                break;
        }
    }

    this.id = this.parent.Objects.Image.length;

    this.parent.Objects.Image.push({
        'x': this.x,
        'y': this.y,
        'width': this.width,
        'height': this.height,
        'url': this.url,
        'angle': 0,
        'opacity': 1.0
    });

    drawImage.prototype.getCoordinates = function(){
        return {x: this.parent.Objects.Image[this.id].x, y: this.parent.Objects.Image[this.id].y, width: this.parent.Objects.Image[this.id].width, height: this.parent.Objects.Image[this.id].height};
    };

    drawImage.prototype.move = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;
            }
        }

        this.parent.Objects.Image[this.id].x = this.x;
        this.parent.Objects.Image[this.id].y = this.y;
    };

    drawImage.prototype.resize = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'width':
                    this.width = properties[current];
                    break;

                case 'height':
                    this.height = properties[current];
                    break;
            }
        }

        this.parent.Objects.Image[this.id].width = this.width;
        this.parent.Objects.Image[this.id].height = this.height;
    };

    drawImage.prototype.setUrl = function(properties){
        this.url = properties;
        this.parent.Objects.Image[this.id].url = this.url;
    };

    drawImage.prototype.click= function(properties){
        var buffering = this.parent.htmlCanvas;
        var x = this.x;
        var y = this.y;
        x -= this.width / 2;
        y -= this.height / 2;
        var width = this.width;
        var height = this.height;
        var id = this.id;

        buffering.addEventListener('click', function(e) {
            if((e.pageX - buffering.offsetLeft) >= x && (e.pageY - buffering.offsetTop) >= y && (e.pageX - buffering.offsetLeft) <= (x + width) && (e.pageY - buffering.offsetTop) <= (y + height)) {
                function sameAsEval(inst) {

                    inst();
                }
                sameAsEval(properties);

                e.preventDefault();
                return false;
            }

            e.preventDefault();
            return false;
        }, false);
    };

    drawImage.prototype.remove = function(){
        this.parent.Objects.Image.splice(this.id, 0);
    };
};

var LineTo = function(params){
    for(var current in params) {
        switch(current) {
            case 'x':
                this.x = params[current];
                break;

            case 'y':
                this.y = params[current];
                break;

            case 'xt':
                this.xt = params[current];
                break;

            case 'yt':
                this.yt = params[current];
                break;

            case 'fill':
                this.fill = params[current];
                break;

            case 'parent':
                this.parent = params[current];
                break;
        }
    }

    this.id = this.parent.Objects.Line.length;

    this.parent.Objects.Line.push({
        'x': this.x,
        'y': this.y,
        'xt': this.xt,
        'yt': this.yt,
        'fill': this.fill,
        'lineWidth': 1,
        'lineDash': 0
    });

    LineTo.prototype.setColor = function(properties){
        this.parent.Objects.Line[this.id].fill = properties;
    };

    LineTo.prototype.setLineWidth = function(properties){
        this.parent.Objects.Line[this.id].lineWidth = properties;
    };

    LineTo.prototype.getCoordinates = function(){
        return {x: this.parent.Objects.Line[this.id].x, y: this.parent.Objects.Line[this.id].y, xt: this.parent.Objects.Line[this.id].xt, yt: this.parent.Objects.Line[this.id].yt};
    };

    LineTo.prototype.setLineDash = function(properties){
        this.parent.Objects.Line[this.id].lineDash = properties;
    };

    LineTo.prototype.remove = function(){
        this.parent.Objects.Line.splice(this.id, 2);
    };

    LineTo.prototype.move = function(properties){
        for(var current in properties) {
            switch(current) {
                case 'x':
                    this.x = properties[current];
                    break;

                case 'y':
                    this.y = properties[current];
                    break;

                case 'xt':
                    this.xt = properties[current];
                    break;

                case 'yt':
                    this.yt = properties[current];
                    break;
            }
        }

        this.parent.Objects.Line[this.id].x = this.x;
        this.parent.Objects.Line[this.id].y = this.y;
        this.parent.Objects.Line[this.id].xt = this.xt;
        this.parent.Objects.Line[this.id].yt = this.yt;
    };
};