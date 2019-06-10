const express = require('express');
const router = express.Router();

// Helpers
const { isAuthenticated } = require('../helpers/auth');

const { Gastos } = require('../models');
const Avg_Helpers = require('../helpers/avg-gasto');


router.get('/finanzas/item', isAuthenticated, (req, res) => {
    res.render('finanzas/dashboard');
});
router.get('/finanzas/add_item', isAuthenticated, (req, res) => {
    res.render('finanzas/item');
});

// Delete Item
router.delete('/finanzas/delete/:id', isAuthenticated, async (req, res) => {
    await Gastos.Item.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Item Deleted Successfully');
    console.log('OK');
    //Busca ruta de  Get , para redireccionar ella renderiza
    res.redirect('/Finanzas');
});

router.post('/finanzas/item_new', isAuthenticated, async (req, res) => {
    const Temp_item = new Gastos.Item();
    const Temp_Articulo = new Gastos.Articulo();
    //Datos de articulo 
    Temp_Articulo.nombre = req.body.name;
    Temp_Articulo.precio = req.body.precio;
    Temp_Articulo.categoria = req.body.categoria;

    //Item añadido por usuario 
    Temp_item.id_user = req.user.id;
    Temp_item.cantidad = req.body.cantidad; 
    Temp_item.item = Temp_Articulo._id; // _id de Item creado 

    await Temp_item.save();
  
    await Temp_Articulo.save();
 
    
    //Busqueda realizando un Populate 
    /*
    let Mostrar =  Gastos.Item.findById( Temp_item._id  )
      .populate('item').exec((err, posts) => {
        console.log (posts); })*/
        let Mostrar = await  Gastos.Item.find( )
        .populate('item').exec((err, posts) => {
            if(err ){
             console.error(err );} 

             else return posts ;  })
     
     

    res.redirect('/Finanzas');
});

router.get('/Finanzas', isAuthenticated, async (req, res) => {
    const items = await Gastos.Item.find().populate('item').sort({ date: 'desc' });
    let Resumen = await Avg_Helpers.calculo(items); //Llamada Avg
    let Last_Articulos = await Avg_Helpers.Last_Articulos(items);

    let result  = await Gastos.Articulo.find().distinct('categoria',  function (err, result) {
        if (err) return handleError(err);
        return  result;
    })
    console.log(result );
    //Devolvemos a la vista los items, resumen y últimos Articulos
    res.render('finanzas/dashboard', { items,Resumen,Last_Articulos });
});

//Función creada para obtener Item_ID
function getItems (Item_ID){
    return Gastos.Item.findById(   Item_ID  )
      .populate('item').exec((err, posts) => {
        console.log (posts);
      })
  }

module.exports = router;
