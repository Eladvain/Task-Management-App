const router = require('express').Router();
const StatusCodes = require('http-status-codes').StatusCodes;
const package = require('pkg.json');
const connection = require('../config/db');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

async function get_all_users_name(req, res)
{
  console.log("in get all users name");
  const sqlQuery = `SELECT name FROM user`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    console.log("users = "+JSON.stringify(result));
    res.send({users : result});
  })

}

async function log_in(req, res)
{
  const {name, password} = req.body;
  const sqlQuery = `SELECT * FROM user WHERE name='${name}'`;
  
  connection.query(sqlQuery, async function(err, result) {
    if(err){
      throw err.message;
    }
    
    console.log("users = "+JSON.stringify(result));
    try{
          let resp = await bcrpyt.compare(password, result[0].password);
          if(resp === true)
          {
            console.log("the same password");
            const token = jwt.sign({ name }, "secret", { expiresIn: "1d" });
            // console.log("typof = "+typeof token);
			      // const token_string = `access_token=${token}`;
            
            // console.log("token_string="+token_string);
            res.cookie("access_token", token, {
              httpOnly : true
            }).status(StatusCodes.OK);
			      res.send({token:token,
                      user : result,
			                msg:"You sign in"});
          }
          else{
            console.log("password not correct");
            res.status(StatusCodes.FORBIDDEN);
				    res.send({ msg: "Error password is not valid" });
				    return;
          }
        }catch(e){
          console.log(e.message);
          res.status( StatusCodes.BAD_REQUEST );
        }
  })
}

  async function authenticate_token(req, res, next)
{
  console.log("in authontication token");

  console.log("cookie = "+(req.headers?.cookie));
	const cookieHeader_pair = (req.headers.cookie).split("=");
  console.log("token in cookie = "+cookieHeader_pair);

	if (typeof cookieHeader_pair !== 'undefined' && cookieHeader_pair[0] !== 'access_token' || typeof cookieHeader_pair === 'undefined') {
		res.status(StatusCodes.FORBIDDEN);
		res.send({ msg: "please login" });
		return;
	}
	const token = cookieHeader_pair[1];
  console.log("tokennnn = "+token);
	let user_data_from_jwt;
	try{	
		if (typeof token == 'undefined') {
			res.status(StatusCodes.FORBIDDEN);
			return res.send({msg:"Invalid token, please try login to get new token"});
	}

  jwt.verify(token, "secret", async (err, user_name) => {
    if (err) {
      res.status(StatusCodes.FORBIDDEN);
      return res.send(
        {
          msg: "invalid token. please log in again!",
          status_code: StatusCodes.FORBIDDEN,
          Error_name: err.name
        });
    }
    console.log("user_name = "+user_name );
    res.locals.user_name = user_name;
				
    if (typeof user_name !== 'undefined') {
        res.status(StatusCodes.FORBIDDEN);
      }
      next();
      
  })
  
}catch(e){
  console.log(e.message);
  res.status(StatusCodes.FORBIDDEN);
  res.send({msg: err.name, Error: "token invalid"})
  }
}

// async function get_all_users(req, res)
// {
//   const sqlQuery = `SELECT name FROM user'`;
  
//   connection.query(sqlQuery, async function(err, result) {
//     if(err){
//       throw err.message;
//     }
    
//     console.log("users = "+JSON.stringify(result));
//     res.send({
//               users : result,
//               msg:"users returned"});

    
// })
// }

router.post('/signin',  (req, res) => { create_new_user(req, res) });
router.post('/login',  (req, res) => { log_in(req, res) });

router.get('/usersName',  (req, res) => { get_all_users_name(req, res) });
// router.get('/users',  (req, res) => { get_all_users(req, res) });


router.use( set_content_type );
module.exports = {router, authenticate_token};