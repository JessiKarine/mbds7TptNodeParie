const Resultat = require('../models/Resultat');
//liste des resultats des matchs

async function getResultatParCategorie(req,res) {
  try{
    var categorie = req.query.nomcategorie;
    let val = null ; 
    if(!categorie || typeof categorie ==="undefined") { 
      val = await getResultatParToutCategorie(req);
    }
    else { 
      val = await getResultatParUnCategorie(req,categorie);
    }
    res.send(val);
  }
  catch(e) { 
    res.send(e)
  }   
}

async function getResultatParToutCategorie(req) { 
    try { 
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
                  "categorie" : "$idmatch.idcategorie.nom", 
              }
            }, 
            {
                $unwind : "$categorie"
            },
            {
              $project : { 
                  "categorie" : 1,
                  "pointequipe1" : 1,
                  "pointequipe2" : 1 ,
                  "idmatch" : 1
              }
            },
            {
              $addFields : { 
                  "idmatch.pointequipe1" : "$pointequipe1",
                  "idmatch.pointequipe2" : "$pointequipe2"
              }
            },
            { 
                $group : { 
                    _id : "$categorie", 
                    resultats : {
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
        return val;
  }
  catch(e){
    console.log(e);
  }
}
async function getResultatParUnCategorie(req,nom) { 
  try { 
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
            $match : {
                "idmatch.idcategorie.nom" : `${nom}`
            }
          },
          {
            $addFields : { 
                "categorie" : "$idmatch.idcategorie.nom", 
            }
          }, 
          {
              $unwind : "$categorie"
          },
          {
            $project : { 
                "categorie" : 1,
                "pointequipe1" : 1,
                "pointequipe2" : 1 ,
                "idmatch" : 1
            }
          },
          {
            $addFields : { 
                "idmatch.pointequipe1" : "$pointequipe1",
                "idmatch.pointequipe2" : "$pointequipe2"
            }
          },
          { 
              $group : { 
                  _id : "$categorie", 
                  resultats : {
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
      return val;
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
  