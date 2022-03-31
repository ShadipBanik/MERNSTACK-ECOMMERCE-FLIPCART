const mongose = require('mongoose')
const bcrypt  = require('bcrypt')

const userSchema = new mongose.Schema({
   
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:20
    },
    email:{
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
    },
    hash_password:{
        type:String,
        required:true
    },  
    role:{
        type:String,
        enum:['user','admin'],
        default:'user',
    },
    contactNumber:{
        type:String
    },
    profilePicture:{
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