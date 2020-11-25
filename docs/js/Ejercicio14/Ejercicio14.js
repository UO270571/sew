"use strict";
function draw() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.canvas.width = window.innerWidth;

    var offsetX = canvas.getBoundingClientRect().left;
    var offsetY = canvas.getBoundingClientRect().top;

    var drawing = false;

    canvas.addEventListener("mousemove", function(e) {
        if(drawing) {
            ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY);
            ctx.stroke();
        }
    }, false);

    canvas.addEventListener("mousedown", function(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - offsetX, e.clientY - offsetY);
    }, false);

    window.addEventListener("mouseup", function(e) {
        drawing = false;
    }, false);

    canvas.addEventListener("touchmove", function(e) {
        if(drawing) {
            ctx.lineTo(e.clientX - offsetX, e.clientY - offsetY);
            ctx.stroke();
        }
    }, false);

    canvas.addEventListener("touchstart", function(e) {
        drawing = true;
        ctx.beginPath();
        ctx.moveTo(e.clientX - offsetX, e.clientY - offsetY);
    }, false);

    window.addEventListener("touchend", function(e) {
        drawing = false;
    }, false);
}


