const express=require('express');
const usersModel= require('../models/users.js')
const jwt = require('jsonwebtoken')
const {validationResult } = require('express-validator')

exports.signIn =(req,res)=>{
   usersModel.findOne({email:req.body.email})
    .exec((error,user) => {
         if(error) return res.status(400).json({error})
         if(user){
            if(user.authenticate(req.body.password)){
              const token= jwt.sign({ _id: user._id ,role:user.role  },process.env.JWT_SECRET, { expiresIn: '12h' });
              res.status(200).json({
                  token:token,
                  user:user
              })
            }else{
                res.status(400).json({message:"Invalid email or password"})
            }
         }else{
           return res.status(400).json({message:"Something went wrong!"})
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
      return res.status(400).json({ 
          message:"User Already Exist!",
          status:400
      })
     const {firstName,lastName,username,password,email,contactNumber}=req.body;
     const _user = new usersModel({
        firstName,
        lastName,
        password,
        email,
        role:"user",
        username,
        contactNumber,
    });
     _user.save((error,data)=>{
         if(error){
             return res.status(400).json({
                 message:'Something went wrong'
             })
         }
         if(data){
             return res.status(201).json({
                 message:"User registration sucessgully!",
                 result:data
             })
         }
     })
  })
}

exports.profile = (req,res) =>{
  res.send("hello")
}