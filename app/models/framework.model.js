const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const FrameworkSchema = mongoose.Schema(
    {
    name: String,
    version: String,
    inOrOut: String, /* podria ser boleano*/
    user: String,
    password: String,
    cod: String,
    payOrFree: String,
    finalUser: String,
    urlGit: String,
    note: String,
    condition: String /* podria ser boleano*/
    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("Framework", FrameworkSchema);
