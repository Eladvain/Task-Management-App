const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const connection = require('../config/db');


const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}


async function list_all_tasks(req,res)
{
  const sqlQuery = "SELECT * FROM task";
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    res.send({tasks : result});
  })
}

router.get('/task',  (req, res) => { list_all_tasks(req, res) });


router.use( set_content_type );
module.exports = router;