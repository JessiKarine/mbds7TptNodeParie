const Pari = require('../models/Pari');
const mongoose = require('mongoose');
const ObjectId = mongoose.mongo.ObjectID;

// create un nouvel pari
exports.createPari = (req, res, next) => {
    const newPari = new Pari({
        idMatch: req.body.idMatch,
        idEquipe: req.body.idEquipe,
        idUser: req.body.idUser,
        mise: req.body.mise
    });

    newPari.save()
        .then((pari) => {
            res.status(201).json({ message:  pari._id});
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
}

exports.createPariBack = async (req, res, next) => {
    const id = await Pari.countDocuments();
    const _id = new ObjectId(id);
    const newPari = new Pari({
        _id :_id ,
        idMatch:  req.body.idMatch._id,
        idEquipe:  req.body.idEquipe,
        idUser: req.body.idUser._id,
        mise: req.body.mise
    });
    await Pari.create(newPari)
        .then((pari) => {
            res.status(201).json({ message:  pari._id});
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

exports.updatePariBack = (req, res, next) => {
    const updatedPari = new Pari({
        _id: req.params.id,
        idMatch: mongoose.Types.ObjectId(req.body.idMatch._id),
        idEquipe:  req.body.idEquipe,
        idUser: mongoose.Types.ObjectId(req.body.idUser._id),
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

exports.getPariByIdObject = (req, res, next) => {
    //console.log("get pari by id  ");
    Pari.findOne({ _id: req.params.id})
        .populate({path : "idMatch" , model : "matchs" })
        .populate({path : "idUser" , model : "Utilisateur" })
        .then((pari) => {
            res.status(200).json(pari)
        })
        .catch((error) => {
            console.error(error);
            res.status(400).json({error});
        })
}

exports.getParis = (req, res, next) => {
    var aggregateQuery = Pari.aggregate(
        [
            {
                $unwind : '$idMatch',// destructurer le tableau venant des documents , nom du colonne
            },
            {
                $lookup : {
                    from : 'matchs', // nom du table avec 's' parce que c'est généré automatiquement par le cloudATlas (mongodb)
                    localField : 'idMatch',
                    foreignField : '_id' , 
                    as : 'idMatch'
                }
            },
            {
                $unwind : '$idUser'
            },
            {
                $lookup : {
                    from : 'utilisateurs', // nom du table avec 's' parce que c'est généré automatiquement par le cloudATlas (mongodb)
                    localField : 'idUser',
                    foreignField : '_id' , 
                    as : 'idUser'
                }
            },
            {
            $project : { //mi filtrer colonne rehefa amoka resultat 1 ba 0 no miasa
                "_id" : 1,
                "idEquipe" : 1,
                "mise": 1, 
                idMatch : { 
                $arrayElemAt : ["$idMatch",0],
                },
                idUser : { 
                $arrayElemAt : ["$idUser",0]
                }
            }
            }
        ]
    );
    Pari.aggregatePaginate(
        aggregateQuery,
        {
          page: parseInt(req.query.page) || 1,
          limit: parseInt(req.query.limit) || 10,
        },
        (err, pari) => {
          if (err) {
            res.send(err);
          }
          res.send(pari);
        }
    );

}


exports.countPariParMatch = async (req, res) => {
    try {
        var aggregateTab = [
           
            {
                $group : { 
                    _id : "$idMatch",
                    count : { 
                        $sum :1
                    }
                }
                
            }
            ,
             {
                $unwind : '$_id',// destructurer le tableau venant des documents , nom du colonne
            },
            {
                $lookup : {
                    from : 'matchs', // nom du table avec 's' parce que c'est généré automatiquement par le cloudATlas (mongodb)
                    localField : '_id',
                    foreignField : '_id' , 
                    as : '_id'
                }
            },
            {
                $project : { //mi filtrer colonne rehefa amoka resultat 1 ba 0 no miasa
                    _id : { 
                        $arrayElemAt : ["$_id",0],
                    },
                    "count" : 1
                }
            }
        ];
        var aggregateQuery =  await Pari.aggregate(aggregateTab);
        res.status(200).send(aggregateQuery);
    }
    catch(e) { 
        console.log("e",e);
        res.status(500).send(e)
    }

}