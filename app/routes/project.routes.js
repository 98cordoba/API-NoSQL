module.exports = (app) => {
    const projects = require("../controllers/project.controller.js");
    //Estas son las rutas para el API
    //Registrar
    app.post("/projects", projects.create);
    //Listar
    app.get("/projects", projects.findAll);
    //Obtener
    app.get("/projects/:projectId", projects.findOne);
    //Actualizar
    app.put("/projects/:projectId", projects.update);
    //Eliminar
    app.delete("/projects/:projectId", projects.delete);
};