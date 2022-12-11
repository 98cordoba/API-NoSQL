//Referencia al modelo
const Project = require("../models/project.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del proyecto creado
 * @returns JSON
 */
exports.create = (req, res) => {
    //Se valida
    if (!req.body.name) {
      return res.status(400).send({
        message: "El proyecto no puede ser vacío",
      });
    }
    //Se forma
    const project = new Project({
      projectname: req.body.projectname,
      client: req.body.client,
      projectManager: req.body.projectManager,
      projectOwner: req.body.projectOwner,
      linkGit: req.body.linkGit,
      crewDev: req.body.crewDev,
      url: req.body.url,
      usuario: req.body.usuario,
      password: req.body.password,
      puerto: req.body.puerto,
      framework: req.body.framework,
      name: req.body.name,
      email: req.body.email,
      rol: req.body.rol,
    });
  
    //Se guarda
    project
      .save()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Opss. Tuvimos un error registrando el proyecto.",
        });
      });
  };
  
  /**
   * Se obtienen todos los registros
   * @param {*} req Solicitud web
   * @param {*} res Respuesta de registros en JSON
   */
  exports.findAll = (req, res) => {
    Project.find()
      .then((projects) => {
        res.send(projects);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Opss. Tuvimos un error al obtener los proyectos.",
        });
      });
  };
  
  /**
   * Se encuentra el proyecto por ID
   * @param {*} req Solicitud web
   * @param {*} res Respuesta del projecto en JSON
   */
  exports.findOne = (req, res) => {
    Project.findById(req.params.projectId)
      .then((project) => {
        if (!project) {
          return res.status(404).send({
            message: "No hay proyectos con el ID " + req.params.projectId,
          });
        }
        res.send(project); //Este si existe
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "No hay proyectos con el ID " + req.params.projectId,
          });
        }
        return res.status(500).send({
          message:
            "Opss. Tuvimos un error al obtener el proyecto " +
            req.params.projectId,
        });
      });
  };
  
  /**
   * Actualiza un registro
   * @param {*} req Solicitud web
   * @param {*} res Respuesta del registro actualizado
   * @returns JSON
   */
  exports.update = (req, res) => {
    // Valida
    if (!req.body.name) {
      return res.status(400).send({
        message: "El nombre del proyecto no puede ser nulo",
      });
    }
  
    //Encontrar el projecto
    Project.findByIdAndUpdate(
      req.params.projectId,
      {
        projectname: req.body.projectname,
        client: req.body.client,
        projectManager: req.body.projectManager,
        projectOwner: req.body.projectOwner,
        linkGit: req.body.linkGit,
        crewDev: req.body.crewDev,
        url: req.body.url,
        usuario: req.body.usuario,
        password: req.body.password,
        puerto: req.body.puerto,
        framework: req.body.framework,
        name: req.body.name,
        email: req.body.email,
        rol: req.body.rol,
      },
      { new: true }
    )
      .then((project) => {
        if (!project) {
          return res.status(404).send({
            message: "No hay proyectos con el id " + req.params.projectId,
          });
        }
        res.send(project);
      })
      .catch((err) => {
        if (err.kind === "ObjectId") {
          return res.status(404).send({
            message: "No hay proyectos con el id " + req.params.projectId,
          });
        }
        return res.status(500).send({
          message:
            "Opss. Tuvimos un error al actualizar el proyecto " +
            req.params.projectId,
        });
      });
  };
  
  /**
   * Eliminar un projecto
   * @param {*} req Solicitud web
   * @param {*} res Respuesta del proyecto eliminado
   */
  exports.delete = (req, res) => {
    Project.findByIdAndRemove(req.params.projectId)
      .then((project) => {
        if (!project) {
          return res.status(404).send({
            message: "No hay proyectos con el id" + req.params.projectId,
          });
        }
        res.send({ message: "El proyecto se eliminó de manera correcta!" });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: "No hay proyectos con el id" + req.params.projectId,
          });
        }
        return res.status(500).send({
          message:
            "Opss. Tuvimos un error al eliminar el proyecto " +
            req.params.projectId,
        });
      });
  };
