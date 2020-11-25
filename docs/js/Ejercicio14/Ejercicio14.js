"use strict";
function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.canvas.width = window.innerWidth;

    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;

    var drawing = false;

    function fullscreen(){
        var el = document.getElementById('canvas');

        if(el.webkitRequestFullScreen) {
            el.webkitRequestFullScreen();
        }
       else {
          el.mozRequestFullScreen();
       }            
    }

    canvas.addEventListener("click",fullscreen)

    function getPos(e) {
        var pos = new Object();
        if(e instanceof TouchEvent) {
            pos.x = e.targetTouches[0].clientX - offsetX;
            pos.y = e.targetTouches[0].clientY - offsetY;
        } else {
            pos.x = e.clientX - offsetX;
            pos.y = e.clientY - offsetY;
        }
        return pos;
    }

    function draw(e) {
        if(drawing) {
            var pos = getPos(e);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    }

    function startDrawing(e) {
        drawing = true;
        var pos = getPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function stopDrawing(e) {
        drawing = false;
    }

    canvas.addEventListener("mousemove", draw, false);

    canvas.addEventListener("mousedown", startDrawing, false);

    window.addEventListener("mouseup", stopDrawing, false);

    canvas.addEventListener("touchmove", draw, false);

    canvas.addEventListener("touchstart", startDrawing, false);

    window.addEventListener("touchend", stopDrawing, false);
}


