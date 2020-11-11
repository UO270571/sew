"use strict";
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
        this.beforeClick;
        this.expresion += n;
        this.afterClick();
    }

    clickOperator(op) {
        this.beforeClick;
        this.expresion += op;
        this.afterClick();
    }

    clickEqual() {
        this.beforeClick;
        this.expresion = "" + this.evaluarExpresion();
        this.afterClick();
    }

    clickDot() {
        this.beforeClick;
        this.expresion += ".";
        this.afterClick();
    }

    clickClear() {
        this.beforeClick;
        this.expresion = "";
        this.afterClick();
    }

    evaluarExpresion() {
        try { 
            return eval(this.expresion);
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