const categoryModel= require("../models/category")
const slugify = require('slugify')
const { convertBase64 } = require("../middelwares/convertBase64Image")
exports.catgoryCreate = async (req,res) => {
  const categoryObj = new categoryModel({
     name: req.body.name,
     slug: slugify(req.body.name),
  })

  if (req.body.parentId){
    categoryObj.parentId = req.body.parentId
  }

  if(req.file){
     const file = await convertBase64(req.file)
     categoryObj.categoryImage=file;
  }
  categoryObj.save((error,category) =>{
           if(error){
             return res.send({error:error})
           }
           if(category){
             return res.send({
               status:200,
               message:"Category create successfully!",
               result:category
             })
           }
  })
}
function createCategories(categories, parentId=null){
    const categoryList=[];
    let category;
    if(parentId == null){
     category = categories.filter(cat => cat.parentId == undefined)
    }else{
      category = categories.filter(cat => cat.parentId == parentId)
    }

    for(let cate of category){
      categoryList.push({
        _id:cate._id,
        name: cate.name,
        slug: cate.slug,
        parentId:cate.parentId?cate.parentId:null,
        categoryImage:cate.categoryImage?cate.categoryImage:null,
        children: createCategories(categories,cate._id)
      })
    }

   return categoryList; 
}

exports.getAllCategory = (req,res) =>{
   categoryModel.find({}).
   exec((error,categories) => {
     if(error) return res.send({error:error,status:400})
     if(categories){
       const categoryList= createCategories(categories)
       return res.send({result:categoryList,status:200})
     }
   })
     
}

exports.deletetCategory = async (req,res) => {
  const id = req.params.id;
  console.log(id)
  const category = await categoryModel.find({ $or: [{ _id: id }, { parentId: id }] })

  if (category.length > 0) {
    for (let cat of category) {
     await categoryModel.findOneAndDelete({ _id: cat._id })
    }
    return res.send({ status: 200, message: "Category delete succesfully!" })
      
  } else {
    return res.send({ status: 400, message: "Not found this id " })
  }
}