const productModel = require ('../models/product');
const slugify = require('slugify');
const { convertBase64 } = require('../middelwares/convertBase64Image');
const product = require('../models/product');
exports.createProduct = async (req,res) => {
    console.log(req.files)
    var filelist=[];
    if(req.files.length>0){
        for(let files of req.files){
           const file = await convertBase64(files);
           filelist.push({img:file})
        }
     }
    const product = new productModel({
        name:req.body.name,
        slug:slugify(req.body.name , { lower: true, remove: /[*+~.?()',"!:@]/g }),
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        quantity:req.body.quantity,
        productPicture:filelist,
        createdBy:req.user._id
    })

    product.save((error,product) =>{
        if(error) return res.send({status:400,error:error})
        if(product){
            return res.send({status:200,message:"Product add successfully!",result:product})
        }
    })
}

exports.getAll = (req,res) => {
    productModel.find({}).
    exec((error,products)=>{
        if(error) return res.send({status:400,error:error})
        if(products){
            return res.send({status:200,message:"Product all get successfully!",result:products})
        }
    })
   
}

