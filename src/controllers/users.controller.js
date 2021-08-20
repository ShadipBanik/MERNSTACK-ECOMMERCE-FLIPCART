const express=require('express');
const usersModel= require('../models/users.js')

exports.signIn =(req,res)=>{
   res.send('hello port')
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
        username:Math.random().toString()
    });
     _user.save((error,data)=>{
         if(error){
             return res.status(400).json({
                 message:'Something went wrong'
             })
         }
         if(data){
             return res.status(201).json({
                 result:data
             })
         }
     })
  })
}