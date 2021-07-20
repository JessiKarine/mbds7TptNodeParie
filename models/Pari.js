const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
const ObjectId = mongo.ObjectID;

const pariSchema = mongoose.Schema({
    _id: ObjectId,
    match: {
        _id: Object,
        date: Date,
        heure: String,
        categorie: {
            id: { type: Number, require: true },
            valeur: { type: String, require: true },
            description: { type: String, require: false }
        },
        equipe1: {
            id: { type: Number, require: true },
            nom: { type: String, require: true }
        },
        coteequipe1: { type: Number, require: true },
        equipe2: {
            id: { type: Number, require: true },
            nom: { type: String, require: true }
        },
        coteequipe2: { type: Number, require: true },
        coteMacthNull: { type: Number, require: true },
    },
    equipe: {
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    utilisateur: {
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
    },
    mise: { type: Number }
});


pariSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pari', pariSchema);