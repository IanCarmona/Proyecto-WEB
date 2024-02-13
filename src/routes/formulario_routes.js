const express = require('express');
const Formulario = require("../controllers/formulario_controller");

const router = express.Router();

router.get('/', Formulario.traer_pantalla_formulario);
router.post('/', Formulario.enviar);
router.get('/listado', Formulario.traer_pantalla_listado);


module.exports = router;
