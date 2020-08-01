export const  handleRegisteration = (req, res, db, bcrypt) =>{
  const {email, name, password} = req.body;
  if (!email || !name || !password){
    return res.status(400).json('invalid form data')
  }
  if (!email.includes("@") ||!email.includes(".")  ){
    return res.status(400).json('Please enter a valid email')
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
 // Store hash in your password DB.


  // bcrypt.hash(password, 10, function(err, hash) {
  //     // Store hash in your password DB.
  //     console.log(hash);
  // });
  db.transaction(trx =>{

      trx.insert({
        hash:hash,
        email: email
      })
      .into('login')
      .returning('email')
      .then(loginemail =>{
          // returning is used to return the inserted data
          return trx('users')
          .returning('*')
          .insert({
            email: loginemail[0],
            name:name,
            joined: new Date()
          })
          .then(user =>{
            //success
            res.json(user[0])
          })

        })
      .then(trx.commit)
      .catch(trx.rollback);

  })  .catch(err=>{
    console.log("here is my error");
    console.log(err);
    console.log('');
      if(err.detail.includes("already exists")){
    return  res.status(400).json('This email is alreaday in use')
    }else{
      console.log('it is coming in);
    return  res.status(400).json('unable to register')
    }
    })



  // res.json(database.users[database.users.length-1])

}
