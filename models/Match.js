const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
const ObjectId = mongo.ObjectID;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const matchSchema = mongoose.Schema({
    _id : ObjectId,
    date : Date,
    heure : String,
    idcategorie : {
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    idequipe1 : { 
        id: { type: Number, require: true },
        nom: { type: String, require: true },
        image: { type: String, require: true }
    },
    coteequipe1 : { type : Number , require: true},
    idequipe2 : { 
        id: { type: Number, require: true },
        nom: { type: String, require: true },
        image: { type: String, require: true }
    },
    coteequipe2 : { type : Number , require: true},
    coteMacthNull: { type : Number , require: true},
    });

    
    matchSchema.plugin(uniqueValidator);
    matchSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Match', matchSchema,'matchs');