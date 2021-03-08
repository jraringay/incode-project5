# Retrieved from Jake's Sandbox Environment for Testing Purposes - https://github.com/jraringay/incode-project5-sandbox

## Replace `scripts.js line 3` with your own API key
## And then run index.html to test

## scripts.js (v2)
### This is a simple search function using ajax jquery ($.getJSON) - Refer to https://developers.themoviedb.org/3/search/search-movies for the proper documentation
### In addition to v1, I made it so that the search results will include the movie's poster image, title, and release date.
```
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
```

### Base the JSON result from v1 for reference

`.empty()` ensures it that every time the script runs, it removes the current instance of the script. Without `.empty()`, every time you make a search, the results stack from the previous search result. 

`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${item.poster_path}` from `scripts.js line 21` is how we retrieve the poster of a movie and is a result of me tinkering with chrome's dev tools.

```
let pages = parseInt(data.total_pages)
for(let i = 1; i <= pages; i++) {
  $('.pagination').append(
    `<button id="searchResultPage${i}">${i}</button>`
  )
}
```

The above code is what I have conceptualised to address pagination since every instance of the search will only display 20 items from the entire results. The buttons don't do anything at the moment but I will be working on this when I wake up.

## scripts.js (v1)
### This is a simple search function using ajax jquery ($.getJSON) - Refer to https://developers.themoviedb.org/3/search/search-movies for the proper documentation 
```
$(document).ready(function() {
  let api = 'https://api.themoviedb.org/3/search/movie';
  let apiKey = 'Enter your API key here';
  let language = "en-US";

  $('#searchBtn').click(() => {
    let query = $('#searchBar').val() // gets the value of the input text where the title keyword of a movie is typed in
    $.getJSON(api + '?api_key=' + apiKey + '&language=' + language + '&query=' + query)
    .done(data => {
      console.log(data) // this is only to see if the API call is working (can be seen in chrome dev tools)
      $.each(data.results, (i, item) => {
        $('#list').append('<li>' + item.title + '</li>')
      })
    })
  })

});

/* The API call to make search GET request is usually https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
* I ommitted &page= and &include_adult= in the query parameters as I think it wont be a big deal with the scope of the project
*/
```

### The JSON result below is when the search string "superman" is used. 

