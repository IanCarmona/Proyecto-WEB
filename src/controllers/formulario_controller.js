function traer_pantalla_formulario(req, res) {
    res.render('formulario/formulario');
}

function enviar(req, res) {
    const curp = req.body.curp;

    // Verifica si ya existe un registro con el mismo CURP en la base de datos
    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        const selectQuery = "SELECT * FROM Alumno WHERE curp = ?";
        conn.query(selectQuery, [curp], (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            if (result.length > 0) {
                // Ya existe un registro con el mismo CURP, no se permite enviar el formulario
                res.render('formulario/formulario', { error: "Ya existe un registro con este CURP" });
            } else {
                // No existe un registro con el mismo CURP, se registra el formulario
                // Realiza aquí la inserción en la base de datos con los datos del formulario
                const insertQuery = "INSERT INTO Alumno (curp, nombre, apPat, apMat, sexo, fnac, discapacidad, calle, colonia, codigoPostal, alcaldia, estado, correo, celular, escuelaMediaSup, area, escuelaNMS, promedio, carreraElegida, ingresoESCOM) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                const values = [
                    req.body.curp,
                    req.body.nombre,
                    req.body.apPat,
                    req.body.apMat,
                    req.body.sexo,
                    req.body.fnac,
                    req.body.discapacidad,
                    req.body.calle,
                    req.body.colonia,
                    req.body.codigoPostal,
                    req.body.alcaldia,
                    req.body.estado,
                    req.body.correo,
                    req.body.celular,
                    req.body.escuelaMediaSup,
                    req.body.area,
                    req.body.escuelaNMS,
                    req.body.promedio,
                    req.body.carreraElegida,
                    req.body.ingresoESCOM
                ];

                conn.query(insertQuery, values, (err, result) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    // Formulario registrado correctamente
                    res.render('formulario/formulario', { succes: "Formulario enviado correctamente" });
                });

            }
        });
    });
}

function traer_pantalla_listado(req, res) {

    req.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            return;
        }

        // Consulta para obtener los desayunos
        const queryDesayuno = "SELECT curp, CONCAT(nombre, ' ', apPat, ' ', apMat) AS nombre_completo, sexo, CONCAT(calle, ' ', colonia, ' ', codigoPostal, ' ', alcaldia, ' ', estado) AS direccion_completa FROM ALUMNO";

        conn.query(queryDesayuno, (err, desayunos) => {

            // Renderizar el resultado en el HBS
            res.render('formulario/listado', {
                desayunos: desayunos,
            });
        });
    });
}

module.exports = {
    traer_pantalla_formulario,
    enviar,
    traer_pantalla_listado
}