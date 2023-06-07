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

async function get_task_by_id(req, res)
{
  const id = parseInt(req.params.id);
	if ( id <= 0)
	{
		res.status( StatusCodes.BAD_REQUEST );
		res.send({msg:"Bad id given"}).status(StatusCodes.BAD_REQUEST)
		return;
	}

  const sqlQuery = `SELECT * FROM task WHERE id=${id}`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    res.send({task : result});
  })

}

async function create_new_task(req, res)
{
  const {name, endDate, status, description} = req.body;
  console.log("name = "+name+" endDate = "+endDate);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // console.log("heree");

  // This arrangement can be altered based on how we want the date's format to appear.
  let startDate = `${day}/${month}/${year}`;
  console.log("start date = "+startDate)

  const sqlQuery = `INSERT INTO task(name,start_date,end_date,status,description) VALUES ("${name}","${startDate}","${endDate}","${status}","${description}");`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    res.send({msg : "data inserted to database"});
  })

}

router.get('/task',  (req, res) => { list_all_tasks(req, res) });
router.get('/task/(:id)',  (req, res) => { get_task_by_id(req, res) });
router.post('/task',  (req, res) => { create_new_task(req, res) });


router.use( set_content_type );
module.exports = router;