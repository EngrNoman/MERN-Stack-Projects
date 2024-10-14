const bcrypt = require('bcrypt')
const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken')


const login = async (req,res)=>{
  try{
    const { email , password} = req.body;
    const user = await UserModel.findOne({email});
    const errMsg ='Auth Failed email or password wrong'
    if(!user){
      return res.status(409)
            .json({massage : errMsg , success: false});
    }
    const isPassEqual = await bcrypt.compare(password , user.password);
    if(!isPassEqual){
      res.status(403)
      .json({massage : errMsg , success: false});
    }

    const  jwtToken = jwt.sign(
      {email: user.email , _id: user._id},
      process.env.JWT_SECRET,
      {expiresIn : '24h'}
    )

    res.status(200)
      .json({massage : "Login Success" , success: true ,
      jwtToken,
       email,
       name: user.name
      });

  }catch(err){
    res.status(201)
     .json({massage : 'Internal Server Error'  ,
       success: false,
       
    });
  }
}

const signup = async (req,res)=>{
  try{
    const {name , email , password} = req.body;
    const user = await UserModel.findOne({email});
    if(user){
      return res.status(409)
            .json({massage : 'User Already exit , you can login ' , success: false});
    }

    const userModel = new UserModel({name , email, password});
    userModel.password = await bcrypt.hash(password,10);
    await userModel.save()
    res.status(201)
    .json({massage : ' Sign Up Successfully ' , success: true});

  }catch(err){
    res.status(201)
     .json({massage : 'Internal Server Error' , success: false});
  }
}

module.exports = {
  signup,
  login
}