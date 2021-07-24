const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
var ObjectId = mongoose.ObjectID;
const matchSchema = mongoose.Schema({
    date: Date,
    idUser: ObjectId,
    idPari: ObjectId,
    montantDebit: { type: Number },
    montantCredit: { type: Number }
});


matchSchema.plugin(uniqueValidator);
matchSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Match', matchSchema);