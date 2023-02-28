const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", (req, res)=>{
    try{
        res.status(200).send("hola mundo");
    }catch(error) { 
        res.status(400).json({message: error.message});
    }
})


module.exports = router;