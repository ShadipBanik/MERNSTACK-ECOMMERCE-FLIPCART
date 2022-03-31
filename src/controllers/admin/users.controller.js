const express=require('express');
const usersModel= require('../../models/users.js')
const jwt = require('jsonwebtoken');
const { convertBase64 } = require('../../middelwares/convertBase64Image.js');
exports.signIn =(req,res)=>{
    console.log(req.body)
   usersModel.findOne({email:req.body.email})
    .exec((error,user) => {
         if(error) return res.send({message:error,status:400})
         if(user){
            if(user.authenticate(req.body.password) && user.role=='admin'){
              const token= jwt.sign({ _id: user._id, role:user.role  },process.env.JWT_SECRET, { expiresIn: '12h' });
              res.send({
                  status:200,
                  token:token,
                  user:user
              })
            }else{
                res.send({message:"Invalid email or password",status:400})
            }
         }else{
           return res.send({message:"Something went wrong!",status:400})
         }
    })
}
exports.getAll = async (req,res) =>{
    console.log('hello')
    const users= await usersModel.find().then(result=>result)
    res.status(200).json(users)
}
exports.signUp =(req,res)=>{
  const body = req.body
  usersModel.findOne({email:body.email})
  .exec((error,user)=>{
      if(user)
      return res.send({
          message:"Admin Already Exist!",
          status:400
      })
     const {firstName,lastName,password,role,email,contactNumber}=req.body;
     const _user = new usersModel({
        firstName,
        lastName,
        password,
        email,
        role:"admin",
        username:firstName,
        contactNumber,
    });
    if(req.file){
        const file = convertBase64(req.file)
        _user.profilePicture = file
    }
     _user.save((error,data)=>{
         if(error){
             return res.send({
                 message:'Something went wrong'
             })
         }
         if(data){
             return res.send({
                 status:200,
                 message:"Admin registration sucessgully!",
                 result:data
             })
         }
     })
  })
}

exports.profile = (req,res) =>{
  res.send("hello")
}