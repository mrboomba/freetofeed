const User = require('../models/user');
const router = require('express').Router();
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');

router.post('/register', async function (req, res, next) {

  try {
    const doc = await User.create({
      auth: {
        email: req.body.email,
        password: User.schema.methods.generateHash(req.body.password),
      }
    })
    console.log('test');
    return res.status(200).json(doc);
  } catch (e) {
    console.log(e);

    return res.status(501).json({ message: 'Error registering user.' })
  }
})

router.post('/login', async function (req, res, next) {
  try {
    const doc = await User.findOne({ "auth.email": req.body.email })
    if (doc) {
      if (doc.schema.methods.validPassword(req.body.password, doc.auth.password)) {
        // generate token
        let token = jwt.sign({ username: doc.auth.email }, 'boomba', { expiresIn: '3h' });

        return res.status(200).json(token);

      } else {
        return res.status(501).json({ message: ' Invalid Credentials' });
      }
    } else {
      console.log(doc);

      return res.status(501).json({ message: 'User email is not registered.' })
    }
  } catch (e) {
    console.log(e);
    return res.status(501).json({ message: 'Some internal error' });
  }

})

router.post('/available', verifyToken, async (req, res) => {
  console.log(req.user);
  
  let user = await User.findOne({ "auth.email": req.user.username })

  if(!user.available){
    user.available = []
  }
  const { date, count, cost, breed, contract } = req.body
  user.available.push({ date, count, cost, breed, contract })
  user.save(err=>{
    if(err){
      return res.status(500)
    }
      return res.json(user)
  })
  
})

router.post('/duty', verifyToken, async (req, res) => {
  let user = await User.findOne({ "available._id": req.body.rowData._id })
  const { date, count, cost, breed, contract } = req.body
  user.available = user.available.filter(data=>{
    if(data._id!=req.body.rowData._id){
      return data
    }
  })
  if(!user.onDuty){
    user.onDuty = []
  }
  user.onDuty.push(date, count, cost, breed, contract)
  user.save(err=>{
    if(err){
      return res.status(500)
    }
      return res.json(user)
  })
  
})

router.get('/duty', verifyToken, async (req, res) => {
  let user = await User.findOne({ "auth.email": req.user.username })
  if(user)
  return res.json(user.onDuty)
  return res.status(500)
  
})

router.get('/getUser', verifyToken, (req, res) => {
  return res.send(req.user);
});

var decodedToken = '';
function verifyToken(req, res, next) {
  let token = req.headers.authorization;

  jwt.verify(token, 'boomba', function (err, tokendata) {
    console.log('token>>>>', tokendata);

    if (err) {
      return res.status(401).json({ message: ' Unauthorized request' });
    }
    if (tokendata) {
      req.user = jwt.decode(token, 'boomba')
      next();
    }
  })
}
module.exports = router;
