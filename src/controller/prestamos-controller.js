const Prestamo = require('../models/prestamos');
const { all } = require('../routes');
const controller = {};

controller.generarMultas = (allborrowers, multa = 5) => {
    for (const borrower of allborrowers) {

        const fecha_fin = new Date(borrower.prestamo.fechafin);
        const fecha_entrega = new Date(borrower.prestamo.fechaentrega);
        const diff = fecha_fin - fecha_entrega;
        
        let daysdiff = diff/(1000 * 3600 * 24);
        
        const aux_date = new Date();
        let anio = aux_date.getFullYear().toString();
        let mes = (aux_date.getMonth()+1).toString();
        let dia = aux_date.getDate().toString();

        if(mes.length < 2){
            mes = '0'+mes;
        }

        if(dia.length < 2){
            dia = '0'+dia;
        }        

        let hoy = anio + '-' + mes + '-' + dia;

        const fecha_actual = new Date(hoy);
        const aux_diff = fecha_fin - fecha_actual;
        let aux_daysdiff = aux_diff/(1000 * 3600 * 24);

        if(daysdiff < 0 || isNaN(daysdiff)){
            if(isNaN(daysdiff)){
                borrower.prestamo.multa = Math.abs(aux_daysdiff * multa);
            }else{
                borrower.prestamo.multa = Math.abs(daysdiff * multa);
            }
        }else{
            borrower.prestamo.multa = 0;
        }
    }

    return allborrowers;
}

controller.getAllBorrowers = async(req, res) => {
    const allborrowers = await Prestamo.find({}).sort({ fechainicio: 'desc' }).lean();
    const multa = 5;

    for (const borrower of allborrowers) {

        const fecha_fin = new Date(borrower.prestamo.fechafin);
        const fecha_entrega = new Date(borrower.prestamo.fechaentrega);
        const diff = fecha_fin - fecha_entrega;
        
        let daysdiff = diff/(1000 * 3600 * 24);
        
        const aux_date = new Date();
        let anio = aux_date.getFullYear().toString();
        let mes = (aux_date.getMonth()+1).toString();
        let dia = aux_date.getDate().toString();

        if(mes.length < 2){
            mes = '0'+mes;
        }

        if(dia.length < 2){
            dia = '0'+dia;
        }        

        let hoy = anio + '-' + mes + '-' + dia;

        const fecha_actual = new Date(hoy);
        const aux_diff = fecha_fin - fecha_actual;
        let aux_daysdiff = aux_diff/(1000 * 3600 * 24);

        if(daysdiff < 0 || isNaN(daysdiff)){
            if(isNaN(daysdiff)){
                borrower.prestamo.multa = Math.abs(aux_daysdiff * multa);
            }else{
                borrower.prestamo.multa = Math.abs(daysdiff * multa);
            }
        }else{
            borrower.prestamo.multa = 0;
        }

        if(borrower.prestamo.estado === "Entregado"){
            borrower.prestamo.css = "fas fa-circle text-emerald-500 mr-2";
        }else{
            borrower.prestamo.css = "fas fa-circle text-orange-500 mr-2";
        }
    }

    res.render('index', { allborrowers });
}

controller.filtrarMultas = async(req, res) => {
    const { fechaini, fechafin } = req.body;
    const allborrowers = await Prestamo.find({}).sort({ fechainicio: 'desc' }).lean();

    let multaTotal = 0;

    const aux_allborrowers = controller.generarMultas(allborrowers);

    for (const borrower of aux_allborrowers) {
        while(fechaini <= borrower.prestamo.fechafin && fechafin >= borrower.prestamo.fechafin){
            multaTotal += borrower.prestamo.multa;
            break;
        }
    }

    res.render('multas', { multaTotal });
}

module.exports = controller;