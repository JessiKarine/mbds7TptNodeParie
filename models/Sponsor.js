const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
const ObjectId = mongo.ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const sponsorSchema = mongoose.Schema({
    nom: String,
    description: String,
    image: String
});
sponsorSchema.plugin(uniqueValidator);
sponsorSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Sponsor', sponsorSchema, 'sponsors');

