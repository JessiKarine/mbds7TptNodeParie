const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');

// create un utilisateur
exports.createUtilisateur = async (req, res, next) => {    
    try { 
        const hash =  await bcrypt.hash(req.body.password, 10);
        const utilisateur = new Utilisateur({
            login: req.body.login,
            password: hash,
            nom: req.body.nom,
            prenom: req.body.prenom,
            etat: req.body.etat,
            email: req.body.email,
            numeroTelephone: req.body.numeroTelephone,
            idRole: req.body.idRole,
            imageProfil: req.body.imageProfil
        });
        try { 
            const user = await utilisateur.save();
            res.status(201).json(user);
        }
        catch(ex) { 
            res.status(400).json({ error : ex });
            console.error(ex);
        }       
    }
    catch(e) { 
       res.status(500).json({error : e});
       console.error(e);
    }
        
};

// get un utilisateur by login and password
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

// get all utilisateur
exports.getAllUtilisateur = (req, res, next) => {
    Utilisateur.find()
        .then((utilisateurs) => {
            res.status(200).json(utilisateurs);
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

// get utilisateur by user_name
exports.getUtilisateurByUserName = (req, res, next) => {
    Utilisateur.findOne({ login: req.params.login })
        .then((login) => {
            res.status(200).json(login);
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

// delete utilisateur
exports.deleteUtilisateur = (req, res, next) => {
    Utilisateur.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Utilisateur supprim?? !'});
        })
        .catch((error) => {
            res.status(400).json({error});
        });
};

// r??cuperation utilisateur par son _id
exports.getUtilisateurByIdUser = (req, res, next) =>{
    Utilisateur.findOne({ _id: req.params.idUser})
        .then((utilisateur) => {
            res.status(200).json(utilisateur);
        })
        .catch((error) =>{
            res.status(400).json({ error });
        })
}

//update utilisateur by _id
exports.updateUtilisateurByIdUser = (req, res, next) => {
    console.log("utilisateur arriv?? => " + req.body.utilisateur );
    const utilisateurToUpdate = req.body.utilisateur;
    Utilisateur.updateOne({ _id: req.params.idUser}, utilisateurToUpdate)
        .then((utilisateurUpdated) => {
            res.status(200).json(utilisateurUpdated);
        })
        .catch(error => res.status(400).json({ error }))
}
