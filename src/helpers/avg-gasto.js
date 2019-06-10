// Models
const { Gastos } = require('../models');

module.exports = {
    async calculo(items) {

        let Resumen = new Object;
        Resumen.precio_Total = 0;
        Resumen.articulos = 0;

        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                Resumen.precio_Total = (items[i].item.precio * items[i].cantidad) + Resumen.precio_Total;
                Resumen.articulos = items[i].cantidad + Resumen.articulos;
            }

        } else {
            Resumen.precio_Total = 0;
            Resumen.articulos = 0;

        }

        console.log(Resumen);
        return Resumen;

    },

    async Last_Articulos(items) {

        let Articulos = [] ; 
        await items.sort((a, b) => a.date < b.date)
        
        if (items.length > 4) 
            Limit_for = 4;  
        else Limit_for = items.length;


        for (let index = 0; index < (Limit_for); index++) {
             Articulos.push ( items[index]);

        }
        //limit(5).sort({date: -1});

        console.log(Articulos);

        return Articulos;
    }
};




