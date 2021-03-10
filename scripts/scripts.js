$(document).ready(function() {
  let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = 'f319b9901a620c81c0cef4309a67d6c9';
  let language = "en-US";
  //Load 1st page automatically for results
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
      console.log(data)
      let pages = parseInt(data.total_pages)
      $.each(data.results, (dummyVary, item) => {
        $('#searchResults').append(
          '<tr>' +
            `<td><img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}">` +
            '<td>' + item.title + '</td>' +
            '<td>' + item.release_date + '</td>' +
          '</tr>'
        )
      })
    //Rest of pages (1 loaded automatically, but loop starts at 1 to give button ID)
    for(let i = 1; i <= pages; i++) {
        $('.pagination').append(
        `<button id="searchResultPage${i}">${i}</button>` //Set page numbers and buttons
        ) 
        $('#searchResultPage'+i).click(() => {
          $('.pagination').empty()
          $('#searchResults').empty().append(
            '<tr>' + 
            '<th>Poster</th>' +
            '<th>Title</th>' +
            '<th>Release Date</th>' +
          '</tr>')
          $.getJSON(api + '?api_key=' + apiKey + '&language=' + language + '&query=' + query + '&page=' +i)
          .done(data => {
            console.log(data) // this is only to see if the API call is working (can be seen in chrome dev tools)
            $.each(data.results, (dummyVar, item) => {
              $('#searchResults').append(
                '<tr>' +
                  `<td><img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}">` +
                  '<td>' + item.title + '</td>' +
                  '<td>' + item.release_date + '</td>' +
                '</tr>'
              )
            })
            for(let j = i; j <= pages; j++) {
              $('.pagination').append(
                `<button id="searchResultPage" value="${j}">${j}</button>`
              )
            }
          })
          .fail((jqxhr, textStatus, error) => {
            let err = textStatus + ", " + error
            console.log("Request Failed: " + err)
          })
        })
      }   
    })
    .fail((jqxhr, textStatus, error) => {
      let err = textStatus + ", " + error
      console.log("Request Failed: " + err)
    })
  })
})
$(document).ready(function() {
  let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = 'insert api key here';
  let language = "en-US";
  //Load 1st page automatically for results
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
      console.log(data)
      let pages = parseInt(data.total_pages)
      $.each(data.results, (dummyVary, item) => {
        $('#searchResults').append(
          '<tr>' +
            `<td><img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}">` +
            '<td>' + item.title + '</td>' +
            '<td>' + item.release_date + '</td>' +
          '</tr>'
        )
      })
    //Rest of pages (1 loaded automatically, but loop starts at 1 to give button ID)
    for(let i = 1; i <= pages; i++) {
        $('.pagination').append(
        `<button id="searchResultPage${i}">${i}</button>` //Set page numbers and buttons
        ) 
        $('#searchResultPage'+i).click(() => {
          $('.pagination').empty()
          $('#searchResults').empty().append(
            '<tr>' + 
            '<th>Poster</th>' +
            '<th>Title</th>' +
            '<th>Release Date</th>' +
          '</tr>')
          $.getJSON(api + '?api_key=' + apiKey + '&language=' + language + '&query=' + query + '&page=' +i)
          .done(data => {
            console.log(data) // this is only to see if the API call is working (can be seen in chrome dev tools)
            $.each(data.results, (dummyVar, item) => {
              $('#searchResults').append(
                '<tr>' +
                  `<td><img id="searchPosterResults" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}">` +
                  '<td>' + item.title + '</td>' +
                  '<td>' + item.release_date + '</td>' +
                '</tr>'
              )
            })
            for(let j = i; j <= pages; j++) {
              $('.pagination').append(
                `<button id="searchResultPage" value="${j}">${j}</button>`
              )
            }
          })
          .fail((jqxhr, textStatus, error) => {
            let err = textStatus + ", " + error
            console.log("Request Failed: " + err)
          })
        })
      }   
    })
    .fail((jqxhr, textStatus, error) => {
      let err = textStatus + ", " + error
      console.log("Request Failed: " + err)
    })
  })
})
