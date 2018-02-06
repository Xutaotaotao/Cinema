/**
 * Created by 徐涛焘 on 1/24/2018.
 */
//列出所给数据电影的所有分类
function listAllCategoryList(movies) {
    let genres = [];
    movies.forEach(movie => {
        let movieGenres = movie.genres.split(",");
        for(i in movieGenres){
            if(!genres.includes(movieGenres[i])){
                genres.push(movieGenres[i]);
            }
        }
    });
    return genres;
}

//页面显示分类目录
function showCategoryHtml(categoryList) {
    let categoryListStr = ``;
    for(let i = 0;i<categoryList.length;i++){
        if(i===0){
            categoryListStr += `<a class="list-active">${categoryList[i]}</a>`;//初始化选择分类的样式
        }else{
            categoryListStr += `<a>${categoryList[i]}</a>`;
        }
    }
    let movieCategory = document.getElementById("movieCategory");
    movieCategory.innerHTML +=  categoryListStr;

}

//根据所给分类列出相应的电影
function listCategoryMovies(category,movies){
    let categoryMovies = [];
    movies.forEach(movie => {
        let movieGenres = movie.genres.split(",");
        if(movieGenres.includes(category)){
            categoryMovies.push(movie);
        }
    });
    return categoryMovies;
}

// 页面显示分类电影
function showMoviesHtml(movies) {
    let moviesStr = ``;
    movies.forEach(movie => {
        let star = "★★★★★☆☆☆☆☆";
        let rate = Math.round(movie.rating/2);
        moviesStr  += `<li class="movie-box" >
                            <div class="movie-image">
                                <a href=""></a><img src="${movie.image}" alt="${movie.title}">
                            </div>
                            <div class="movie-title">${movie.title}</div>
                            <div class="movie-rating">${star.slice(5 - rate,10 - rate) + movie.rating}分</div>
                        </li>`;
    });
    return moviesStr;
}

//点击相应分类弹出相应的电影
function clickToChangeMoviesRow(moviesRow, movies) {
    $("#movieCategory").on("click", "a", function () {
        $(this).addClass("list-active").siblings().removeClass("list-active");
        if (moviesRow.innerText === "") {
            moviesRow.innerHTML += showMoviesHtml(listCategoryMovies($(this).text(), movies));
        } else {
            $("#moviesRow").html("");
            moviesRow.innerHTML += showMoviesHtml(listCategoryMovies($(this).text(), movies));
        }
    });
}

function getMoviesData() {

    axios.get('http://localhost:3000/api/all_movies')
        .then(function (response) {
           var movies = response.data;
            console.log(movies);
        });
    console.log(movies);
    return movies;

}

window.onload = function () {
    axios.get('http://localhost:3000/api/all_movies')//前端用axios获得数据库的数据
        .then(function (response) {
            let movies = response.data;
            showCategoryHtml(listAllCategoryList(movies));
            let moviesRow = document.getElementById("moviesRow");
            moviesRow.innerHTML += showMoviesHtml(listCategoryMovies(listAllCategoryList(movies)[0],movies));//初始化剧情的页面
            clickToChangeMoviesRow(moviesRow, movies);
        })
        .catch(function (error) {
            console.log(error);
        });
};





