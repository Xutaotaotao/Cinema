/**
 * Created by 徐涛焘 on 1/31/2018.
 */
const  mongoose = require('mongoose');
//连接mongodb
mongoose.connect('mongodb://localhost/movies');
//实例化连接对象
const db = mongoose.connection;
db.on('error',console.error.bind(console,'连接错误：'));
db.once('open',(callback) => {
    console.log('mongodb连接成功');
});
//创建schema
const movieSchema = new mongoose.Schema({
    id:Number,
    alt:String,
    year:Number,
    title:String,
    rating:Number,
    original_title:String,
    directors:String,
    casts:String,
    genres:String,
    image:String
});
const  movieModel = mongoose.model('movies',movieSchema);//newClass为创建或选中的集合
module.exports = movieModel;