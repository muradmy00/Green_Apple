import userModel from "../models/userModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



// Create Token 

const createToken = (id) => {

    return jwt.sign({ id }, process.env.JWT_SECRET)

}



// Route for User Login
const loginUser = async (req,res)=> {

    try {
        
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){

            return res.json({ success: false, message: "User doesn't exists" })
        }

        const isMatch = await bcrypt.compare(password, user.password)


        if(isMatch){

            const token = createToken(user._id)
            res.json({success:true, token})

        }
        else{

            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}  




// Route for User Register

const registerUser = async (req,res) => {

   try {

    const {name, email, password} = req.body;

    // Checking user already exists or not

    const exists = await userModel.findOne({email})
    
    if(exists){

        return res.json({success:false, message:"User already exists"})
    }

    // validating email format & strong password

    if(!validator.isEmail(email)){

        res.json({ success: false, message: "Please Enter a Valid Email" })
    }

    if (password.length < 8) {

       res.json({ success: false, message: "Please Enter a Strong Password" })
    }

    // Hashing user Password

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)


    const newUser = new userModel({

        name,
        email,
        password:hashedPassword

    })

    const user = await newUser.save()



    const token = createToken(user._id)

    res.json({success:true,token})

    
   } catch (error) {

    console.log(error)

    res.json({success:false,message:error.message})
    
   }

}


// Route for Admin Login

const adminLogin = async (req, res) => {

    try {

        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            
            const token = jwt.sign(email+password,process.env.JWT_SECRET)

            res.json({success:true, token})
        }
        else{
            
            res.json({success:false, message:"Invalid Credentials"})
        }
        
    } catch (error) {
        
        console.log(error)

        res.json({ success: false, message: error.message })

    }

}


export { loginUser, registerUser, adminLogin}