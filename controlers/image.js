// clarifai
import Clarifai from 'clarifai'
const app = new Clarifai.App({
 apiKey: 'ac2d398fd77a4f3cb512614926e846af'
});

export const handleApiCall = (req, res) =>{
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data=>{
    res.json(data)
  }).catch(err => res.status(400).json('unable to work with api'))
}




export const handleImage = (req,res,db) => {
 const {id} = req.body;
 db('users').where({'id':id})
 .increment('entries', 1)
 .returning('entries')
 .then(entries =>{
   res.json(entries[0])
 })
 .catch(err=> res.status(400).json('Unable to get entries count'))


}
