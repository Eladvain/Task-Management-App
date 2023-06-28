const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const connection = require('../config/db');
const bcrpyt = require('bcrypt');

const set_content_type = function (req, res, next) 
{
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	next()
}

function ovrride_token(res) {
	const token_string = "access_token=" + "empty_token";
	res.setHeader('Set-Cookie', token_string +"; path=/")
}

async function create_new_user(req,res)
{
  const {name, password} = req.body;
  console.log("in create new user");
		try{
			let pas = await bcrpyt.hash(password, 10);
      const sqlQuery = `INSERT INTO user(name,password) VALUES ("${name}","${pas}");`;
      console.log("query = "+sqlQuery)
      connection.query(sqlQuery, function(err, result) {
        if(err){
          throw err.message;
        }
        console.log("in connection query")
        ovrride_token(res);
        res.send({msg :"user created"}).status(StatusCodes.OK);
      })
		
			
	}catch(error){
		res.status( StatusCodes.BAD_REQUEST );
	}
}


router.post('/signin',  (req, res) => { create_new_user(req, res) });

router.use( set_content_type );
module.exports = router;