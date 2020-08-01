export const handleSignIn =(req, res, db, bcrypt) =>{
  // console.log(req.body);
  const {email, password} = req.body;

  if (!email  || !password){
    return res.status(400).json('invalid form data')
  }
  if (!email.includes("@") ||!email.includes(".")  ){
    return res.status(400).json('Please enter a valid email')
  }

  db('login').select('email','hash').from('login')
  .where({'email':email})
  .then(data =>{
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid){
      db.select('*').from('users')
      .where({email})
      .then(user =>{
        //success
        res.json(user[0])
      }).catch( err=>{
        res.status(400).json('unable to get user')
      })
    }else{
      res.status(400).json('wrong username/password')
    }
  }).catch(err => {
    res.status(400).json('wrong username/password')
  })

  // if ( req.body.email === database.users[0].email && req.body.password ===database.users[0].password){
  //   res.json(database.users[0]);
  // }else{
  //   res.status(400).json('error logging in')
  // }

}
