//rogue: 1009546
//wolverine: 1009718
//iron man: 1009368
//gambit: 1009313
//deadpool: 1009268
//scarlet witch: 1009562
//domino: 1009277
//wasp: 1009707

// should I create the divs dynamically?

$(document).ready(() => {
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



  for (let i = 0; i < 18; i++) {

    let ts = new Date().getTime();
    let hash = md5(ts+myPrivateAPIkey+myPublicAPIKey).toString();
    $($(".my-card")[i]).append(`<img src="./marvel.jpg">`);

    $.get(
      `https://gateway.marvel.com:443/v1/public/characters?name=${name[Math.floor(i/2)]}&ts=${ts}&apikey=${myPublicAPIKey}&hash=${hash}`, function (data){
    // console.log(data.data.results[0].name);
      let freeSpotFound = false;
      do {
        let random = Math.floor(Math.random() * 18);
        if (freeSpots[random]){
          $($(".my-card")[random]).css("backgroundImage", `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`);
          $($(".my-card")[random]).addClass("my-card-display");
          $($(".my-card")[random]).append(`
            <p>${data.data.results[0].name}</p>
            `);
          freeSpots[random] = false;
          freeSpotFound = true;
        }
      } while (!freeSpotFound);
    })

  }

  //is this hacky?
  $("img").click(function() {
    let index = $("img").index(this);
    $(this).css({"height": "0px", "width": "0px"});
    $($("p")[index]).css("visibility", "visible");
    if (!firstCard) {
      firstCard = $($("p")[index]).html();
      firstCardIndex = index;
    } else if (!secondCard){
      secondCard = $($("p")[index]).html();
      secondCardIndex = index;
      setTimeout(doCardsMatch, 500);
    }
  })
  //card1, card2, card1Index, card2Index
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
      $($("img")[firstCardIndex]).css({"height": "100%", "width": "100%"});
      $($("p")[firstCardIndex]).css("visibility", "hidden");
      $($("img")[secondCardIndex]).css({"height": "100%", "width": "100%"});
      $($("p")[secondCardIndex]).css("visibility", "hidden");
      firstCard = "";
      secondCard = "";
      firstCardIndex = 0;
      secondCardIndex = 0;
    }
  }

})
