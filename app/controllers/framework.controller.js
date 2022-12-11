//Referencia al modelo
const Framework = require("../models/framework.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del frameworko creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.name) {
    return res.status(400).send({
      message: "El framework no puede ser vacío",
    });
  }

  //Se forma
  const framework = new Framework({
    name: req.body.name,
    version: req.body.version,
    inOrOut: req.body.inOrOut, /* podria ser boleano*/
    user: req.body.user,
    password: req.body.password,
    cod: req.body.cod,
    payOrFree: req.body.payOrFree,
    finalUser: req.body.finalUser,
    urlGit: req.body.urlGit,
    note: req.body.note,
    condition: req.body.condition, /* podria ser boleano*/
  });

  //Se guarda
  framework
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el frameworko.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Framework.find()
    .then((frameworks) => {
      res.send(frameworks);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los frameworkos.",
      });
    });
};

/**
 * Se encuentra el frameworko por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del frameworko en JSON
 */
exports.findOne = (req, res) => {
  Framework.findById(req.params.frameworkId)
    .then((framework) => {
      if (!framework) {
        return res.status(404).send({
          message: "No hay frameworkos con el ID " + req.params.frameworkId,
        });
      }
      res.send(framework); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay frameworkos con el ID " + req.params.frameworkId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener el frameworko " +
          req.params.frameworkId,
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
      message: "El nombre del frameworko no puede ser nulo",
    });
  }

  //Encontrar el frameworko
  Framework.findByIdAndUpdate(
    req.params.frameworkId,
    {
      name: req.body.name,
      version: req.body.version,
      inOrOut: req.body.inOrOut,
      user: req.body.user,
      password: req.body.password,
      cod: req.body.cod,
      payOrFree: req.body.payOrFree,
      finalUser: req.body.finalUser,
      urlGit: req.body.urlGit,
      note: req.body.note,
      condition: req.body.condition,
    },
    { new: true }
  )
    .then((framework) => {
      if (!framework) {
        return res.status(404).send({
          message: "No hay frameworkos con el id " + req.params.frameworkId,
        });
      }
      res.send(framework);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay frameworkos con el id " + req.params.frameworkId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el frameworko " +
          req.params.frameworkId,
      });
    });
};

/**
 * Eliminar un frameworko
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del frameworko eliminado
 */
exports.delete = (req, res) => {
  Framework.findByIdAndRemove(req.params.frameworkId)
    .then((framework) => {
      if (!framework) {
        return res.status(404).send({
          message: "No hay frameworkos con el id" + req.params.frameworkId,
        });
      }
      res.send({ message: "El frameworko se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay frameworkos con el id" + req.params.frameworkId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el frameworko " +
          req.params.frameworkId,
      });
    });
};
