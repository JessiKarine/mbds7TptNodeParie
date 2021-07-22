const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
const ObjectId = mongo.ObjectID;

const pariSchema = mongoose.Schema({
    _id: ObjectId,
    idMatch: ObjectId ,
    idEquipe: {
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    idUser: ObjectId,
    mise: { type: Number }
});


pariSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pari', pariSchema);