const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    etat: { type: String, required: true },
    email: { type: String, required: true },
    numeroTelephone: { type: String, required: true },
    role:{
        id: { type: Number, require: true },
        nom: { type: String, require: true },
        rang: { type: String, require: true }
    },
    imageProfil: { type: String, required: false}
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Utilisateur', userSchema);