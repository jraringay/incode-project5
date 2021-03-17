// Display movie details taken previously from script.js
$(document).ready(function () {
  //let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = "f319b9901a620c81c0cef4309a67d6c9";
  let apiDisplay = "https://api.themoviedb.org/3/movie/";
  let language = "en-US";

  $(".user_rating").ready(() => {
    let query = $("#usermovielistID").attr("alt");
    $.getJSON(
      apiDisplay + query + "?api_key=" + apiKey + "&language=" + language
    ).done((data) => {
      console.log(data);

      $("#usermovielistID").append(
        `<img src="https://image.tmdb.org/t/p/w185/${data.poster_path}">`
      );
    });
  });
});
