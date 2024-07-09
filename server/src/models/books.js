const mongoose= require('mongoose')

const bookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    auther:{
        type: String,
        default: false,
        trim: true,
    },
    urlPhoto:{
        type: String,
        trim: true,
    },
    summary:{
        type: String,
        trim: true,
    },
    price:{
        type:Number,
        trim:true,
        default:0
    },
    discount:{
        type:Number,
        default:0
    }

},{
    timestamps:true,
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;