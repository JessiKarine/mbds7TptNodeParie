const LocalisationAgence = require('../models/LocalisationAgence');

exports.createLocalisationAgence = (req, res, next) => {
    LocalisationAgence.findOne({ agence: req.body.agence})
        .then(localisationAgence => {
            if(!localisationAgence){
                const newLocalisationAgence = new LocalisationAgence({
                    agence: req.body.agence,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                });
                newLocalisationAgence.save()
                    .then(() => {
                         res.status(201).json({ message: 'La nouvelle localisation est créée'});
                    })
                    .catch((error) => {
                         res.status(400).json({error});
                    });
            }else{
                 res.status(409).json({ error: 'L\agence existe déjà !'});
            }           
        })
        .catch(error => res.status(500).json({ error }));   

};

exports.getOneLocalisationByAgence = (req, res, next) => {
    LocalisationAgence.findOne({ agence: req.body.agence})
        .then(localisationAgence => {
            if(!localisationAgence){
                return res.status(401).json({ error: 'L\'agence n\'existe pas!'});
            }
            return res.status(200).json(localisationAgence);
        })

        .catch(error => res.status(500).json({ error }));
};

exports.getAllLocalisationAgence = (req, res, next) => {
    LocalisationAgence.find()
        .then((localisationAgence) => {
            res.status(200).json(localisationAgence);
        })
        .catch((error) =>{
            res.status(400).json({error})
        });       
};

exports.updateOneAgence = (req, res, next) => {
    const localisationAgence = new LocalisationAgence({
        _id: req.params.id,
        agence: req.body.agence,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    LocalisationAgence.updateOne({_id: req.params.id}, localisationAgence)
        .then(() => {
            res.status(200).json({ message: 'La localisation a été modifiée !'});
        })
        .catch( error => res.status(400).json({ error }));
};

exports.deleteLocalisationAgence = (req, res, next) => {
    LocalisationAgence.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({ message: 'La localisation pour l\' agence a été supprimée !'});
        })
        .catch(error => res.status(400).json({error})); 
}







