const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
const ObjectId = mongo.ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const pariSchema = mongoose.Schema({
    idMatch: ObjectId ,
    idEquipe: {
        id: { type: Number, require: true },
        nom: { type: String, require: true },
        image : { type: String, require: false}
    },
    idUser: ObjectId,
    mise: { type: Number }
});


pariSchema.plugin(uniqueValidator);
pariSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Pari', pariSchema);