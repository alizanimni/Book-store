const mongoose= require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        trim: true,
        required:true,
        unique:true
    },
    adress:{
        type: String,
        trim: true,
    },
    password:{
        type: String,
        trim: true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    books:[        
           {
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: "Book"
            } 
    ]

},{
    timestamps:true,
})

// userSchema.pre('save',async function(next){
//     const user = this
//     const email = await User.findOne({email:user.email})
//     if(email){
//     throw new Error("EMAIL_EXIST")        
//     }

//     next()
//  })

const User = mongoose.model('User', userSchema);

module.exports = User;