
$(document).ready(function() {

      // Display movie details
  var script = document.currentScript || 
  /*Polyfill*/ Array.prototype.slice.call(document.getElementsByTagName('script')).pop();
  
  var params = (script.getAttribute('id') || '').split(/, */);
 id = params[0]


    let api = 'https://api.themoviedb.org/3/search/movie';
    let apiKey = 'f319b9901a620c81c0cef4309a67d6c9';
    let apiDisplay = 'https://api.themoviedb.org/3/movie/';
    let language = "en-US";
    

  $('.movie').ready(() => {
    $.getJSON(apiDisplay + id + '?api_key=' + apiKey + '&language=' + language)
    .done(data => {
      console.log(data)
      $('#movieDetail').append(
        '<tr>' +
          `<th>Title: <img src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}"></th>` +
          `<th>Title: ${data.original_title}</th>` +
          `<th>Title: ${data.release_date}</th>` +
          `<th>Title: ${data.overview}</th>` +
        '</tr>'
      )
    })
  })
})