const Pari = require('../models/Pari');

// create un nouvel pari
exports.createPari = (req, res, next) => {
    const newPari = new Pari({
        idMatch: req.body.idMatch,
        idEquipe: req.body.idEquipe,
        idUser: req.body.idUser,
        mise: req.body.mise
    });

    newPari.save()
        .then(() => {
            res.status(201).json({ message: 'Pari créé' });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

// supprimer pari
exports.removePari = (req, res, next) => {
    Pari.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Le pari des supprimé !' });
        })
        .catch(error => res.status(400).json({ error }));
}

// modifieer pari
exports.updatePari = (req, res, next) => {
    const updatedPari = new Pari({
        _id: req.params.id,
        idMatch: req.body.idMatch,
        idEquipe: req.body.idEquipe,
        idUser: req.body.idUser,
        mise: req.body.mise
    });

    Pari.updateOne({ _id: req.params.id}, updatedPari)
        .then(() => {
            res.status(200).json({ message: 'Le pari a été modfié !'});
        })   
        .catch(error => res.status(400).json({error})); 
}

// récuperer un pari par son id
exports.getPariById = (req, res, next) => {
    Pari.findOne({ _id: req.params.id})
        .then((pari) => {
            res.status(200).json(pari)
        })
        .catch((error) => {
            res.status(400).json({error});
        })
}

//récuperer tous les pari d'un utilisateur
exports.getParisByUserId = (req, res, next) => {
    Pari.find({ idUser: req.params.idUser})
        .then((paris) => {
            res.status(200).json(paris)
        })
        .catch((error) => {
            res.status(400).json({error});
        })
}

// récuperer tous les pari
exports.getAllParis = (req, res, next) => {
    Pari.find()
        .then((paris) => {
            res.status(200).json(paris);
        })
        .catch(error => res.status(400).json({error}))
}