```
{
"page": 1,
"results": [
  {
    "adult": false,
    "backdrop_path": "/zO1nXPpmJylWVHg2eL00HysZqE5.jpg",
    "genre_ids": [
      28,
      16,
      878,
      10751
    ],
    "id": 13640,
    "original_language": "en",
    "original_title": "Superman: Doomsday",
    "overview": "When LexCorp accidentally unleashes a murderous creature, Superman meets his greatest challenge as a champion. Based on the \"The Death of Superman\" storyline that appeared in DC Comics' publications in the 1990s.",
    "popularity": 88.387,
    "poster_path": "/itvuWm7DFWWzWgW0xgiaKzzWszP.jpg",
    "release_date": "2007-09-18",
    **"title": "Superman: Doomsday",**
    "video": false,
    "vote_average": 6.6,
    "vote_count": 373
  },
  {
  "adult": false,
  "backdrop_path": "/bazlsLkNuhy3IuhviepqvlMm2hV.jpg",
  "genre_ids": [
    16,
    28,
    878
    ],
  "id": 618354,
  "original_language": "en",
  "original_title": "Superman: Man of Tomorrow",
  "overview": "It’s the dawn of a new age of heroes, and Metropolis has just met its first. But as Daily Planet intern Clark Kent – working alongside reporter Lois Lane – secretly wields his alien powers of flight, super-strength and x-ray vision in the battle for good, there’s even greater trouble on the horizon.",
  "popularity": 56.975,
  "poster_path": "/6Bbq8qQWpoApLZYWFFAuZ1r2gFw.jpg",
  "release_date": "2020-08-23",
  "title": "Superman: Man of Tomorrow",
  "video": false,
  "vote_average": 7.4,
  "vote_count": 222
  },
  {
  "adult": false,
  "backdrop_path": "/v6MVBFnQOscITvmAy5N5ras2JKZ.jpg",
  "genre_ids": [
    878,
    28,
    12
    ],
  "id": 1924,
  "original_language": "en",
  "original_title": "Superman",
  "overview": "Mild-mannered Clark Kent works as a reporter at the Daily Planet alongside his crush, Lois Lane. Clark must summon his superhero alter-ego when the nefarious Lex Luthor launches a plan to take over the world.",
  "popularity": 26.708,
  "poster_path": "/d7px1FQxW4tngdACVRsCSaZq0Xl.jpg",
  "release_date": "1978-12-13",
  "title": "Superman",
  "video": false,
  "vote_average": 7.1,
  "vote_count": 2598
  },
  {
  "adult": false,
  "backdrop_path": "/8eRscFbRYl681zDfkjv1jjW1KAA.jpg",
  "genre_ids": [
    878,
    28,
    12
    ],
  "id": 1452,
  "original_language": "en",
  "original_title": "Superman Returns",
  "overview": "Superman returns to discover his 5-year absence has allowed Lex Luthor to walk free, and that those he was closest to felt abandoned and have moved on. Luthor plots his ultimate revenge that could see millions killed and change the face of the planet forever, as well as ridding himself of the Man of Steel.",
  "popularity": 24.551,
  "poster_path": "/qIegbn6DSUYmggfwxOBNOVS35q.jpg",
  "release_date": "2006-06-28",
  "title": "Superman Returns",
  "video": false,
  "vote_average": 5.6,
  "vote_count": 3039
  },
  {
  "adult": false,
  "backdrop_path": "/iepqCJMc5MIVrHbkMbkxppSithj.jpg",
  "genre_ids": [
    16,
    28,
    12
    ],
  "id": 166076,
  "original_language": "en",
  "original_title": "Superman: Unbound",
  "overview": "Superman and Supergirl take on the cybernetic being known as Brainiac, who boasts that he possesses \"the knowledge and strength of 10,000 worlds.\"",
  "popularity": 24.92,
  "poster_path": "/y2EAbLr5sykeQ59ZplLNPSMBk4b.jpg",
  "release_date": "2013-04-23",
  "title": "Superman: Unbound",
  "video": false,
  "vote_average": 6.6,
  "vote_count": 243
  },
  {
  "adult": false,
  "backdrop_path": "/2GIA8FKNxI69RnytQquoDbrAJ7L.jpg",
  "genre_ids": [
    16,
    28,
    12,
    10751
  ],
  "id": 22855,
  "original_language": "en",
  "original_title": "Superman/Batman: Public Enemies",
  "overview": "United States President Lex Luthor uses the oncoming trajectory of a Kryptonite meteor to frame Superman and declare a $1 billion bounty on the heads of the Man of Steel and his ‘partner in crime’, Batman. Heroes and villains alike launch a relentless pursuit of Superman and Batman, who must unite—and recruit help—to try and stave off the action-packed onslaught, stop the meteor Luthors plot.",
  "popularity": 49.059,
  "poster_path": "/izvMc22ywSLFWUXZEIuJJ8dms75.jpg",
  "release_date": "2009-09-29",
  "title": "Superman/Batman: Public Enemies",
  "video": false,
  "vote_average": 6.9,
  "vote_count": 393
  },
  {
  "adult": false,
  "backdrop_path": "/dasEWdFNSobYvY8xWcfz3z02kTu.jpg",
  "genre_ids": [
    28,
    12,
    14
    ],
  "id": 209112,
  "original_language": "en",
  "original_title": "Batman v Superman: Dawn of Justice",
  "overview": "Fearing the actions of a god-like Super Hero left unchecked, Gotham City’s own formidable, forceful vigilante takes on Metropolis’s most revered, modern-day savior, while the world wrestles with what sort of hero it really needs. And with Batman and Superman at war with one another, a new threat quickly arises, putting mankind in greater danger than it’s ever known before.",
  "popularity": 93.83,
  "poster_path": "/5UsK3grJvtQrtzEgqNlDljJW96w.jpg",
  "release_date": "2016-03-23",
  "title": "Batman v Superman: Dawn of Justice",
  "video": false,
  "vote_average": 5.9,
  "vote_count": 14371
  },
  {
  "adult": false,
  "backdrop_path": "/3KAZQXUJn1MG8QTIfzgHrZcpF4V.jpg",
  "genre_ids": [
    878,
    28,
    12
    ],
  "id": 8536,
  "original_language": "en",
  "original_title": "Superman II",
  "overview": "Three escaped criminals from the planet Krypton test the Man of Steel's mettle. Led by General Zod, the Kryptonians take control of the White House and partner with Lex Luthor to destroy Superman and rule the world. But Superman, who attempts to make himself human in order to get closer to Lois, realizes he has a responsibility to save the planet.",
  "popularity": 19.173,
  "poster_path": "/r9ZRah6rYBoRuPyj8g5Ei411XNM.jpg",
  "release_date": "1980-12-04",
  "title": "Superman II",
  "video": false,
  "vote_average": 6.7,
  "vote_count": 1545
  },
  {
  "adult": false,
  "backdrop_path": null,
  "genre_ids": [
    18
    ],
  "id": 148918,
  "original_language": "ro",
  "original_title": "Superman, Spiderman sau Batman",
  "overview": "Aron, a 5-year-old boy, sets together with his worried father on a journey at the end of which he wishes, like the superheroes in the comic books, to save his mother suffering from a heart condition.",
  "popularity": 29.056,
  "poster_path": "/iUp85s5s7eaPbuCUNqOCeJCEVpY.jpg",
  "release_date": "2011-06-01",
  "title": "Superman, Spiderman or Batman",
  "video": false,
  "vote_average": 6.6,
  "vote_count": 12
  },
  {
  "adult": false,
  "backdrop_path": "/otumLIRpsQqy4gROSGQ8LjxHGsL.jpg",
  "genre_ids": [
    28,
    12,
    16,
    10751,
    878
    ],
  "id": 45162,
  "original_language": "en",
  "original_title": "Superman/Batman: Apocalypse",
  "overview": "Batman discovers a mysterious teen-aged girl with superhuman powers and a connection to Superman. When the girl comes to the attention of Darkseid, the evil overlord of Apokolips, events take a decidedly dangerous turn.",
  "popularity": 27.648,
  "poster_path": "/zYTm9Zjrf4uLL1mT4UJg4j2Mugu.jpg",
  "release_date": "2010-09-28",
  "title": "Superman/Batman: Apocalypse",
  "video": false,
  "vote_average": 7.1,
  "vote_count": 415
  },
  {
  "adult": false,
  "backdrop_path": "/qvBt5JJKX3rnmAU3CIZOGrOaq8m.jpg",
  "genre_ids": [
    35,
    878,
    28,
    12
    ],
  "id": 9531,
  "original_language": "en",
  "original_title": "Superman III",
  "overview": "Aiming to defeat the Man of Steel, wealthy executive Ross Webster hires bumbling but brilliant Gus Gorman to develop synthetic kryptonite, which yields some unexpected psychological effects in the third installment of the 1980s Superman franchise. Between rekindling romance with his high school sweetheart and saving himself, Superman must contend with a powerful supercomputer.",
  "popularity": 16.313,
  "poster_path": "/c4oR6qgZW2s5foGkQi2Dd86KuAS.jpg",
  "release_date": "1983-06-17",
  "title": "Superman III",
  "video": false,
  "vote_average": 5.5,
  "vote_count": 1172
  },
  {
  "adult": false,
  "backdrop_path": "/wA1eufMEvM0RdQk24gj5yaDWLjQ.jpg",
  "genre_ids": [
    16,
    28,
    18,
    878
    ],
  "id": 487670,
  "original_language": "en",
  "original_title": "The Death of Superman",
  "overview": "When a hulking monster arrives on Earth and begins a mindless rampage, the Justice League is quickly called in to stop it. But it soon becomes apparent that only Superman can stand against the monstrosity.",
  "popularity": 27.869,
  "poster_path": "/y0uxSHaSFmt6XaBJgjkeLqe7aM.jpg",
  "release_date": "2018-07-24",
  "title": "The Death of Superman",
  "video": false,
  "vote_average": 7.5,
  "vote_count": 460
  },
  {
  "adult": false,
  "backdrop_path": "/uehwVV9xuALZ2SXeHGiX4Ay5dR7.jpg",
  "genre_ids": [
    28,
    16,
    878
    ],
  "id": 618355,
  "original_language": "en",
  "original_title": "Superman: Red Son",
  "overview": "Set in the thick of the Cold War, Red Son introduces us to a Superman who landed in the USSR during the 1950s and grows up to become a Soviet symbol that fights for the preservation of Stalin’s brand of communism.",
  "popularity": 18.977,
  "poster_path": "/frSfz7olCSQsp2SmTyu2ciGGQiX.jpg",
  "release_date": "2020-02-24",
  "title": "Superman: Red Son",
  "video": false,
  "vote_average": 7.4,
  "vote_count": 540
  },
  {
  "adult": false,
  "backdrop_path": "/bcpazeboR15tvVAl3XGNN5Dz8jL.jpg",
  "genre_ids": [
    12,
    16,
    28,
    14
    ],
  "id": 630656,
  "original_language": "en",
  "original_title": "The Death and Return of Superman",
  "overview": "The Death of Superman and Reign of the Supermen now presented as an over two-hour unabridged and seamless animated feature. Witness the no-holds-barred battle between the Justice League and an unstoppable alien force known only as Doomsday, a battle that only Superman can finish and will forever change the face of Metropolis.",
  "popularity": 23.344,
  "poster_path": "/qdEhhPYsfIeWSNTfzHShHOkDfDD.jpg",
  "release_date": "2019-10-01",
  "title": "The Death and Return of Superman",
  "video": true,
  "vote_average": 6.5,
  "vote_count": 793
  },
  {
  "adult": false,
  "backdrop_path": "/j7Sg03Zcfs03vVdEtAiZoceNNOe.jpg",
  "genre_ids": [
    16,
    28,
    12
    ],
  "id": 56590,
  "original_language": "en",
  "original_title": "All Star Superman",
  "overview": "Lex Luthor enacts his plan to rid the world of Superman, once and for all. Succeeding with solar radiation poisoning, the Man of Steel is slowly dying. With what little times remains, the Last Son of Krypton must confront the revealing of his secret identity to Lois Lane and face Luthor in a final battle.",
  "popularity": 13.292,
  "poster_path": "/xoBULL2YZUSDhqTkIvX0EvIl9Fj.jpg",
  "release_date": "2011-02-22",
  "title": "All Star Superman",
  "video": false,
  "vote_average": 6.9,
  "vote_count": 285
  },
  {
  "adult": false,
  "backdrop_path": "/eALawIrwWsIbTJdYWipvpmdS6sS.jpg",
  "genre_ids": [
    16,
    28
    ],
  "id": 103269,
  "original_language": "en",
  "original_title": "Superman vs. The Elite",
  "overview": "The Man of Steel finds himself outshone by a new team of ruthless superheroes who hold his idealism in contempt.",
  "popularity": 13.038,
  "poster_path": "/6yKW9NVcqySQKa9gVe7GG3WuE9N.jpg",
  "release_date": "2012-06-12",
  "title": "Superman vs. The Elite",
  "video": false,
  "vote_average": 6.8,
  "vote_count": 237
  },
  {
  "adult": false,
  "backdrop_path": "/rarv0b3OyhG2y9qltGogtlVGk6b.jpg",
  "genre_ids": [
    16,
    28,
    10751,
    878
    ],
  "id": 19323,
  "original_language": "en",
  "original_title": "Superman: Brainiac Attacks",
  "overview": "Embittered by Superman's heroic successes and soaring popularity, Lex Luthor forms a dangerous alliance with the powerful computer/villain Brainiac. Using advanced weaponry and a special strain of Kryptonite harvested from the far reaches of outer space, Luthor specifically redesigns Brainiac to defeat the Man of Steel.",
  "popularity": 12.179,
  "poster_path": "/9fmtK2Wk52demZBGDsIAmLr3EY0.jpg",
  "release_date": "2006-06-20",
  "title": "Superman: Brainiac Attacks",
  "video": false,
  "vote_average": 6.1,
  "vote_count": 73
  },
  {
  "adult": false,
  "backdrop_path": null,
  "genre_ids": [],
  "id": 124305,
  "original_language": "en",
  "original_title": "Superman: Red Son",
  "overview": "In Red Son, Superman's rocket ship lands on a Ukrainian collective farm rather than in Kansas, an implied reason being a small time difference (a handful of hours) from the original timeline, meaning Earth's rotation placed the Ukraine in the ship's path instead of Kansas. Instead of fighting for \"...truth, justice, and the American Way\", Superman is described in Soviet radio broadcasts \"...as the Champion of the common worker who fights a never-ending battle for Stalin, socialism, and the international expansion of the Warsaw Pact.\" His \"secret identity\" (i.e. the name his adoptive parents gave him) is a state secret.",
  "popularity": 11.317,
  "poster_path": null,
  "release_date": "2009-07-30",
  "title": "Superman: Red Son",
  "video": false,
  "vote_average": 7.9,
  "vote_count": 11
  },
  {
  "adult": false,
  "backdrop_path": "/goi1QB29rJ5lUYdgS4tk5xXWZn0.jpg",
  "genre_ids": [
    99
    ],
  "id": 39440,
  "original_language": "en",
  "original_title": "Waiting for \"Superman\"",
  "overview": "Gripping, heartbreaking, and ultimately hopeful, Waiting for Superman is an impassioned indictment of the American school system from An Inconvenient Truth director Davis Guggenheim.",
  "popularity": 11.514,
  "poster_path": "/l7mRlEi4VCEH7sfgaXX1b6LzsXn.jpg",
  "release_date": "2010-09-24",
  "title": "Waiting for \"Superman\"",
  "video": false,
  "vote_average": 6.9,
  "vote_count": 98
  },
  {
  "adult": false,
  "backdrop_path": "/5VdpO1zWqritRhZnulbbhprBatW.jpg",
  "genre_ids": [
    28,
    12,
    878
    ],
  "id": 11411,
  "original_language": "en",
  "original_title": "Superman IV: The Quest for Peace",
  "overview": "With global superpowers engaged in an increasingly hostile arms race, Superman leads a crusade to rid the world of nuclear weapons. But Lex Luthor, recently sprung from jail, is declaring war on the Man of Steel and his quest to save the planet. Using a strand of Superman's hair, Luthor synthesizes a powerful ally known as Nuclear Man and ignites an epic battle spanning Earth and space.",
  "popularity": 16.855,
  "poster_path": "/vhs3P0JwqzlgfBqhjnCWDEOtDmS.jpg",
  "release_date": "1987-07-23",
  "title": "Superman IV: The Quest for Peace",
  "video": false,
  "vote_average": 4.5,
  "vote_count": 817
  }
],
"total_pages": 8,
"total_results": 154
}
```

The ways to traverse through the JSON given that "data" is the base are the following: 
- to get the page value -> data.page
- to get to the results array -> data.results

But it is necessary to find a way to traverse through the items in the "results" array in order for us to get the necessary data we need.

Normally, we'd access each index by denoting `data.results[0]` and if we want the title, `data.results[0].title`. But doing that manually is inefficient and can potentially give us lines of unnecessary code.

In order for us to simplify that, we use the following codeblock below `$.each` where `i` is the array index number and `item` is the placeholding variable for `data.results`

More info about `.each()` here: https://api.jquery.com/each/#entry-examples

```
$.each(data.results, (i, item) => {
  $('#list').append('<li>' + item.title + '</li>')
})
```

The `append` function there is for testing if the `.each` code block is working by appending `<li>` inside the existing `<ul id="list>`

`item.title` then will return us the title of the movie from that results array indexes.