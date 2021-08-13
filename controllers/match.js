const Match = require('../models/Match');
const Sponsor = require('../models/Sponsor');


//ajouter un match
function createMatch(req, res) {
  Match.findOne({ idcategorie: req.body.idcategorie, idequipe1: req.body.idequipe1, idequipe2: req.body.idequipe2, etat: "A venir" })
    .then(match => {
      if (!match) {
        const newMatch = new Match({
          date: Date.parse(req.body.date),
          heure: req.body.heure,
          idcategorie: req.body.idcategorie,
          idequipe1: req.body.idequipe1,
          coteequipe1: req.body.coteequipe1,
          idequipe2: req.body.idequipe2,
          coteequipe2: req.body.coteequipe2,
          coteMatchNull: req.body.coteMatchNull,
          etat: "A venir"
        });
        newMatch.save()
          .then(() => {
            res.status(201).json({ message: 'Le match a été créé !' });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      } else {
        res.status(409).json({ message: 'Le match existe déjà !' });
      }
    })
    .catch(error => res.status(500).json({ error }));
}

//update un match
function updateMatch(req, res) {
  const updatedMatch = new Match({
    _id: req.params.id,
    date: Date.parse(req.body.date),
    heure: req.body.heure,
    idcategorie: req.body.idcategorie,
    idequipe1: req.body.idequipe1,
    coteequipe1: req.body.coteequipe1,
    idequipe2: req.body.idequipe2,
    coteequipe2: req.body.coteequipe2,
    coteMatchNull: req.body.coteMatchNull,
    etat: req.body.etat
  });

   console.log(updatedMatch);

  Match.updateOne({ _id: req.params.id }, updatedMatch)
    .then(() => {
      res.status(200).json({ message: 'Le match a été modifié !'});
    })
    .catch(error => res.status(400).json({ error }));
}

// get all match
function getAllMatchAVenir(req, res){
  Match.find({ etat: "A venir"})
    .then((matchs) => {
      res.status(200).json(matchs);
    })
    .catch(error => res.status(400).json({ error }));
}

//liste des sponsors officiel
async function getSponsor(req, res) {
  var sponsors = await Sponsor.find({});
  res.send(sponsors);
}

//recuperer les 2 derniers matchs
async function getDerniersMatchs(req, res) {
  const match = await Match.find({etat: 'A venir'}).sort({ date: -1, heure: -1 }).limit(5);
  res.send(match);
}
async function getMatch(req,res) {
  try{
    var categorie = req.query.nomcategorie;
    let val = null ; 
    if(!categorie || typeof categorie ==="undefined") { 
      val = await getAllMatch(req);
    }
    else { 
      val = await getUnMatch(req,categorie);
    }
    res.send(val);
  }
  catch(e) { 
    res.send(e)
  }   
}


//recuperer les matchs avec pagination
async function getAllMatch(req) {
  var query = [
    { 
        $group : { 
            _id : "$idcategorie.nom", 
            match : {
                "$push" : "$$ROOT"
            }
        }
    }
  ];
  const etat = req.query.etat ; 
  if(etat && typeof etat !=='undefined') { 
    query.unshift(
      {
        $match : { 
            etat : `${etat}`
        }
      }
    );
  }
  var aggregateQuery = Match.aggregate(query)
  const val = await Match.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    }
  );
  return val;
}

async function getUnMatch(req,categorie) {
  var query =
    [
      {
        $match : {
            "idcategorie.nom" : `${categorie}`
        }
      },
      { 
          $group : { 
              _id : "$idcategorie.nom", 
              match : {
                  "$push" : "$$ROOT"
              }
          }
      }
    ]

    const etat = req.query.etat ; 
    if(etat && typeof etat !=='undefined') { 
      query.unshift(
        {
          $match : { 
            "idcategorie.nom" : `${categorie}`,
             etat : `${etat}`
          }
        }
      );
    }
    else{
      query.unshift(
        {
          $match : { 
            "idcategorie.nom" : `${categorie}`
          }
        }
      );
    }
    var aggregateQuery = Match.aggregate(query);
  
  const val = await Match.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    }
  );
  return val;
}

// récuperation d'un match par son id
function getOneMatchById(req, res){
  Match.findOne({ _id: req.params.id, etat: 'A venir' })
    .then((match) =>{
      res.status(200).json({ match });
    })
    .catch(error => res.status(400).json({ error }));
}

// suppression d'un match à venire
function removeMatchById(req, res) {
  Match.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: 'Le match a bien été supprimé !' });
    })
    .catch(error => res.status(400).json({ error }))
}

module.exports = {
  createMatch,
  getMatch,
  getDerniersMatchs,
  getSponsor,
  removeMatchById,
  updateMatch,
  getAllMatchAVenir,
  getOneMatchById
};
