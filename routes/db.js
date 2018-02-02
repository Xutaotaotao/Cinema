/**
 * Created by 徐涛焘 on 2/2/2018.
 */
const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');

//连接数据库，如果没有自动创建
function _connectDB(callback) {
    let url = settings.dbUrl;
    MongoClient.connect(url,function (err,db) {
        if(err){
            callback(err,null);
            return;
        }
        //数据库连接成功回调
        callback(err,db);
    });
}

// 插入数据
exports.insertOne = function (collectionName,json,callback) {
    _connectDB(function (err,db) {
        db.collection(collectionName).insertOne(json,function (err,result) {
            if(err){
                callback(err,null);
                db.close();
                return;
            }
        });
    });
};

//查找数据
exports.find = function (collectionName,queryJson,callback) {
    _connectDB(function (err,db) {
        let json = Number(queryJson.limit) || 0,
            count = Number(queryJson.page) - 1,
            sort = queryJson.sort || {}

            if(count <= 0){
                count = 0;
            }else{
                count = count * limit;
            }

            let cursor = db.collection(collectionName).find(json).limit(limit).skip(count).sort(sort);
            cursor.toArray(function (err,results) {
                if(err){
                    callback(err,null);
                    db.close();
                    return;
                }
                callback(err,results);
                db.close();
            });
    });
};

//删除数据
exports.updateMany = function (collectionName,jsonOld,jsonNew,callback) {
    _connectDB(function (err,db) {
        db.collection(collectionName).updateMany(
            jsonOld,{
                $set:jsonNew,
                $currentDate:{"lastModified":false}
            },
            function (err,results) {
                if(err){
                    callback(err,null);
                    db.close();
                    return
                }
                callback(err,results);
                db.close();
            }
        );
    });
};

//修改数据
exports.updateMany = function (collectionName,jsonOld,jsonNew,callback) {
    _connectDB(function (err,db) {
        db.collection(collectionName).updateMany(
            jsonOld,{
                $set:jsonNew,
                $currentDate:{"lastModified":false}
            },
            function (err,results) {
                if(err){
                    callback(err,null);
                    db.close();
                    return;
                }
                callback(err,results);
                db.close();
            }
        );
    });
};
