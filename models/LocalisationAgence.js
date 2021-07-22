const mongoose = require('mongoose');


const localisationAgenceSchema = mongoose.Schema({
    idAgence:{
        id: { type: Number, require: true },
        nom: { type: String, require: true }
    },
    latitude: { type: String, require: true },
    longitude: { type: String, require: true }
});

module.exports = mongoose.model('LocalisationAgence', localisationAgenceSchema);