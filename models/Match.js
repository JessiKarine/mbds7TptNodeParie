const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const ObjectId = mongo.ObjectID;
const matchSchema = mongoose.Schema({
    _id: ObjectId,
    date : Date,
    heure : String,
    idCategorie : {
        id: { type: Number, require: true },
        valeur: { type: String, require: true },
        description: { type: String, require: false }
    },
    idEquipe1 : { 
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    coteEquipe1 : { type : Number , require: true},
    idEquipe2 : { 
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    coteEquipe1 : { type : Number , require: true},
    coteMacthNull: { type : Number , require: true},
    });

    
    matchSchema.plugin(uniqueValidator);
    matchSchema.plugin(aggregatePaginate);


module.exports = mongoose.model('Match', matchSchema);