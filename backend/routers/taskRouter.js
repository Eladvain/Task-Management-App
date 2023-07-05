const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const connection = require('../config/db');
const auth = require('../routers/authRouter');


const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}


async function list_all_tasks_by_userID(req,res)
{
  const id = parseInt(req.params.id);
  
  const sqlQuery = `SELECT * FROM task WHERE user_id=${id}`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    console.log("in list all tasks by user id");
    res.status(StatusCodes.OK);
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

  async function get_task_by_status_done(req, res)
  {
    console.log("heree inn");
    const id = parseInt(req.params.id);
    const sqlQuery = `Select * From task Where user_id=${id} AND status_task = "Done";`;
    connection.query(sqlQuery, function(err, result) {
      if(err){
        throw err;
      }
      res.send({"tasks" : result});
  })
  }
  async function get_task_by_status_inProcess(req, res)
  {
    const id = parseInt(req.params.id);
    console.log("heree inn");
    const sqlQuery = `Select * From task Where user_id=${id} AND status_task = "In Process";`;
    connection.query(sqlQuery, function(err, result) {
      if(err){
        throw err;
      }
      res.send({"tasks" : result});
  })
  }

async function create_new_task(req, res)
{
  const {name, endDate, description, user_id} = req.body;
  console.log("name = "+name+" endDate = "+endDate);

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // console.log("heree");

  // This arrangement can be altered based on how we want the date's format to appear.
  let startDate = `${day}/${month}/${year}`;
  console.log("start date = "+startDate)

  const sqlQuery = `INSERT INTO task(name,start_date,end_date,status_task,description,user_id) VALUES ("${name}","${startDate}","${endDate}","In process","${description}",${user_id});`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    console.log("in connection query")
    res.send({msg : "data inserted to database"});
  })

}

async function update_task(req, res)
{
  const {id, field, value} = req.body;
  console.log("id = "+id+", field = "+field+", value = "+value);
  const sqlQuery = `Update task Set ${field}="${value}" Where id=${id};`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    res.send({msg : "update in database"});
  })
}

async function delete_task(req, res)
{
  const id = parseInt(req.params.id);
  // console.log("id = "+id+", field = "+field+", value = "+value);
  const sqlQuery = `Delete From task Where id=${id};`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    res.send({msg : "Delete from database"});
  })
}

router.get('/tasks/(:id)', auth.authenticate_token,  (req, res) => { list_all_tasks_by_userID(req, res) });
router.get('/task/(:id)', auth.authenticate_token,  (req, res) => { get_task_by_id(req, res) });
router.get('/byStatusDone/(:id)', auth.authenticate_token,  (req, res) => { get_task_by_status_done(req, res) });
router.get('/byStatusInProcess/(:id)', auth.authenticate_token,  (req, res) => { get_task_by_status_inProcess(req, res) });

router.post('/task', auth.authenticate_token, (req, res) => { create_new_task(req, res) });

router.put('/task', auth.authenticate_token, (req, res) => { update_task(req, res) });

router.delete('/task/(:id)', auth.authenticate_token, (req, res) => { delete_task(req, res) });


router.use( set_content_type );
module.exports = router;