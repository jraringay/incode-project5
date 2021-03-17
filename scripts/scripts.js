// Main script to call API; implements Google search functionality on home page
$(document).ready(function () {
  let api = "https://api.themoviedb.org/3/search/movie";
  let apiKey = "f319b9901a620c81c0cef4309a67d6c9";
  let language = "en-US";
  let popularMovie = "https://api.themoviedb.org/3/movie/popular";

  $("#topfive").ready(() => {
    $.getJSON(
      popularMovie + "?api_key=" + apiKey + "&language=" + language + "&page=1"
    ).done((data) => {
      $.each(data.results, (index, item) => {
        let id = item.id;
        $("#topfive_row").append(
          `<td class> <a href = "/movie/${id}"> <img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}"> </a> </td>`
        );
        return index < 4;
      });
      $.each(data.results, (index, item) => {
        let id = item.id;
        $("#topfive_row2").append(
          `<td class> <a href = "/movie/${id}"> ${item.original_title} </a> </td>`
        );
        return index < 4;
      });
    });
  });
  /* Search Function w/ Autocomplete */
  $("#movieSearch")
    .autocomplete({
      source: (req, res) => {
        $.ajax({
          url: api + "?api_key=" + apiKey + "&language=" + "&query=",
          dataType: "json",
          data: {
            query: req.term,
          },
          success: (data) => {
            // console.log(Object.values(data.results))
            /* Take 'data' and convert it into a readable array
             * where we can 'map' through it and get the values for
             * the movie id and original_title.
             */
            const newData = Object.values(data.results).map((data) => {
              return {
                id: data.id,
                title: data.original_title,
              };
            });
            console.log(newData);
            res(newData);
          },
        });
      },
      minLength: 2,
      // Once a search result is pressed, it will trigger the 'select' parameter
      select: (event, ui) => {
        let movieID = ui.item.id;
        console.log(movieID);
      },
    })
    // This is where the search result display is manipulated
    .autocomplete("instance")._renderItem = function (ul, item) {
    return (
      $("<li>")
        .append(`<div><a href="/movie/${item.id}">${item.title}</a></div>`)
        .appendTo(ul)
    );
  };
});