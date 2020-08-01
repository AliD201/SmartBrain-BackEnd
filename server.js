import express from 'express';
import bcrypt from 'bcrypt';
import cors from 'cors';
import knex from 'knex';
import { handleRegisteration } from './controlers/register.js'
import { handleSignIn } from './controlers/signIn.js'
import { handleProfile } from './controlers/profile.js'
import { handleImage,handleApiCall } from './controlers/image.js'
const app = express()

// const port = process.env.PORT;
const port = process.env.PORT || 3000;



// librarries
app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

//db

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '12345',
    database : 'smart-brain'
  }
});


// db.select('*').from('users')
// .then(data=>{
//   console.log(data);
// })
// const database = {
//   users:[
//     {
//       id: '123',
//       name:'john',
//       email:'john@gmail.com',
//       password:'cookies',
//       entries: 3,
//       joined: new Date()
//     },
//     {
//       id: '124',
//       name:'sally',
//       email:'sally@gmail.com',
//       password:'bananas',
//       entries: 0,
//       joined: new Date()
//     }
//   ],
//   login:[
//     {
//       id:'987',
//     hash: '',
//     email: 'john@gmail.com'
//     }
//   ]
// }

app.listen(port, ()=>{
  console.log(`listining at port ${port}`);
})


app.get('/', (req,res) =>{
  res.json('its working')
})




app.get('/profile/:id', (req,res) =>{handleProfile(req,res, db) })

app.post('/signin', (req,res)=> {handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegisteration(req, res, db, bcrypt)})

app.put('/image', (req,res) => {handleImage(req,res,db) })

app.post('/imageUrl', (req,res) => {handleApiCall(req,res) })
//
// // Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//     // result == true
// });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });
