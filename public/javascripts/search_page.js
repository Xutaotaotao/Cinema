/**
 * Created by 徐涛焘 on 2/4/2018.
 */
//将ejs模板传来的数据变成json对象
function getResultJson(result) {
    let movie = {};
    movie.id =  Number(result.id);
    movie.alt = result.alert;
    movie.year = result.year;
    movie.title = result.title;
    movie.rating = Number(result.rating);

}