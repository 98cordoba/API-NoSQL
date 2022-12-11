//Referencia al modelo
const Registroh = require("../models/registroHora.model.js");

/**
 * Para crear un nuevo registro
 * @param {*} req Solicitud desde Web
 * @param {*} res Respuesta del registroho creado
 * @returns JSON
 */
exports.create = (req, res) => {
  //Se valida
  if (!req.body.name) {
    return res.status(400).send({
      message: "El registro de horas no puede ser vacío",
    });
  }

  //Se forma
  const registroh = new Registroh({
    user: req.body.user,
    project: req.body.project,
    date: req.body.date, 
    hours: req.body.hours,
    billableHours: req.body.billableHours,
  });

  //Se guarda
  registroh
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error registrando el registro.",
      });
    });
};

/**
 * Se obtienen todos los registros
 * @param {*} req Solicitud web
 * @param {*} res Respuesta de registros en JSON
 */
exports.findAll = (req, res) => {
  Registroh.find()
    .then((registrosh) => {
      res.send(registrosh);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Opss. Tuvimos un error al obtener los registro.",
      });
    });
};

/**
 * Se encuentra el registroho por ID
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del registroho en JSON
 */
exports.findOne = (req, res) => {
  Registroh.findById(req.params.registrohId)
    .then((registroh) => {
      if (!registroh) {
        return res.status(404).send({
          message: "No hay registros con el ID " + req.params.registrohId,
        });
      }
      res.send(registroh); //Este si existe
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay registros con el ID " + req.params.registrohId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al obtener el registro " +
          req.params.registrohId,
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
      message: "El nombre del registro no puede ser nulo",
    });
  }

  //Encontrar el registroho
  Registroh.findByIdAndUpdate(
    req.params.registrohId,
    {
      user: req.body.user,
      project: req.body.project,
      date: req.body.date, 
      hours: req.body.hours,
      billableHours: req.body.billableHours,
    },
    { new: true }
  )
    .then((registroh) => {
      if (!registroh) {
        return res.status(404).send({
          message: "No hay registros con el id " + req.params.registrohId,
        });
      }
      res.send(registroh);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "No hay registros con el id " + req.params.registrohId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al actualizar el registro " +
          req.params.registrohId,
      });
    });
};

/**
 * Eliminar un registro
 * @param {*} req Solicitud web
 * @param {*} res Respuesta del registroho eliminado
 */
exports.delete = (req, res) => {
  Registroh.findByIdAndRemove(req.params.registrohId)
    .then((registroh) => {
      if (!registroh) {
        return res.status(404).send({
          message: "No hay registrohos con el id" + req.params.registrohId,
        });
      }
      res.send({ message: "El registroho se eliminó de manera correcta!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "No hay registrohos con el id" + req.params.registrohId,
        });
      }
      return res.status(500).send({
        message:
          "Opss. Tuvimos un error al eliminar el registroho " +
          req.params.registrohId,
      });
    });
};