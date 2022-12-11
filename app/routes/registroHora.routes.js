module.exports = (app) => {
    const registrosh = require("../controllers/registroHora.controller.js");
    //Estas son las rutas para el API
    //Registrar
    app.post("/registrosh", registrosh.create);  
    //Listar
    app.get("/registrosh", registrosh.findAll);
    //Obtener
    app.get("/registrosh/:registrohId", registrosh.findOne);
    //Actualizar
    app.put("/registrosh/:registrohId", registrosh.update);
    //Eliminar
    app.delete("/registrosh/:registrohId", registrosh.delete);
};