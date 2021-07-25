const MvtJoueur = require('../models/MvtJoueur');

// create un mouvment de joueur
exports.createMvtJoueur = (req, res, next) => {
    const newMvtJoueur = new MvtJoueur({
        date: Date.parse(req.body.date),
        iduser: req.body.idUser,
        idPari: req.body.idPari,
        montantDebit: req.body.montantDebit,
        montantCredit: req.body.montantCredit
    });
    console.log(newMvtJoueur);
    newMvtJoueur.save()
        .then(() => {
            res.status(201).json({ message: 'Mouvement créé !'});
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}

// get mvtJoueur by idUser
exports.getMvtJoueurByIdUser =(req, res, next)=>{
    MvtJoueur.find({ iduser: req.params.idUser})
        .then((mvtJoueurs) => {
            res.status(200).json(mvtJoueurs);
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}

// remove mvtJoueur by id
exports.removeMvtJoueurById = (req, res, next) => {
    MvtJoueur.remove({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Mouvement joueur a été supprimé !'});
        })
        .catch(error => res.status(400).json({ error }));
}

// get all mvtJoueur fonctionnalité pour l'admin
exports.getAllMvtJoueur = (req, res, next) => {
    MvtJoueur.find()
        .then((mvtJoueurs) => {
            res.status(200).json(mvtJoueurs);
        })
        .catch(error => res.status(400).json({ error }));
}
