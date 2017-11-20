//rogue: 1009546
//wolverine: 1009718
//iron man: 1009368
//gambit: 1009313
//deadpool: 1009268
//scarlet witch: 1009562
//domino: 1009277
//wasp: 1009707

// B's keys:
// let myPublicAPIKey = "b2b32bcebf0772c779f79f55e8c229ef";
// let myPrivateAPIkey = "776eabaeb257317931ff827468f7fcdf12504f2a";
//
// T's keys:
// let myPublicAPIKey = "6414f20fd1747f6df8c49459523aa55e";
// let myPrivateAPIkey = "8b2328144d5e2907f15701194df808c4baf88bb9";

$(document).ready(function() {
  // $('.modal').modal();

  // $(".game").hide();
  $(".splash-page").hide();
  $(".splash-page").fadeIn(3000);
  $(".splash-page").slideDown();
  $(".game").hide();
  $(".deck-page").hide();
  $(".my-stats-page").hide();
  $(".about").hide();


  let myPublicAPIKey = "6414f20fd1747f6df8c49459523aa55e";
  let myPrivateAPIkey = "8b2328144d5e2907f15701194df808c4baf88bb9";

  let ts = new Date().getTime();
  let hash = md5(ts+myPrivateAPIkey+myPublicAPIKey).toString();

  let search = document.getElementById("my-input");

  let defaultDeck = ["rogue", "wolverine", "iron man", "gambit", "punisher", "deadpool", "black panther", "gamora", "nightcrawler"];

  // let nameArr = [];
  //
  // nameArr = defaultDeck;

  // let nameArr = defaultDeck;
  let nameArr = ["rogue", "wolverine", "iron man", "gambit", "punisher", "deadpool", "black panther", "gamora", "nightcrawler"];

//Home Page

$(function() {
  $('input.autocomplete').autocomplete({
    data: {
      "Banshee": null,
      "Beast": null,
      "Black Panther": null,
      "Bishop": null,
      "Cable": null,
      "Captain America": null,
      "Captain Marvel (Carol Danvers)": null,
      "Captain Marvel (Monica Rambeau)": null,
      "Captain Marvel (Phyla-Vell)": null,
      "Carnage": null,
      "Cyclops": null,
      "Deadpool": null,
      "Daredevil": null,
      "Doctor Doom": null,
      "Doctor Strange": null,
      "Drax": null,
      "Elektra": null,
      "Emma Frost": null,
      "Fantastic Four": null,
      "Gambit": null,
      "Gamora": null,
      "Groot": null,
      "Hank Pym": null,
      "Hulk": null,
      "Human Torch": null,
      "Ice Man": null,
      "Iron Fist (USM)": null,
      "Iron Man": null,
      "Jessica Jones": null,
      "Juggernaut": null,
      "Kingpin": null,
      "Kitty Pryde": null,
      "Lady Deathstrike": null,
      "Luke Cage": null,
      "Magneto": null,
      "Mystique": null,
      "Nick Fury": null,
      "Nightcrawler": null,
      "Nebula": null,
      "Professor X": null,
      "Psylocke": null,
      "Punisher": null,
      "Quicksilver": null,
      "Rocket Raccoon": null,
      "Rogue": null,
      "Scarlet Witch": null,
      "Silver Surfer": null,
      "Spider-Man": null,
      "Star-Lord (Peter Quill)": null,
      "Storm": null,
      "Sue Storm": null,
      "Thanos": null,
      "Thing": null,
      "Thor": null,
      "Venom (Flash Thompson)": null,
      "Venom (Mac Gargan)": null,
      "Venom (Ultimate)": null,
      "Vision": null,
      "War Machine (Parnell Jacobs)": null,
      "Winter Soldier": null,
      "Wolverine": null,
      "X-23": null,
    },
    limit: Infinity,
    minLength: 1
  });
});




function loadDeck() {
  for (let i = 0; i < nameArr.length; i++) {
    $.get(
      `https://gateway.marvel.com:443/v1/public/characters?name=${nameArr[i]}&ts=${ts}&apikey=${myPublicAPIKey}&hash=${hash}`, function (data){
        $($(".my-deck")[i]).removeClass("empty-deck");
        $($(".my-deck")[i]).css("backgroundImage", `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`);
        $($(".my-deck")[i]).html(`
          <p id="character-name">${data.data.results[0].name}</p>
        `);
      }
    )
  }
}

loadDeck();

$("#make-my-own-deck").click(() => {
  nameArr = [];
  loadDeck();
  console.log(nameArr);
  $(".my-deck").css("backgroundImage", "");
  // $(".my-deck").css("backgroundColor", "white");
  $(".my-deck").empty();
  $(".my-deck").append(`
    <i class="material-icons center">add_circle</i>
    <p>Add Character</p>
    `);
  $(".my-deck").addClass("empty-deck");
})

  $("#add-to-deck").click(() => {
    if (nameArr.length === 9) {
      nameArr.pop();
      nameArr.unshift($("#title").html());
    } else {
      nameArr.unshift($("#title").html());
    }
    loadDeck();
    console.log("add to deck - defaultDeck: ", defaultDeck);
    console.log("add to deck - nameArr: ", nameArr);
  })

  $("#default-deck").click(() => {
    nameArr = ["rogue", "wolverine", "iron man", "gambit", "punisher", "deadpool", "black panther", "gamora", "nightcrawler"];
    console.log("defaultdeck: ",defaultDeck);
    loadDeck();
  })

  search.addEventListener("keypress", (e) => {
    if (e.keyCode === 13){

      let name = search.value;
      search.value = "";

      $.get(
        `https://gateway.marvel.com:443/v1/public/characters?name=${name}&ts=${ts}&apikey=${myPublicAPIKey}&hash=${hash}`, function (data){

          $(".my-card-splash").css("visibility", "visible");
          $(".card-content").empty();
          $(".card-title").html(`${data.data.results[data.data.results.length - 1].name}`);
          $(".card-content").append(`
            <p>${data.data.results[data.data.results.length - 1].description}</p>
          `);
          $(".my-pic").attr("src", `${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension}`);
        }
      )
    }
  })

  //Memory Card Game Page

  $(".card-front").append(`<img src="marvel.jpg">`);

  $(".play").click(function(e) {
    $(".game").fadeIn(1500);
    $("#play").addClass("active");
    $(".splash-page").fadeOut();
    $(".pow").removeAttr('style');
    $(".my-stats").empty();
    $(".my-stats").hide();
    $(".about").fadeOut();

    // $(".game").show();
    $(".deck-page").hide();
    // $("#play").addClass("active");
    $("#my-deck").removeClass("active");
    $("#about-btn").removeClass("active");

    $(".my-card").removeClass("flipped");


    let firstCard = "";
    let firstCardIndex = 0;

    let secondCard = "";
    let secondCardIndex = 0;

    let matchingPairs = 0;

    let numberOfClicks = 0;

    let clockStart = new Date().getTime()/1000;

    let freeSpots = {};

    for (var i = 0; i < 18; i++) {
      freeSpots[i] = true;
    }

    $(".my-card").click(function(){

      let cardFlipped = $(this).hasClass("flipped");

      console.log("first: ", firstCard);

      numberOfClicks++;

      if (!cardFlipped){
         $(this).addClass("flipped");
      }

      let index = $(".my-card").index(this);
      console.log(index);

      if (!firstCard) {
        firstCard = $($(".character-name-display")[index]).html();
        firstCardIndex = index;
        console.log("firstCard: ", firstCard);
      } else if (!secondCard){
        secondCard = $($(".character-name-display")[index]).html();
        secondCardIndex = index;
        console.log("secondCard: ", secondCard);
        setTimeout(doCardsMatch, 500);
      }
    })

    function doCardsMatch(){
      console.log("numberOfClicks: ", numberOfClicks);
      if (firstCard === secondCard) {
        console.log("they match");
        matchingPairs++;
        console.log("matchingPairs: ", matchingPairs);
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
      if (matchingPairs === 9) {
        let endGame =  new Date().getTime()/1000;
        let mins = String(Math.floor((endGame - clockStart)/60));
        let secs = String(Math.floor((endGame - clockStart)%60));
        if (secs.length === 1){
          secs = "0" + secs;
        }
        $(".my-stats-page").fadeIn();
        $(".my-stats").hide();
        $(".my-stats").empty();
        $(".my-stats").append(`
          <h4>Your Stats</h4>
          <h5>Clicks: ${numberOfClicks}</h5>
          <h5>Time: ${mins}mins ${secs}secs</h5>
          `);
        setTimeout(function(){
          $(".my-stats").slideDown();
          }, 1000);

          $(".pow").animate({
            height: "386px",
            width: "500px"
          })
      }
    }

    for (var i = 0; i < 18; i++) {
      let ts = new Date().getTime();
      let hash = md5(ts+myPrivateAPIkey+myPublicAPIKey).toString();

      $.get(`https://gateway.marvel.com:443/v1/public/characters?name=${nameArr[Math.floor(i/2)]}&ts=${ts}&apikey=${myPublicAPIKey}&hash=${hash}`, function(data){
        let freeSpotFound = false;
        do {
          let random = Math.floor(Math.random() * 18);
          let heroName = data.data.results[0].name;
          if (freeSpots[random]){
            $($(".card-back")[random]).css("backgroundImage", `url(${data.data.results[0].thumbnail.path}.${data.data.results[0].thumbnail.extension})`);
            $($(".card-back")[random]).addClass("my-card-display");
            $($(".card-back")[random]).html("");
            if (data.data.results[0].name.indexOf("(") !== -1){
              heroName = data.data.results[0].name.slice(0, data.data.results[0].name.indexOf("("));
            }
            $($(".card-back")[random]).append(`
              <p class="character-name-display">${heroName}</p>
              `);
            freeSpots[random] = false;
            freeSpotFound = true;
          }
        } while (!freeSpotFound);
      })
    }
  })

  // $("#my-deck").click(function() {
  //   // $(".game").hide();
  //   // $(".deck-page").show();
  //   // $("#my-deck").addClass("active");
  //   // $("#play").removeClass("active");
  //   // $(".my-card").off("click");
  //
  // })
  $("#my-deck").click(function() {
    $(".splash-page").fadeOut();
    $(".game").fadeOut();
    $(".deck-page").fadeIn();
    $("#my-deck").addClass("active");
    $("#play").removeClass("active");
    $("#about-btn").removeClass("active");
    $(".my-card").off("click");
    $(".my-stats-page").fadeOut();
    $(".about").fadeOut();
  })

  $("#about-btn").click(() => {
    $(".deck-page").fadeOut();
    $(".my-stats-page").fadeOut();
    $(".game").fadeOut();
    $(".splash-page").fadeOut();
    $(".about").fadeIn(3000);
    $("#my-deck").removeClass("active");
    $("#play").removeClass("active");
    $("#about-btn").addClass("active");
    $(".my-card").off("click");
  })

  // $("#splash-play").click(function() {
  //   $(".game").fadeIn(1500);
  //   $("#play").addClass("active");
  //   $(".splash-page").fadeOut();
  // });




})
