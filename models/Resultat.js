const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
const ObjectId = mongo.ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const resultatSchema = mongoose.Schema({
    date: Date,
    heure: String,
    idmatch: ObjectId,
    pointequipe1: Number,
    pointequipe2: Number
});
resultatSchema.plugin(uniqueValidator);
resultatSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Resultat', resultatSchema, 'resultats');
