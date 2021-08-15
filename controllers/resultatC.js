const Resultat = require('../models/Resultat');
exports.createResultat = (req, res, next) => {
    const newResultat = new Resultat({
        date: Date.parse(req.body.date),
        idmatch: req.body.idmatch,
        heure: req.body.heure,
        pointequipe1: req.body.pointequipe1,
        pointequipe2: req.body.pointequipe2
    });
    newResultat.save()
        .then(() => {
            res.status(201).json({ message: 'Résultat créé !'});
        })
        .catch((error) => {
            res.status(400).json({ error });
        })
}
exports.updateResultatById = (req, res, next) => {
    const updatedResultat = new Resultat({
        _id: req.params.id,
        date: Date.parse(req.body.date),
        idmatch: req.body.idmatch,
        heure: req.body.heure,
        pointequipe1: req.body.pointequipe1,
        pointequipe2: req.body.pointequipe2
    });

    Resultat.updateOne({ _id: req.params.id}, updatedResultat)
        .then(() => {
            res.status(200).json({ message: 'Le Résultat a été modfié !'});
        })   
        .catch(error => res.status(400).json({error})); 
}
exports.removeResultat = (req, res, next) => {
    Resultat.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: 'Résulat supprimé !' });
        })
        .catch(error => res.status(400).json({ error }));
}