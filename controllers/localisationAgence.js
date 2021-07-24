const LocalisationAgence = require('../models/LocalisationAgence');

// craeate une nouvelle localisation d'une agence
exports.createLocalisationAgence = (req, res, next) => {
    LocalisationAgence.findOne({ idAgence: req.body.idAgence})
        .then(localisationAgence => {
            if(!localisationAgence){
                const newLocalisationAgence = new LocalisationAgence({
                    idAgence: req.body.idAgence,
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

// get localisation by agence
exports.getOneLocalisationByAgence = (req, res, next) => {
    LocalisationAgence.findOne({ idAgence: req.body.agence})
        .then(localisationAgence => {
            if(!localisationAgence){
                res.status(401).json({ error: 'L\'agence n\'existe pas!'});
            }
            res.status(200).json(localisationAgence);
        })

        .catch(error => res.status(500).json({ error }));
};


// get all localisation of all agence
exports.getAllLocalisationAgence = (req, res, next) => {
    LocalisationAgence.find()
        .then((localisationAgence) => {
            res.status(200).json(localisationAgence);
        })
        .catch((error) =>{
            res.status(400).json({error})
        });       
};


// update localisation of one agence
exports.updateOneAgence = (req, res, next) => {
    const localisationAgence = new LocalisationAgence({
        _id: req.params.id,
        idAgence: req.body.agence,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    LocalisationAgence.updateOne({_id: req.params.id}, localisationAgence)
        .then(() => {
            res.status(200).json({ message: 'La localisation a été modifiée !'});
        })
        .catch( error => res.status(400).json({ error }));
};


// delete one localisation of one agence
exports.deleteLocalisationAgence = (req, res, next) => {
    LocalisationAgence.deleteOne({_id: req.params.id})
        .then(() => {
            res.status(200).json({ message: 'La localisation pour l\' agence a été supprimée !'});
        })
        .catch(error => res.status(400).json({error})); 
}







