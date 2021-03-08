$(document).ready(function() {
  let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = '6c0856c8aca4264172f895e370451731';
  let language = "en-US";

  $('#searchBtn').click(() => {
    let query = $('#searchBar').val() // gets the value of the input text where the title keyword of a movie is typed in
    $.getJSON(api + '?api_key=' + apiKey + '&language=' + language + '&query=' + query)
    .done(data => {
      console.log(data) // this is only to see if the API call is working (can be seen in chrome dev tools)
      $.each(data.results, (i, item) => {
        $('#list').append('<li>' + item.title + '</li>') // See AJAX-README.md for a (hopefully) comprehensive explanation
      })
    })
  })

});