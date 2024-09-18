const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult, matchedData } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const JWT_SECRET="Aryanisagoo$dboy";
const fetchuser= require('../midddleware/fetchuser');



// ROUTE 1 : Create a new user
router.post('/createuser', [
    body('name', 'Name should be more than 3 characters').isLength({ min: 3 }).escape(),
    body('email', 'Enter a valid Email').isEmail().escape(),
    body('password', 'Enter a strong password').isLength({ min: 5 }).escape(),
  ], async (req, res) => {
    let success = false;
    const result = validationResult(req);
  
    if (!result.isEmpty()) {
      success=false;
      console.log(result.array()); // Log the validation errors
      res.status(400).json({ success,errors: result.array() });
    }
      try {

        const userData = matchedData(req);
        let check =await User.findOne({email:userData.email});
        if(check){
          res.status(400).json({ success,error:"User Already Exist" });
        }
        else{
     // Hash the password before saving it to the database
     const hashedPassword = await bcrypt.hash(userData.password, 10);
       
     // Save the user with the hashed password
     const user = new User({
       name: userData.name,
       email: userData.email,
       password: hashedPassword,
     });
     const data={
         user:{
             id:user.id,
         }
     }
   const authToken= jwt.sign(data,JWT_SECRET);

     const savedUser = await user.save();
     success=true;
     res.status(201).json(savedUser);
        }
      
        }
      
       

       catch (error) {
        success=false;
      res.status(400).json({ success,errors: "Internal Server Error"});
      }
      
  });






// ROUTE 2: Authenticate the user 
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail().escape(),
    body('password', 'Password cannot be blank').exists().escape(),

   
  ], async (req, res) => {
   let success=false;
    const result = validationResult(req);
    if (!result.isEmpty()){
        console.log(result.array()); // Log the validation errors
        res.status(400).json({ errors: result.array() });
    }

    const {email,password} = req.body;
    try{
        let user= await User.findOne({ email });
        if(!user){
           return res.status(404).json({error:"Invalid try to login with correct credentials"});

        }
        const passwordCompare= await bcrypt.compare(password,user.password);
        if(!passwordCompare){
           return res.status(404).json({error:"Invalid try to login with correct credentials"});

        }
        const data={
            user:{
                id:user.id,
            }
        }
      const authToken= jwt.sign(data,JWT_SECRET);
       success=true
      res.json({success,authToken});
    }catch(error){
        console.error(error);
         success=false;
        res.status(500).send({success,error:'Internal Server Error'});
    }
       
  });




//   ROUTE 3: GET loggde in User info

router.post('/getuser',fetchuser,async (req, res) => {
   
   let success=false;
    try {
        userId=req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send({success,user});
    } catch (error) {
        console.error(error);
        success=false;
        res.status(500).send({success,error:'user does not exist'})
    }

  })

module.exports = router;
