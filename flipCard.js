$(document).ready(function() {

  let myPublicAPIKey = "b2b32bcebf0772c779f79f55e8c229ef";

  let myPrivateAPIkey = "776eabaeb257317931ff827468f7fcdf12504f2a";

  let name = ["rogue", "wolverine", "iron man", "gambit", "punisher", "deadpool", "black panther", "gamora", "nightcrawler"];

  let firstCard = "";
  let firstCardIndex = 0;

  let secondCard = "";
  let secondCardIndex = 0;

  let freeSpots = {};

  for (var i = 0; i < 18; i++) {
    freeSpots[i] = true;
  }

  let cards = document.getElementsByClassName("my-card");
  console.log(cards);

  $(".card-front").append(`<img src="marvel.jpg">`);

  $(".my-card").click(function(){
    let cardFlipped = $(this).hasClass("flipped");

    if (!cardFlipped){
       $(this).addClass("flipped");
    }

    let index = $(".my-card").index(this);
    console.log(index);

    if (!firstCard) {
      firstCard = $($("p")[index]).html();
      firstCardIndex = index;
    } else if (!secondCard){
      secondCard = $($("p")[index]).html();
      secondCardIndex = index;
      setTimeout(doCardsMatch, 500);
    }
  })

  function doCardsMatch(){
    if (firstCard === secondCard) {
      console.log("they match");
      //create function
      firstCard = "";
      secondCard = "";
      firstCardIndex = 0;
      secondCardIndex = 0;
    } else {
      //create function
      $($(".my-card")[firstCardIndex]).removeClass("flipped");
      $($(".my-card")[secondCardIndex]).removeClass("flipped");
      firstCard = "";
      secondCard = "";
      firstCardIndex = 0;
      secondCardIndex = 0;
    }
  }

  for (var i = 0; i < 18; i++) {
    let ts = new Date().getTime();
    let hash = md5(ts+myPrivateAPIkey+myPublicAPIKey).toString();

    $.get(`https://gateway.marvel.com:443/v1/public/characters?name=${name[Math.floor(i/2)]}&ts=${ts}&apikey=${myPublicAPIKey}&hash=${hash}`, function(data){
      let freeSpotFound = false;
      do {
        let random = Math.floor(Math.random() * 18);
        if (freeSpots[random]){
          $($(".card-back")[random]).css("backgroundImage", `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`);
          $($(".card-back")[random]).addClass("my-card-display");
          $($(".card-back")[random]).append(`
            <p>${data.data.results[0].name}</p>
            `);
          freeSpots[random] = false;
          freeSpotFound = true;
        }
      } while (!freeSpotFound);
    })
  }
})
