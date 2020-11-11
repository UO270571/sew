"use strict";

class CalculadoraFechas {

    constructor() {
        this.diasSemana = new Array("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
    }

    calcular() {
        var dia = document.getElementById('dia').value;
        var mes = document.getElementById('mes').value;
        var anyo = document.getElementById('anyo').value;
        if(this.comprobarDatos(dia, mes, anyo))
            this.setFecha(dia, mes, anyo);
    }

    setFecha(dia, mes, anyo) {
        try {
            this.fecha = new Date(anyo, mes - 1, dia);
        } catch(err) {
            this.escribirInfo("Formato incorrecto de fecha");
        }
        this.escribirInfo(this.getInfoFecha());
        
    }

    getInfoFecha() {
        var result = "<p>Día de la semana: " + this.getDiaSemana() + "</p>";
        var bisiesto = this.esBisiesto(this.fecha.getFullYear()) ? "Sí</p>" : "No</p>";
        result += "<p>Año bisiesto: " + bisiesto;
        return result;
    }

    getDiaSemana() {
        return this.diasSemana[this.fecha.getUTCDay()];
    }

    esBisiesto(anyo) {
        return ((anyo % 4 == 0) && (anyo % 100 != 0)) || (anyo % 400 == 0);
    }

    comprobarDatos(dia, mes, anyo) {
        if(!dia.match(/^\d+$/) || !mes.match(/^\d+$/) || !anyo.match(/^\d+$/)) {
            this.escribirInfo("Solo se aceptan dígitos como entrada");
            return false;
        }
        if(dia <= 0 || mes <= 0) {
            this.escribirInfo("Los meses y días deben ser mayores que 0");
            return false;
        }
        if(mes > 12) {
            this.escribirInfo("El mes debe ser menor que 12");
            return false;
        }
        if(((mes < 8 && mes % 2 == 1) || (mes > 7 && mes % 2 == 0)) && dia > 31) {
            this.escribirInfo("El mes indicado no tiene más de 31 días");
            return false;
        }
        if(this.esBisiesto(anyo)) {
            if (mes == 2 && dia > 29) {
                this.escribirInfo("En el año indicado febrero no tiene más de 29 días");
                return false;
            }
        } else if (mes == 2 && dia > 28) {
            this.escribirInfo("En el año indicado febrero no tiene más de 28 días");
            return false;
        }
        if(((mes < 8 && mes % 2 == 0) || (mes > 7 && mes % 2 == 1)) && dia > 30) {
            this.escribirInfo("El mes indicado no tiene más de 30 días");
            return false;
        }
        return true;
    }

    escribirInfo(info) {
        document.getElementById('info').innerHTML = "<p>" + info + "</p>";
    }
}

var calc = new CalculadoraFechas();
