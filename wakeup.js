/* test */

var str = new function() {
  this.title_dreaming = "Je dors."
  this.wakemeup = "me réveiller"
  this.pinchme = "pincer mon bras"
  this.hitme = "me donner une claque."
  this.energy = "Energie" // Doit apparaître quand je me donne une claque.
  this.title_room = "Dans ma chambre"
  this.first_action = "Ouvrir les yeux"
};

/** Updates a given text with an animation consisting of adding letters one by one */
var changeText = function(a, text, duration, i) {
  if(typeof duration == "undefined") duration = 300;
  if(typeof i == "undefined") i = 1;
  $(a).text(text.substr(0, i));
  if( i < text.length) {
    var step = text.length*1.0 / duration;
    setTimeout(function() { changeText(a, text, duration, i + 1); }, step);
  }
};

/** Hides a particular text block and reshow it after duration with newText*/
var hideAndReshow = function(object, newText, duration) {
  console.log(object);
  object.css("display", "none");
  object.text("");
  setTimeout(function() {
    object.css("display", "");
    changeText(object, newText);
  }, duration);
};
(function($) {
  /** Method fired once something is hovered, only once */
  $.fn.onHoverUnique = function(callback) {
    var id = "mouseenter.a"+ (new Date().getTime());
    console.log("setting on hover")
    this.on(id, (function(that, i, cb) {
       return (function() {
        that.off(i);
        cb();
      });
    })(this, id, callback));
    return this;
  }
})(jQuery);

/** Body onload */
$(function() {
  $(".main_title").text(str.title_dreaming);
  $(".button").text(str.wakemeup);
  
  /** First stage: Try to wake up.
      TODO: Add energy bar and make a small game to wake it up.
      TODO: Make architecture so that it comes back to this state if the user does nothing.
   */
  $(".resources").append($("<div>").addClass("button noselect").css("display", "none"));
  console.log("setting up")
  $(".main_title").onHoverUnique(function() {
    console.log("hovering")
    hideAndReshow($(".button"), str.wakemeup, 0);
  });
  
  var level = 0; // Wake up.
  $(".button").on("click.wakeup", function() {
    var i = Math.floor(level/5)+1;
    $(".main_title").addClass("hit"+i);
    $(".main_title").switchClass("hit"+i, "", 300);
    if(level == 4) {
      hideAndReshow($(this), str.pinchme, 2500);
    }
    if(level == 9) {
      hideAndReshow($(this), str.hitme, 4500);
    }
    level++;
    if(level == 16) {
      $(".button").off("click.wakeup");
      changeText($(".main_title"),str.title_room, 1000);
      changeText($(this),str.first_action, 1000);
    }
  });
});