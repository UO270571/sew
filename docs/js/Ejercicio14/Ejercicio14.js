"use strict";

class Pizarra {

    load() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');

        this.canvas.width = window.innerWidth;
        var bottomHeight = $("#archivos").outerHeight(true);
        var topHeight = $("#ajustes").outerHeight(true) + $("h1").outerHeight(true);
        this.canvas.height = window.innerHeight - topHeight - bottomHeight - 2;

        this.offsetX = canvas.getBoundingClientRect().left;
        this.offsetY = canvas.getBoundingClientRect().top;

        this.drawing = false;

        document.getElementById("grosor").value = 3;
        this.cambiarPropiedad("lineWidth", "grosor");

        this.cargarEstado();

        this.canvas.onmousemove = this.draw.bind(this);
        this.canvas.ontouchmove = this.draw.bind(this);
        this.canvas.onmousedown = this.startDrawing.bind(this); 
        this.canvas.ontouchstart = this.startDrawing.bind(this);
        window.onmouseup = this.stopDrawing.bind(this);
        window.ontouchend = this.stopDrawing.bind(this);
        window.onresize = this.resize.bind(this);
        window.onbeforeunload = this.guardarEstado.bind(this);
    }

    resize() {
        var url = this.canvas.toDataURL();
        this.canvas.width = window.innerWidth;
        var bottomHeight = $("#archivos").outerHeight(true);
        var topHeight = $("#ajustes").outerHeight(true) + $("h1").outerHeight(true);
        this.canvas.height = window.innerHeight - topHeight - bottomHeight - 2;
        var img = new Image();
        img.onload = function() {
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        }.bind(this);
        img.src = url;
        this.cambiarPropiedad("lineWidth", "grosor");
        this.cambiarPropiedad("strokeStyle", "color");
        this.cambiarPropiedad("globalCompositeOperation", "herramienta");
        this.offsetX = this.canvas.getBoundingClientRect().left;
        this.offsetY = this.canvas.getBoundingClientRect().top;
    }

    cargarImagen(files) {
        var reader = new FileReader();
        reader.onload = function() {
            var img = new Image();
            img.onload = function(){
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.drawImage(img, 0, 0);
                this.cambiarPropiedad("globalCompositeOperation", "herramienta");
            }.bind(this);
            img.src = reader.result;
        }.bind(this);
        reader.readAsDataURL(files[0]); 
    }

    cambiarPropiedad(attr, propiedad) {
        this.ctx[attr] = document.getElementById(propiedad).value;
    }

    guardarEstado() {
        localStorage.setItem('saved', document.getElementById("canvas").toDataURL());
        localStorage.setItem('color', document.getElementById("color").value);
        localStorage.setItem('grosor', document.getElementById("grosor").value);
        localStorage.setItem('herramienta', document.getElementById("herramienta").value);
    }

    cargarEstado() {
        var grosor = localStorage.getItem("grosor");
        if(grosor) {
            document.getElementById("grosor").value = grosor;
            this.cambiarPropiedad("lineWidth", "grosor");
        }

        var color = localStorage.getItem("color");
        if(color) {
            document.getElementById("color").value = color;
            this.cambiarPropiedad("strokeStyle", "color");
        }

        var herramienta = localStorage.getItem("herramienta");
        if(herramienta) {
            document.getElementById("herramienta").value = herramienta;
            this.cambiarPropiedad("globalCompositeOperation", "herramienta");
        }

        var url = localStorage.getItem("saved");
        if(url) {
            var img = new Image();
            img.onload = function(){
                this.ctx.globalCompositeOperation = "source-over";
                this.ctx.drawImage(img, 0, 0);
                this.cambiarPropiedad("globalCompositeOperation", "herramienta");
            }.bind(this);
            img.src = url;
        }
    }

    borrarTodo() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    getPos(e) {
        var pos = new Object();
        if(e.targetTouches) {
            pos.x = e.targetTouches[0].clientX - this.offsetX;
            pos.y = e.targetTouches[0].clientY - this.offsetY;
        } else {
            pos.x = e.clientX - this.offsetX;
            pos.y = e.clientY - this.offsetY;
        }
        return pos;
    }

    draw(e) {
        if(this.drawing) {
            var pos = this.getPos(e);
            this.ctx.lineTo(pos.x, pos.y);
            this.ctx.stroke();
        }
    }

    startDrawing(e) {
        this.drawing = true;
        var pos = this.getPos(e);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
    }

    stopDrawing(e) {
        this.drawing = false;
    }

    download() {
        var enlace = document.createElement("a");
        enlace.href = this.canvas.toDataURL();
        enlace.download = "pizarra.png";
        enlace.click();
    }
}

var pizarra = new Pizarra();

