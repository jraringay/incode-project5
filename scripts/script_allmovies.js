// Display movie top rated movies by calling API
$(document).ready(function () {
  let apiKey = "f319b9901a620c81c0cef4309a67d6c9";
  let language = "en-US";
  let topRated = "https://api.themoviedb.org/3/movie/top_rated";

  $(".mostreviewed").ready(() => {
    $.getJSON(
      topRated + "?api_key=" + apiKey + "&language=" + language + "&page=1"
    ).done((data) => {
      $.each(data.results, (index, item) => {
        let id = item.id;
        $("#mostreviewed_row").append(
          `<td class> <a href = "/movie/${id}"> <img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}"> </a> </td>`
        );
        return index < 7;
      });
      $.each(data.results, (index, item) => {
        let id = item.id;
        $("#mostreviewed_row2").append(
          `<td class> <a href = "/movie/${id}"> ${item.original_title} </a> </td>`
        );
        return index < 7;
      });
    });
  });
});
