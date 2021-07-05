const Match = require('../models/Match');
const Sponsor =  require('../models/Sponsor');

//liste des sponsors officiel
async function getSponsor(req, res) {
    var sponsors = await Sponsor.find({});
    res.send(sponsors);
  }

//recuperer les 2 derniers matchs
async function getDerniersMatchs(req, res) {
    const match = await Match.find({}).sort({date: -1,heure: -1}).limit(2);
    res.send(match);
    
}

//recuperer les matchs avec pagination
function getMatch(req, res) {
    var aggregateQuery = Match.aggregate();
    Match.aggregatePaginate(
      aggregateQuery,
      {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
      },
      (err, matchs) => {
        if (err) {
          res.send(err);
        }
        res.send(matchs);
      }
    );
  }
  
  module.exports = {
    getMatch,
    getDerniersMatchs,
    getSponsor
  };
  