// Display movie details taken previously from script.js
$(document).ready(function () {
  //let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = "f319b9901a620c81c0cef4309a67d6c9";
  let apiDisplay = "https://api.themoviedb.org/3/movie/";
  let language = "en-US";

  $(".user_profile_table").ready(() => {
    $.getJSON(
      apiDisplay + movie_id + "?api_key=" + apiKey + "&language=" + language
    ).done((data) => {
      console.log(data);

      $(".mini_movie").append(
        `<img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}">`
      );
    });
  });
});
