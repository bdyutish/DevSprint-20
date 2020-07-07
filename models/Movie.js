const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    category:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    imdb:{
        type:Number
    },
    director:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    trailer:{
        type:String,
        default:null
    },
    cover_pic:{
        type:String,
        default:null
    },
    summary:{
        type:String,
        default:null
    }

});

module.exports = mongoose.model('movie', MovieSchema);
