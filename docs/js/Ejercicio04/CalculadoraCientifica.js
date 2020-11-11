"use strict";
var pi = Math.PI;
var e = Math.E;
var sin = Math.sin;
var cos = Math.cos;
var tan = Math.tan;
var asin = Math.asin;
var acos = Math.acos;
var atan = Math.atan;
var log = Math.log;
var ln = Math.log1p;
var exp = Math.exp;
var sqrt = Math.sqrt;

class Calculadora {

    constructor (){
        this.expresion = "";
        this.memoria = 0;
        this.mrcUltimoPulsado = false;
        this.error = false;
    }

    beforeClick() {
        if(this.error)
            this.expresion = "";
        this.error = false;
        this.mrcUltimoPulsado = false;
    }

    afterClick() {
        this.actualizarPantalla();
    }

    clickMplus() {
        this.beforeClick();
        try { 
            this.memoria = eval(this.memoria + " + " + this.expresion);
            this.expresion = "";
        }
        catch(err) {
            this.error = true;
            this.expresion = err.name;
        }
        this.afterClick();
    }

    clickMminus() {
        this.beforeClick();
        try { 
            this.memoria = eval(this.memoria + " - " + this.expresion);
            this.expresion = "";
        }
        catch(err) {
            this.error = true;
            this.expresion = err.name;
        }
        this.afterClick();
    }

    clickMrc() {
        if (this.mrcUltimoPulsado)
            this.memoria = 0;
        this.beforeClick();    
        this.mrcUltimoPulsado = true;       
        this.expresion = "" + this.memoria;
        this.afterClick();
    }

    clickNum(n){
        this.beforeClick();
        this.expresion += n;
        this.afterClick();
    }

    clickOperator(op) {
        this.beforeClick();
        this.expresion += op;
        this.afterClick();
    }

    clickFunc(func) {
        this.beforeClick();
        this.expresion += func + "(";
        this.afterClick();
    }

    clickOpenP() {
        this.beforeClick();
        this.expresion += "(";
        this.afterClick();
    }

    clickCloseP() {
        this.beforeClick();
        this.expresion += ")";
        this.afterClick();
    }

    clickEqual() {
        this.beforeClick();
        this.expresion = this.evaluarExpresion();
        this.afterClick();
    }

    clickDot() {
        this.beforeClick();
        this.expresion += ".";
        this.afterClick();
    }

    clickClear() {
        this.beforeClick();
        this.expresion = "";
        this.afterClick();
    }

    evaluarExpresion() {
        try { 
            return "" + eval(this.expresion);
        }
        catch(err) {
            this.error = true;
            return err.name;
        }
    }

    actualizarPantalla() {
        document.getElementById('expresion').value = this.expresion;
    }
}

var calc = new Calculadora();