$(document).ready(function(){
  $(function() {
    $('input.autocomplete').autocomplete({
      data: {
        "Black Panther": null,
        "Captain America": null,
        "Captain Marvel (Carol Danvers)": null,
        "Captain Marvel (Monica Rambeau)": null,
        "Captain Marvel (Phyla-Vell)": null,
        "Deadpool": null,
        "Daredevil": null,
        "Elektra": null,
        "Gambit": null,
        "Gamora": null,
        "Hank Pym": null,
        "Iron Fist (USM)": null,
        "Iron Man": null,
        "Jessica Jones": null,
        "Juggernaut": null,
        "Luke Cage": null,
        "Mystique": null,
        "Nightcrawler": null,
        "Professor X": null,
        "Punisher": null,
        "Rogue": null,
        "Scarlet Witch": null,
        "Spider-Man": null,
        "Winter Soldier": null,
        "Wolverine": null,
      },
      limit: Infinity,
      minLength: 1
    });
  });
    // $(".splash-page").hide();
    $(".splash-page").hide();
    $(".splash-page").fadeIn(3000);
    $(".splash-page").slideDown();
    $(".game").hide();
    $(".deck-page").hide();
    $(".my-stats-page").hide();

    $(".about").hide();
    $("#about-btn").click(() => {
      $(".deck-page").fadeOut();
      $(".my-stats-page").fadeOut();
      $(".game").fadeOut();
      $(".splash-page").fadeOut();
      $(".about").fadeIn();
    })

    $("#my-deck").click(function() {
      $(".splash-page").fadeOut();
      $(".game").fadeOut();
      $(".deck-page").fadeIn();
      $("#my-deck").addClass("active");
      $("#play").removeClass("active");
      // $(".splash-page").hide();
      // $(".game").hide();
      // $(".deck-page").show();
      // $("#my-deck").addClass("active");
      // $("#play").removeClass("active");
    })

    $("#play").click(function() {
      $(".pow").removeAttr('style');
      $(".my-stats").hide();
      $(".splash-page").fadeOut();
      $(".game").fadeIn();
      $(".deck-page").fadeOut();
      $("#play").addClass("active");
      $("#my-deck").removeClass("active");
      // $(".splash-page").hide();
      // $(".game").show();
      // $(".deck-page").hide();
      // $("#play").addClass("active");
      // $("#my-deck").removeClass("active");
    })

    $("#splash-play").click(function() {
      $(".my-stats-page").fadeIn();
      $(".my-stats").hide();
      $(".my-stats").append(`
        <h4>Hi</h4>
        <h5>I am testing</h5>
        <h5>this crap</h5>
        `)
      setTimeout(function(){
        $(".my-stats").slideDown();
      }, 1000);

        $(".pow").animate({
          height: "386px",
          width: "500px"
        })



      // $(".game").fadeIn(1500);
      // $("#play").addClass("active");
    });
})
