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

async function get_all_users_name(req, res)
{
  console.log("in get all users name");
  const sqlQuery = `SELECT name FROM user`;
  connection.query(sqlQuery, function(err, result) {
    if(err){
      throw err.message;
    }
    res.send({users : result});
  })

}

async function get_all_users(req,res)
{

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
          }
          else{
            console.log("password not correct");
          }
        }catch(e){
          console.log(e.message);
        }
  res.send({users : result});
  })
  

//   try{
//     let resp = await bcrpyt.compare(req.body.password, user.password);
//      if(resp == true)
//      { 
//      const user_email = user.email;
//      const token = jwt.sign({ user_email }, "secret", { expiresIn: "1d" });
     
//      const token_string = "access_token=" + token;
//      res.setHeader('Set-Cookie', token_string +"; path=/") // create a cookie in the browser
//      res.send({token:token,
//                msg:"You sign in"});	 
//       } 
//      else{
//        res.status(StatusCodes.FORBIDDEN);
//        res.send({ msg: "Error password is not valid" });
//        return;
//      }
     
//  } catch (err) {
//    console.log("Error in Auth", err);
//    res.status( StatusCodes.BAD_REQUEST );
//  }
}


router.post('/signin',  (req, res) => { create_new_user(req, res) });
router.post('/login',  (req, res) => { log_in(req, res) });

router.get('/usersName',  (req, res) => { get_all_users_name(req, res) });

router.use( set_content_type );
module.exports = router;