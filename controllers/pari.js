const Pari = require('../models/Pari');

// create un nouvel pari
exports.createPari = (req, res, next) => {
    Pari.findOne({ idMatch: req.body.idMatch, idUser: req.body.idUser})
        .then(pari => {
            if(!pari){
                const newPari = new Pari({
                    idMatch: req.body.idMatch,
                    idEquipe: req.body.idEquipe,
                    idUser: req.body.idUser,
                    mise: req.body.mise
                });

                newPari.save()
                    .then(() => {
                        res.status(201).json({ message: 'Pari créé'});
                    })
                    .catch((error) => {
                        res.status(400).json({error});
                    })
            }else{
                res.status(409).json({ message: 'Vous avez déjà parié sur ce match !'});
            }
        })
        .catch( error => res.status(500).json({ error }))
}