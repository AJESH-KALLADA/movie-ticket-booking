import User from "../models/user.js";

export const getAllUsers = async(req,res,next)=> {
    let users;
    try {
        users = await User.find();
    }
    catch (err) {
        return console.log(err);
    }
    if(!users) {
        return res.status(500).json({message:"Unexpecter Error occured"});
    }
    return res.status(200).json({ users });
};

export const signup = async(req,res,next) => {
    const {name,email,password} =req.body;
    if(!name && name.trim()==="" &&
       !email && email.trim()==="" &&
       !password && password.trim()==="")
       {
       return res.status(422).json({message: "invalid inputs"});
       }

       let user;
       try {
        user = new User({name,email,password});
        user = await user.save();
       } catch (err) {
        return console.log(err);
       }
       if (!user) {
        return res.status(500).json({ message: "Unexpected error occurred" });
       }
       return res.status(201).json({user});

   };
