/**
 * Created by 徐涛焘 on 1/24/2018.
 */
//1.列出所给数据电影的所有分类
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

//2.页面显示分类目录
function showCategoryHtml(categoryList) {
    let categoryListStr = ``;
    categoryList.forEach(category => {
            categoryListStr += `<a>${category}</a>`;
        }
    );
    let movieCategory = document.getElementById("movieCategory");
    movieCategory.innerHTML +=  categoryListStr;

}


//2.左侧分类列表的active样式控
//3.点击分类跳出相应的分类

window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data;
            showCategoryHtml(listAllCategoryList(movies));

            let moviesStr = ``;
            let categoryListStr = ``;
            movies.forEach(movie => {
                let movieGenres = movie.genres.split(",");
                for(i in movieGenres){
                    if(!genres.includes(movieGenres[i])){
                        genres.push(movieGenres[i]);
                    }
                }

/*                if(movieGenres.includes("家庭")){
                    let star = "★★★★★☆☆☆☆☆";
                    let rate = Math.round(movie.rating/2);
                    moviesStr  += `<li class="movie-box">
                            <div class="movie-image">
                                <img src="${movie.image}" alt="${movie.title}">
                            </div>
                            <div class="movie-title">${movie.title}</div>
                            <div class="movie-rating">${star.slice(5 - rate,10 - rate) + movie.rating}分</div>
                        </li>`;
                }*/
            });
            genres.forEach(genre => {
                categoryListStr += `<a>${genre}</a>`;
            });
            let moviesRow = document.getElementById("moviesRow");
            moviesRow.innerHTML += moviesStr;

            let movieCategory = document.getElementById("movieCategory");
            movieCategory.innerHTML +=  categoryListStr;


        })
        .catch(function (errror) {
            console.log(errror);
        });

};





