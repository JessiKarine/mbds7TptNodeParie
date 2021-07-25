const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const ObjectId = mongo.ObjectID;

const mvtJoueurSchema = mongoose.Schema({
    date: Date,
    iduser: ObjectId,
    idPari: ObjectId,
    montantDebit: { type: Number },
    montantCredit: { type: Number }
});


mvtJoueurSchema.plugin(uniqueValidator);
mvtJoueurSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('mvtJoueur', mvtJoueurSchema);