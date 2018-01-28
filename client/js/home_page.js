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
    categoryList.forEach(category => {
            categoryListStr += `<a>${category}</a>`;
        }
    );
    let movieCategory = document.getElementById("movieCategory");
    movieCategory.innerHTML +=  categoryListStr;

}

//左侧分类列表的active样式控
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
                                <img src="${movie.image}" alt="${movie.title}">
                            </div>
                            <div class="movie-title">${movie.title}</div>
                            <div class="movie-rating">${star.slice(5 - rate,10 - rate) + movie.rating}分</div>
                        </li>`;
    });
    return moviesStr;
}

window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data;
            showCategoryHtml(listAllCategoryList(movies));
            $("#movieCategory").on("click","a",function (event) {
                let moviesRow = document.getElementById("moviesRow");
               if(moviesRow.innerText === ""){
                   moviesRow.innerHTML += showMoviesHtml(listCategoryMovies($(this).text(),movies));
               }else{
                   $("#moviesRow").html("");
                   moviesRow.innerHTML += showMoviesHtml(listCategoryMovies($(this).text(),movies));
               }
            });
        })
        .catch(function (error) {
            console.log(error);
        });

};





