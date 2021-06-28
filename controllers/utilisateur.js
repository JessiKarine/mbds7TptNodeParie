const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

exports.createUtilisateur = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const utilisateur = new Utilisateur({
                login: req.body.login,
                password: hash,
                nom: req.body.nom,
                prenom: req.body.prenom,
                etat: req.body.etat,
                email: req.body.email,
                numeroTelephone: req.body.numeroTelephone,
                role: req.body.role,
                imageProfil: req.body.imageProfil
            });
            utilisateur.save()
                .then(() => {
                    res.status(201).json({ message: 'Utilisateur enregistré !' });
                })
                .catch((error) => {
                    res.status(400).json({ error });
                });
        })
        .catch(error => res.status(500).json({error}));

};

exports.getOneUtilisateurByLoginAndPassword = (req, res, next) => {
    Utilisateur.findOne({ login: req.body.login})
        .then(utilisateur => {
            if(!utilisateur){
                return res.status(401).json({error: 'L\'utilisateur n\'existe pas !'});
            }

            bcrypt.compare(req.body.password, utilisateur.password)
                .then(valide => {
                    if(!valide){
                        return res.status(401).json({error: 'Mot de passe incorrect !'});
                    }
                    res.status(200).json(utilisateur);
                })
                .catch(error => res.status(500).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};


exports.getAllUtilisateur = (req, res, next) => {
    Utilisateur.find()
        .then((utilisateurs) => {
            res.status(200).json(utilisateurs);
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};


exports.deleteUtilisateur = (req, res, next) => {
    Utilisateur.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Utilisateur supprimé !'});
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};