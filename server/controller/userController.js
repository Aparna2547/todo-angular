import User from "../model/userModel.js";

export const Signup = async (req,res)=>{
    try {
      const {name,phone,password} = req.body  
      console.log('login',req.body)

      const existingPhone = await User.findOne({phone})
      if(existingPhone){
        res.status(401).json({message:"Phone number already exist"})
      }else{
        const newUser = new User({
            name,
            phone,
            password
        })
        await newUser.save();
        console.log('saved')
        res.status(200).json({message:"User saved"})
      }
    } catch (error) {
        console.log(error);
    }
}

export const Login = async(req,res)=>{
    try {
        const {phone,password}  = req.body
        console.log(req.body)
        const userFound = await User.findOne({phone})
        console.log('user',userFound);
        if(userFound){
            console.log('hi',userFound.password,password)
            if(userFound.password == password){
                console.log('password matched');
                res.status(200).json({message:"you are logged in",token:'tkn123'})
            }else{
                res.status(401).json({message:"Incorrect Password "})
            }
        }else{
            res.status(401).json({message:"Invalid credentials"})

        }
    } catch (error) {
        console.log(error);
    }
}

