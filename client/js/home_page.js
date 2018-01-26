/**
 * Created by 徐涛焘 on 1/24/2018.
 */
window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data,moviesStr = ``;
            let genres = [],categoryListStr = ``;
            movies.forEach(movie => {
                let star = "★★★★★☆☆☆☆☆";
                let rate = Math.round(movie.rating/2);
                moviesStr  += `<li class="movie-box">
                            <div class="movie-image">
                                <img src="${movie.image}" alt="${movie.title}">
                            </div>
                            <div class="movie-title">${movie.title}</div>
                            <div class="movie-rating">${star.slice(5 - rate,10 - rate) + movie.rating}分</div>
                        </li>`;

                let movieGenres = movie.genres.split(",");
                for(i in movieGenres){
                    if(!genres.includes(movieGenres[i])){
                        genres.push(movieGenres[i]);
                    }
                }
            });
            genres.forEach(genre => {
                categoryListStr += `<label>${genre}</label>`;
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

// 左侧分类列表的active样式控制
function changeCategoryListStyle() {
    let categoryList = $(".category-list label");
    for( i in categoryList){
        categoryList[i].onclick = function () {
            for(x in categoryList){
                categoryList[x].className="";
                this.className = "list-active";
            }
        }
    }
}
changeCategoryListStyle();



