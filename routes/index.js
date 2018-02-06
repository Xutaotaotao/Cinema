
var express = require('express');
var app = express.Router();
const movieModel = require('../modules/my_movies');


//将所有数据接口放在api里面
app.get('/api/all_movies',function (req,res) {
    let response = res;
    movieModel.find({}, (err, result, res) => {
        if(err){
            return console.log(err);
        }
        response.send(result);//将查询到的数据存储到api
    });
});

//将数据接口按电影分类放在api里面

app.get('/api/category_movies',function (req,res) {
    let response = res;
    movieModel.find({}, (err, result, res) => {
        if(err){
            return console.log(err);
        }
        let genres = [];
        result.forEach(movie => {
            let movieGenres = movie.genres;
            let singleGenre = movieGenres.split(',');
            for(i in singleGenre){
                if(!genres.includes(singleGenre[i])){
                    genres.push(singleGenre[i]);
                }
            }
        });
        response.send(genres);//将查询到的数据存储到api
    });
});
/*app.get('api/category_movies',function (req,res) {
    let response = res;
    movieModel.find({},(err,result,res) => {
        if(err){
            return console.log(err);
        }
        let categoryMovies = [];
        result.forEach(movie => {
            let movieGenres = movie.genres.splice(',');
            for(i in movieGenres){
                if(!genres.includes(movieGenres[i])){
                    categoryMovies.push(movieGenres[i]);
                }
            }
        });
        response.send(categoryMovies);
    });
});*/

//按名字查询功能
app.post('/',function (req,res) {
    let response = res;
    let keyWord = req.body.keyword;
    movieModel.find({"title":{$regex:keyWord}}, (err, result) => {
        if(result){
            response.render('search',{result});
        }else {
            response.send("亲，建议你重新输入电影名称查询，你查询的电影数据库没有啊!");
        }


    });

});
// 首页

app.get('/', (req, res, next) => {
    let response = res;
    classModel.find({}, (err, result, res) => {
        console.log(result);
        if(err){
            return console.log(err);
        }
        // response.render('index', { result });
        response.json({result});
    });
});
// 增加学生信息
app.get('/create', (req, res, next) => {
    res.render('create', {});
});
app.post('/create', (req, res, next) => {
    let newStudent = [{
        name: req.body.name,
        studentId: req.body.student_id
    }];
    classModel.create(newStudent, (err) => {
        if(err){
            return console.log(err);
        }
        res.send("<a href='/'>添加成功，点击返回首页</a>");
    })
});
// 删除学生信息
app.get('/del', (req, res, next) => {
    let response = res
    classModel.find({}, (err, result, res) => {
        if(err){
            return console.log(err);
        }
        response.render('del', { result })
    });
});
app.post('/del', (req, res, next) => {
    classModel.remove({_id: req.body.student}, (err, result) => {
        if(err){
            return console.log(err);
        }
        console.log(result.result);
        res.send("<a href='/'>删除成功，点击返回首页</a>")
    });
});
// 修改学生信息
app.get('/update', (req, res, next) => {
    let response = res;
    classModel.find({}, (err, result, res) => {
        if(err){
            return console.log(err);
        }
        response.render('update', { result });
    });
});
app.post('/update', (req, res, next) => {
    console.log(req.body);
    let num = req.body.num,
        condiction = {_id: req.body._id[num]},
        query = {$set: {name: req.body.name[num], studentId: req.body.student_id[num]}}
    classModel.update(condiction, query, (err, result) => {
        if(err) {
            console.log(err);
            res.send('<script>alert("请勾选待修改的学生")</script>');
        }
        res.send("<a href='/'>修改成功，点击返回首页</a>");
    });
});
//查找学生
app.get('/reach', (req, res, next) => {
    let result = null;
    res.render('reach', { result });
});
app.post('/reach', (req, res, next) => {
    console.log(req.body);
    let response = res;
    let reachType = req.body.reach_type,
        keyWord = req.body.keyword;
    //下面的判断应该将reachType转换为数字，因为获取的为字符串
    if (parseInt(reachType) === 0) {
        classModel.find({name: keyWord}, (err, result) => {
            if(err){
                return console.log(err);
            }
            response.render('reach', { result });
        });
    } else {
        classModel.find({studentId: keyWord}, (err, result) => {
            if(err){
                return console.log(err);
            }
            response.render('reach', { result });
        });
    }
});
module.exports = app ;
