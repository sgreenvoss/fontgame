$(
  function () {  
    const FONTS = [
      'Arial',
      'Helvetica',
      'Verdana',
      'Trebuchet MS',
      'Tahoma',
      'Times New Roman',
      'Impact',
      'Comic Sans MS',
      'Luminari',
      "Average"
    ]

    var yesNo = true

    function rollDice() {
      var rand = Math.random();
      if (rand > 0.46) {
        setFont(1);
      } else {
        setFont(0);
      }
    }

    function uniqueItem(alrPicked) {
      var fonts = [];
      for (font in FONTS) {
        
        fonts.push(FONTS[font]);
      }
      var ind = fonts.indexOf(alrPicked);
      fonts.splice(ind, 1);
      return fonts[Math.floor(Math.random() * fonts.length)];
    }    

    function setFont(isTrue) {
      console.log(isTrue);
      var rand = Math.floor(Math.random() * FONTS.length);
      var theFont = FONTS[rand];
      $(".tile").css("font-family", theFont);
      
      if (isTrue) {
        $(".tile").text(theFont);
        yesNo = true;
      } else {
        var fakeFont = uniqueItem(theFont);
        $(".tile").text(fakeFont);
        yesNo = false;
      }
    }
    
    function right() {
      console.log('right');
      $(".tile").animate({left: '100%', opacity: 0}, 250, function() {
        $(".tile").remove();
        evaluate(true);
        makeTile();
      });        
    }
    
    function left() {
      $(".tile").animate({left: '-50%', opacity: 0}, 300, function() {
        $(".tile").remove();
        evaluate(false);
        makeTile();
      });
    }
    
    function evaluate(guessedTrue) {         
      if (guessedTrue == yesNo) {
        var count = $("#correct_counter").text();
        count++;
        $("#correct_counter").text(count);
      } else {
        var count = $("#incorrect_counter").text();
        count++;
        $("#incorrect_counter").text(count);
      }  
    }
    
    function makeTile() {
      var new_el = document.getElementById('container').appendChild(document.createElement("div"));
      new_el.className = "tile";
      $(".tile").animate({opacity: 1}, 'fast');
      rollDice();
    }
    
    function keydown(event) {
      switch (event.which) {
        case 39: // right
          right();
          break;
        case 37: // left
          left();
          break;
      }
    }

      
    return function(evt) {
        makeTile();
        $(document).keydown(keydown);
    }
  }()
);  
   
