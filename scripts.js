$(document).ready(function() {
  let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = 'Enter your API key here';
  let language = "en-US";

  $('#searchBtn').click(() => {
    let query = $('#searchBar').val() // gets the value of the input text where the title keyword of a movie is typed in
    $('.pagination').empty()
    $('#searchResults').empty().append(
      '<tr>' +
        '<th>Poster</th>' +
        '<th>Title</th>' +
        '<th>Release Date</th>' +
      '</tr>')
    $.getJSON(api + '?api_key=' + apiKey + '&language=' + language + '&query=' + query)
    .done(data => {
      console.log(data) // this is only to see if the API call is working (can be seen in chrome dev tools)
      $.each(data.results, (i, item) => {
        $('#searchResults').append(
          '<tr>' +
            `<td><img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}">` +
            '<td>' + item.title + '</td>' +
            '<td>' + item.release_date + '</td>' +
          '</tr>'
        )
        // $('#list').append('<li>' + item.title + '</li>') // See README.md for a (hopefully) comprehensive explanation
      })
      let pages = parseInt(data.total_pages)
      for(let i = 1; i <= pages; i++) {
        $('.pagination').append(
          `<button id="searchResultPage${i}">${i}</button>`
        )
      }
    })
    .fail((jqxhr, textStatus, error) => {
      let err = textStatus + ", " + error
      console.log("Request Failed: " + err)
    })
  })




});