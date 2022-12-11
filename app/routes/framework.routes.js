module.exports = (app) => {
  const frameworks = require("../controllers/framework.controller.js");
  //Estas son las rutas para el API
  //Registrar
  app.post("/frameworks", frameworks.create);
  //Listar
  app.get("/frameworks", frameworks.findAll);
  //Obtener
  app.get("/frameworks/:frameworkId", frameworks.findOne);
  //Actualizar
  app.put("/frameworks/:frameworkId", frameworks.update);
  //Eliminar
  app.delete("/frameworks/:frameworkId", frameworks.delete);
};