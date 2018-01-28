
*列出所给数据电影的所有分类*
- function listAllCategoryList()
- input：movies[array]
- output:categoryList[array]

*页面显示分类目录*
- function showCategoryHtml(categoryList)
- input:categoryList[array]
- output:categoryListStr[string]

*根据所给分类列出相应的电影*
- function listCategoryMovies(category)
- input:category[string],movies[array]
- output:categoryMovies[array]

*页面显示电影*
- function showMoviesHtml(movies)
- input:movies[array]
- output:moviesStr[string]

*点击相应分类弹出相应的电影*
- function clickToChangeMoviesRow(moviesRow,movies)
- input:moviesRow[string],movies[array]
- output:dom[string]//直接加入到dom中