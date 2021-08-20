const mongose = require('mongoose')
const bcrypt  = require('bcrypt')
const { route } = require('../routes')

const userSchema = new mongose.Schema({
   
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },

    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    username:{
        type:String,
        required:true,
        trim:true,
        uniq:true,
        index:true,
        lowercase:true,
    },
    username:{
        type:String,
        required:true,
        trim:true,
        uniq:true,
        lowercase:true,
    },
    hash_password:{
        type:String,
        required:true
    },  
    role:{
        type:String,
        enum:['user','admin'],
        default:'admin',
    },
    contactNumber:{
        type:String
    },
    ptofilePicture:{
        type:String,
    }
},{timestamp:true})

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10);
});

userSchema.methods={
    authenticate:function(password){
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongose.model('Users',userSchema)