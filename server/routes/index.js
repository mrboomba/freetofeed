const User = require('../models/user');
const router = require('express').Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

router.get('/available',async (req,res)=>{
  try{
    const users = await User.find({})
    const data = await users.map(user=>{
      return user.toObject() 
    }).map(datum=>{
      const {available} = datum 
      console.log(available);
      return available
    })
    let result =[]
    for(let x of data){
      for(let y of x){
        result.push(y);
      }
    }    
    result.sort();
    return res.json(result);
  }
  catch{
    return res.status(500)
  }
  
})





module.exports = router;
