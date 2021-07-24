const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const utilisateurRoutes = require('./routes/utilisateur');
const matchRoutes = require('./routes/match');
const resultatRoutes = require('./routes/resultat');
const localisationAgenceRoutes = require('./routes/localisationAgence');
const pariRoutes = require('./routes/pari');

const uri = 'mongodb+srv://meva98:root@cluster0.qewxf.mongodb.net/tpt?retryWrites=true&w=majority';
const uriLazaNomentsoa = 'mongodb+srv://sedera:sederamongodb@cluster0.sqoyq.mongodb.net/nodeTptParie?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const app = express();

mongoose.connect(uriLazaNomentsoa, options)
    .then(() => {
        console.log("TPT node parie est connecté à mongodb :p ");
        console.log("uri utilisé: " + uriLazaNomentsoa);
    },
        err => {
            console.log("Une Erreur de connexion à la base mongodb", err);
        });


// pour le CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// pour les formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// les routes utilisateur
app.use('/api/utilisateur', utilisateurRoutes);
app.use('/api/localisationAgence', localisationAgenceRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/resultat', resultatRoutes);
app.use('/api/pari', pariRoutes);

module.exports = app;