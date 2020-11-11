"use strict";

class Pila {

    constructor() {
        this.array = new Array();
    }

    push(e) {
        this.array.push(e);
    }

    pop() {
        if(this.array.length == 0)
            throw new Error("La pila está vacía");
        return this.array.pop();
    }

    peek() {
        return this.array[this.array.length - 1];
    }

    size() {
        return this.array.length;
    }

    toString() {
        var str = "";
        for (var i = 0; i < this.array.length; i++) {
            str += this.array[i] + "\n";
        }
        return str;
    }
}

class Calculadora {

    constructor() {
        this.linea = "";
        this.pila = new Pila();
    }

    clickNum(n) {
        this.linea += n;
        this.actualizarPantalla();
    }

    enter() {
        if(this.linea != "") {
            this.pila.push(parseFloat(this.linea));
            this.linea = "";
            this.actualizarPantalla();
        }
    }

    clickOperator(op) {
        var op1, op2;
        if(this.linea != "")
            op1 = parseFloat(this.linea);
        else if(this.pila.size() > 1)
            op1 = this.pila.pop();
        else
            return;

        if(this.pila.size() > 0)
            op2 = this.pila.pop();
        else
            return;

        this.linea = "" + this.operar(op, op1, op2);
        this.enter();
    }

    operar(op, op1, op2) {
        switch(op) {
            case "+":
                return op2 + op1;
            case "-":
                return op2 - op1;
            case "*":
                return op2 * op1;
            case "/":
                return op2 / op1;
            case "**":
                return op2 ** op1;
        }
    }

    clickFunc(f) {
        if(this.linea != "") {
            this.linea = "" + f(parseFloat(this.linea));
        } else if(this.pila.size() > 0)
            this.pila.array[this.pila.size() - 1] = f(this.pila.array[this.pila.size() - 1]);
        this.actualizarPantalla();
    }

    pow2(n) {
        return n ** 2;
    }

    clear() {
        if(this.linea == "") {
            this.pila.pop();
        } else {
            this.linea = "";
        }
        this.actualizarPantalla();
    }

    actualizarPantalla() {
        var str = this.pila.toString() + "-> " + this.linea;
        document.getElementById('pantalla').value = str;
    }
}

var calc = new Calculadora();
