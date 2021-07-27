const Resultat = require('../models/Resultat');
//liste des resultats des matchs

async function getResultatParCategorie(req,res) {
  try{
    var aggregateQuery = Resultat.aggregate(
      [
          {
              $unwind : '$idmatch' // destructurer le tableau venant des documents , nom du colonne
          },
          {
              $lookup : {
                  from : 'matchs', // nom du table avec 's' parce que c'est généré automatiquement par le cloudATlas (mongodb)
                  localField : 'idmatch',
                  foreignField : '_id' , 
                  as : 'idmatch'
              }
          },
          {
            $addFields : { 
                "categorie" : "$idmatch.idcategorie.nom"
            }
          }, 
          {
              $unwind : "$categorie"
          },
          { 
              $group : { 
                  _id : "$categorie", 
                  match : {
                      "$push" : {
                        $arrayElemAt : ["$idmatch",0]
                      }
                  }
              }
          }
      ]
    
  );
  const val = await Resultat.aggregatePaginate(
    aggregateQuery,
    {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    }
    ) ; 
    res.send(val);
  }
  catch(e){
    console.log(e);
  }
}
function getResultat(req, res) {
    var aggregateQuery = Resultat.aggregate(
        [
            {
                $unwind : '$idmatch' // destructurer le tableau venant des documents , nom du colonne
            },
            {
                $lookup : {
                    from : 'matchs', // nom du table avec 's' parce que c'est généré automatiquement par le cloudATlas (mongodb)
                    localField : 'idmatch',
                    foreignField : '_id' , 
                    as : 'idmatch'
                } 
            }
        ]
    );
    Resultat.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, resultats) => {
        if (err) {
          res.send(err);
        }
        res.send(resultats);
      }
    );
  }
  
  module.exports = {
    getResultat,
    getResultatParCategorie
  };
  