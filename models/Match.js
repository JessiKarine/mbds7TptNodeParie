const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { mongo } = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const matchSchema = mongoose.Schema({
    date : Date,
    heure : String,
    categorie : {
        id: { type: Number, require: true },
        valeur: { type: String, require: true },
        description: { type: String, require: false }
    },
    equipe1 : { 
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    coteequipe1 : { type : Number , require: true},
    equipe2 : { 
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    coteequipe2 : { type : Number , require: true},
    coteMacthNull: { type : Number , require: true},
    });

    
    matchSchema.plugin(uniqueValidator);
    matchSchema.plugin(aggregatePaginate);
module.exports = mongoose.model('Match', matchSchema);