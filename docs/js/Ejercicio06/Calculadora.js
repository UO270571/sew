"use strict";

class CalculadoraFechas {

    constructor() {
        this.diasSemana = new Array("Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo");
        this.meses = new Array("Enero", "Feberro", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    }

    calcular() {
        var dia = document.getElementById('dia').value;
        var mes = document.getElementById('mes').value;
        var anyo = document.getElementById('anyo').value;
        if(this.comprobarDatos(dia, mes, anyo), "info")
            this.setFecha(dia, mes, anyo);
    }

    calcularDias() {
        var dia = document.getElementById('dia2').value;
        var mes = document.getElementById('mes2').value;
        var anyo = document.getElementById('anyo2').value;
        if(this.comprobarDatos(dia, mes, anyo), "resultado")
            this.setSegundaFecha(dia, mes, anyo);
    }

    setFecha(dia, mes, anyo) {
        try {
            this.fecha = new Date(anyo, mes - 1, dia);
        } catch(err) {
            this.escribirInfo("Formato incorrecto de fecha");
        }
        this.escribirInfo(this.getInfoFecha(), "info"); 
    }

    setSegundaFecha(dia, mes, anyo) {
        try {
            this.fecha2 = new Date(anyo, mes - 1, dia);
        } catch(err) {
            this.escribirInfo("Formato incorrecto de fecha");
        }
        this.escribirInfo(this.getDiasEntreFechas(), "resultado");
    }

    getDiasEntreFechas() {
        var resultado = "<ul>";
        var dias;
        if(this.fecha > this.fecha2) {
            dias = parseInt((this.fecha.getTime() - this.fecha2.getTime()) / (1000 * 60 * 60 * 24));
            resultado += "<li>Días desde el " + this.fecha2.toLocaleDateString() + " hasta el " + this.fecha.toLocaleDateString() + ": " + dias + "</li>";
        } else {
            dias = parseInt((this.fecha2.getTime() - this.fecha.getTime()) / (1000 * 60 * 60 * 24));
            resultado += "<li>Días desde el " + this.fecha.toLocaleDateString() + " hasta el " + this.fecha2.toLocaleDateString() + ": " + dias + "</li>";
        }
        return resultado + "</ul>";
    }

    getInfoFecha() {
        var result = "<ul><li>Día de la semana: " + this.getDiaSemana() + "</li>";
        result += "<li>Mes: " + this.getMes() + "</li>";
        var bisiesto = this.esBisiesto(this.fecha.getFullYear()) ? "Sí</li>" : "No</li>";
        result += "<li>Año bisiesto: " + bisiesto;
        result += '<li> <p>Introduce otra fecha para calcular los días entre las dos fechas: </p>' +
            '<p class = "campos"><label for = "dia2">Día:</label><input type="text" id ="dia2"/>' + 
            '<label for = "mes2">Mes:</label><input type="text" id = "mes2"/>' + 
            '<label for = "anyo2">Año:</label><input type="text" id = "anyo2"/>' +
            '<input type="button" value="Calcular" onClick = "calc.calcularDias()"/> </p></li>';
        return result + '<li id = "resultado"></li></ul>';
    }

    getDiaSemana() {
        return this.diasSemana[this.fecha.getUTCDay()];
    }

    getMes() {
        return this.meses[this.fecha.getMonth()];
    }

    esBisiesto(anyo) {
        return ((anyo % 4 == 0) && (anyo % 100 != 0)) || (anyo % 400 == 0);
    }

    comprobarDatos(dia, mes, anyo, id) {
        if(!dia.match(/^\d+$/) || !mes.match(/^\d+$/) || !anyo.match(/^\d+$/)) {
            this.escribirInfo("Solo se aceptan dígitos como entrada", id);
            return false;
        }
        if(dia <= 0 || mes <= 0) {
            this.escribirInfo("Los meses y días deben ser mayores que 0", id);
            return false;
        }
        if(mes > 12) {
            this.escribirInfo("El mes debe ser menor que 12", id);
            return false;
        }
        if(((mes < 8 && mes % 2 == 1) || (mes > 7 && mes % 2 == 0)) && dia > 31) {
            this.escribirInfo("El mes indicado no tiene más de 31 días", id);
            return false;
        }
        if(this.esBisiesto(anyo)) {
            if (mes == 2 && dia > 29) {
                this.escribirInfo("En el año indicado febrero no tiene más de 29 días", id);
                return false;
            }
        } else if (mes == 2 && dia > 28) {
            this.escribirInfo("En el año indicado febrero no tiene más de 28 días", id);
            return false;
        }
        if(((mes < 8 && mes % 2 == 0) || (mes > 7 && mes % 2 == 1)) && dia > 30) {
            this.escribirInfo("El mes indicado no tiene más de 30 días", id);
            return false;
        }
        return true;
    }

    escribirInfo(info, id) {
        document.getElementById(id).innerHTML = "<p>" + info + "</p>";
    }
}

var calc = new CalculadoraFechas();
