const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name:{ type:String,required:true,trim:true},
  slug:{type:String,required:true,unique:true},
  price:{type:Number,required:true},
  description:{type:String,required:true,trim:true},
  offer:{type:Number},
  category:{
     type:mongoose.Schema.Types.ObjectId, ref:'Category',
     required:true
  },
  quantity:{type:Number,required:true},
  productPicture:[
      {img:{type:String}}
  ],
  reviews:
  { 
      userId:{type:mongoose.Schema.Types.ObjectId, ref:'Users'},
      review:String
  },
  createdBy:{
      type:mongoose.Schema.Types.ObjectId, ref:'Users'
  },
  updatedAt:Date,
},{timestamps:true})

module.exports = mongoose.model('Product',productSchema)