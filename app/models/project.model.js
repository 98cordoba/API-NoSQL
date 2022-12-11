const mongoose = require("mongoose");

/**
 * Esta es la definición de la estructura
 */
const ProjectSchema = mongoose.Schema(
    {
    projectname: String,
    client: String,
    projectManager: String,
    projectOwner: String,
    linkGit: String,
    crewDev: String,
    url: String,
    usuario: String,
    password: String,
    puerto: String,
    framework: String,
    name: String,
    email: String,
    rol: String
    },
    {
    timestamps: true,
    }
);

module.exports = mongoose.model("Project", ProjectSchema);
