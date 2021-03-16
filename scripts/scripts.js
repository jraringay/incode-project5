$(document).ready(function () {
  let api = "https://api.themoviedb.org/3/search/movie";
  let apiKey = "f319b9901a620c81c0cef4309a67d6c9";
  let apiDisplay = "https://api.themoviedb.org/3/movie/";
  let language = "en-US";
  let popularMovie = "https://api.themoviedb.org/3/movie/popular";
  // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

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
        //.append(`<div data-id="${item.id}">${item.title}</div>`)
        // redirect to the movie details page with the movie id as query param
        .append(`<div><a href="/movie/${item.id}">${item.title}</a></div>`)
        .appendTo(ul)
    );
  };

  // Search function (WIP)
  //Load 1st page automatically for results
  // $("#searchBtn").click(() => {
  //   let query = $("#searchBar").val(); // gets the value of the input text where the title keyword of a movie is typed in
  //   $(".pagination").empty();
  //   $("#searchResults")
  //     .empty()
  //     .append(
  //       "<tr>" +
  //         "<th>Poster</th>" +
  //         "<th>Title</th>" +
  //         "<th>Release Date</th>" +
  //         "</tr>"
  //     );
  //   $.getJSON(
  //     api + "?api_key=" + apiKey + "&language=" + language + "&query=" + query
  //   )
  //     .done((data) => {
  //       console.log(data);
  //       let pages = parseInt(data.total_pages);
  //       $.each(data.results, (dummyVary, item) => {
  //         let id = item.id;
  //         $("#searchResults").append(
  //           "<tr class>" +
  //             `<td class> <img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}"> </a> </td>` +
  //             `<td class> <a href = "/movie/${id}">` +
  //             item.title +
  //             "</td> </a>" +
  //             "<td class>" +
  //             item.release_date +
  //             "</td>" +
  //             "</tr>"
  //         );
  //       });
  //       //Rest of pages (1 loaded automatically, but loop starts at 1 to give button ID)
  //       for (let i = 1; i <= pages; i++) {
  //         $(".pagination").append(
  //           `<button id="searchResultPage${i}">${i}</button>` //Set page numbers and buttons
  //         );
  //         $("#searchResultPage" + i).click(() => {
  //           $(".pagination").empty();
  //           $("#searchResults")
  //             .empty()
  //             .append(
  //               "<tr>" +
  //                 "<th>Poster</th>" +
  //                 "<th>Title</th>" +
  //                 "<th>Release Date</th>" +
  //                 "</tr>"
  //             );
  //           $.getJSON(
  //             api +
  //               "?api_key=" +
  //               apiKey +
  //               "&language=" +
  //               language +
  //               "&query=" +
  //               query +
  //               "&page=" +
  //               i
  //           )
  //             .done((data) => {
  //               console.log(data); // this is only to see if the API call is working (can be seen in chrome dev tools)
  //               $.each(data.results, (dummyVar, item) => {
  //                 $("#searchResults").append(
  //                   "<tr>" +
  //                     `<td><img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}">` +
  //                     "<td>" +
  //                     item.title +
  //                     "</td>" +
  //                     "<td>" +
  //                     item.release_date +
  //                     "</td>" +
  //                     "</tr>"
  //                 );
  //               });
  //               for (let j = i; j <= pages; j++) {
  //                 $(".pagination").append(
  //                   `<button id="searchResultPage" value="${j}">${j}</button>`
  //                 );
  //               }
  //             })
  //             .fail((jqxhr, textStatus, error) => {
  //               let err = textStatus + ", " + error;
  //               console.log("Request Failed: " + err);
  //             });
  //         });
  //       }
  //     })
  //     .fail((jqxhr, textStatus, error) => {
  //       let err = textStatus + ", " + error;
  //       console.log("Request Failed: " + err);
  //     });
  // });
});
