const mongoose = require("mongoose");
/**
 * Esta es la definición de la estructura
 */
const RegistrohSchema = mongoose.Schema(
    {
    user: String,
    project: String,
    date: String, 
    hours: String,
    billableHours: String
    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("Registroh", RegistrohSchema);
