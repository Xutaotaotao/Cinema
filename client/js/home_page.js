/**
 * Created by 徐涛焘 on 1/24/2018.
 */
window.onload = function () {
    axios.get('http://localhost:3000/movies')
        .then(function (response) {
            let movies = response.data,str = ``;
            movies.forEach(movie => {
                let star = "★★★★★☆☆☆☆☆";
                let rate = Math.round(movie.rating/2);
                str += `<li class="movie-box">
                            <div class="movie-image">
                                <img src="${movie.image}" alt="${movie.title}">
                            </div>
                            <div class="movie-title">${movie.title}</div>
                            <div class="movie-rating">${star.slice(5 - rate,10 - rate) + movie.rating}分</div>
                        </li>`
            });
            let moviesRow = document.getElementById("moviesRow");
            moviesRow.innerHTML += str;
        })
        .catch(function (errror) {
            console.log(errror);
        });
};