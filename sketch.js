// set up text manipulating variables
var text_whole;
var sliced_parts = [];
var storyline = {}; // part title as key, remaining sentences as values
var storyline_ind = {}; // with sound/image indicators and ready to draw text by words

// set up canvas related variables
var text_font;
var canvas_width = 1000;
var canvas_height = 600;

// create variables for images
var img_door
var img_elevator
var img_elevatorButtoms
var img_hallway
var img_hallwayJohn
var img_hallwayMan
var img_hallwayManSee
var img_lobbyMorning
var img_lobbyNight
var img_lobbyNightMan
var img_lobbyNightManApp
var img_phone
var img_room
var img_stairs
var img_light
  
//create variables for sounds
var music_intro;
var music_end;
var sd_ringSound;
var sd_poundingSound;
var sd_elevatorSound;
var sd_heavyStepSound;
var sd_callSound;

function preload(){
  text_whole = loadStrings('struggle.txt'); // this is an array of lines of the whole text
  
  // preload sounds
  soundFormats('wav','mp3');
  music_intro = loadSound('audio/intro_tjmothy_slow_sad_tones.wav');
  music_end = loadSound('audio/end_bruno_ph_sadness_cosmo.mp3')
  
  sd_ringSound = loadSound('audio/office_phone_ring.mp3');
  sd_poundingSound = loadSound('audio/doorpounding.wav')
  sd_elevatorSound = loadSound('audio/elevator_ding.wav')
  sd_heavyStepSound = loadSound('audio/manheavysteps.wav')
  sd_callSound = loadSound('audio/outgoing_ring.wav')
  
  
  // preload font
  text_font = loadFont('fonts/TravelingTypewriter.otf');
  
  // preload images
  img_door = loadImage('visual/_door.jpg')
  img_elevator = loadImage('visual/_elevator.jpg')
  img_elevatorButtoms = loadImage('visual/_elevatorButtoms.jpg')
  img_hallway = loadImage('visual/_hallway.jpg')
  img_hallwayJohn = loadImage('visual/_hallwayJohn.jpg')
  img_hallwayMan = loadImage('visual/_hallwayMan.jpg')
  img_hallwayManSee = loadImage('visual/_hallwayManSee.jpg')
  img_lobbyMorning = loadImage('visual/_lobbyMorning.jpg')
  img_lobbyNight = loadImage('visual/_lobbyNight.jpg')
  img_lobbyNightMan = loadImage('visual/_lobbyNightMan.jpg')
  img_lobbyNightManApp = loadImage('visual/_lobbyNightManApp.jpg')
  img_phone = loadImage('visual/_phone.jpg')
  img_room = loadImage('visual/_room.jpg')
  img_stairs = loadImage('visual/_stairs.jpg')
  img_light = loadImage('visual/_light.jpg')
  
}// end of preload function

function setup() {
  createCanvas(canvas_width, canvas_height);
  background(0);
  frameRate(10);
  textFont(text_font);
  
  // sound related
  music_intro.setVolume(0.09)
  music_intro.play()
  music_intro.loop()
  
  music_end.setVolume(1)
  
  sd_ringSound.setVolume(0.08)
  sd_elevatorSound.setVolume(1)
  sd_callSound.setVolume(0.1)
  sd_poundingSound.setVolume(1)

  // we now manipulate the text!!!
  // '@' is the indicator of each part
  // find the index of every '@'
  // set up an array of all indexes of '@'
  var indicator_indexes = [];
  var indicator = '@';
  var indicator_index = text_whole.indexOf(indicator);
  while (indicator_index != -1) {
    indicator_indexes.push(indicator_index);
    indicator_index = text_whole.indexOf(indicator, indicator_index + 1); // search element, from index 
  }
  
  // check if indicator index are found
  console.log(indicator_indexes); 
  
  // slice what's between '@' & store them in sliced_parts array
  for (var i=0; i<(indicator_indexes.length-1);i++){
    var sliced_part = text_whole.slice(indicator_indexes[i]+1, indicator_indexes[i+1]);
    sliced_parts.push(sliced_part)
  }
  
  // check for sliced parts
  console.log(sliced_parts) // this is an array of (partial arrays of lines)
  
  // for each part of the story, the first item(line) is the title of that part
  // in dictionary, assign part[0] as key and remaining part[1, part.length] as values 
  // iterate through parts
  // storyline dictionary format:
  // name of part: [array of lines in that part]
  // split lines by ' ', get better dictionary with splited words
  // storyline_ind format:
  // name of part: [[array of words in line],[],[]]
  // sentence[0] is sound indicator
  // sentence[1] is image indicator
  for (var each_part of sliced_parts){
    var content_lines = each_part.slice(1, each_part.length) // content_lines is an array of remaining lines
    storyline[each_part[0]] = content_lines // assign title: content lines
    var content_lines_splited = []
    for(var each_line of content_lines){
      var words_in_line = each_line.split(' ')
      content_lines_splited.push(words_in_line)
      storyline_ind[each_part[0]] = content_lines_splited
    }
  }
  
  // check for storyline
  console.log(storyline_ind)
  
}// end of set up function


// set up variables for drawing
var choices = 'S'; // store user choice in this string
var game_started = false;
var game_ended = false;

var title_alpha = 0; // do occuring effect
var intro_alpha = 0;
var end_alpha = 0;
var note_alpha = 0;
var rd_word_alpha = 0;

var current_line_index = 0;
var current_word_index = 2; // first two words in array are indicators

var bg_need_refresh = true;
var img_needed = true;

var word_width = canvas_width/4; //starting width of words
var word_height = canvas_height-canvas_height/4; // starting height of words
var word_width_end =  canvas_width-canvas_width/4; // supposedly ending width of words


// pressing A B C  to make choices
function keyPressed(){
  if (keyCode == ENTER){
    game_started = true;
  }
  if (keyCode == 32){ 
    current_line_index += 1; //press space would continue to next line
    
    img_needed = true;
    current_word_index = 2; //reset to start a sentence
    word_width = canvas_width/4; //reset starting position of word
    word_height = canvas_height-canvas_height/4;
  }
  if (keyCode == 65||keyCode == 66||keyCode == 67){
    if (keyCode == 65){
      choices += 'A';
    }
    else if (keyCode == 66){
      choices += 'B';
    }
    else if (keyCode == 67){
      choices += 'C';
    }
    
    current_line_index = 0;
    bg_need_refresh = true;
    img_needed = true;
    current_word_index = 2;
    word_width = canvas_width/4;
    word_height = canvas_height-canvas_height/4;

  }
} // end of keyPressed()


/*
//make sense of choices and storylines
_start = [_no_pickup, _yes_pickup]
_no_pickup = [_no_go, _yes_go]
_yes_pickup = [_yes_pickup_no_go, _yes_go]
_yes_pickup_no_go = [_no_go, _yes_go]
_yes_go = [_go_freeze, _go_run]
_go_run = [_go_run_elevator,_go_run_stairs, _go_run_door]
_go_run_elevator = [_elevator_back, _elevator_hide]
_elevator_hide = [_hide_room, _hide_bath, _hide_janitor]
*/

// make a function that prints a stage!
function _printPart(current_part){ // accepts an array of splited sentences
  // sound
  if (current_line_index < current_part.length){// somrthing wrong with this!!
    var sound_state = current_part[current_line_index][0]
	
    if (sound_state == '_mute'){
      sd_ringSound.stop()
      sd_poundingSound.stop()
      //sd_discussSound; //?
      sd_elevatorSound.stop();
      sd_heavyStepSound.stop();
      sd_callSound.stop();
    }
    else if (sound_state == '_ringSound'){
      sd_ringSound.loop()
      sd_ringSound.play()
      sd_ringSound.playMode('restart')
    }
   else if (sound_state == '_poundingSound'){
     sd_poundingSound.loop()
     sd_poundingSound.play()
     sd_poundingSound.playMode('restart')
   }
   else if (sound_state == '_elevatorSound'){
     sd_elevatorSound.play()
     sd_elevatorSound.playMode('restart')
   }
   else if (sound_state == '_heavyStepSound'){
     sd_heavyStepSound.loop()
     sd_heavyStepSound.play()
     sd_heavyStepSound.playMode('restart')
   }
   else if (sound_state == '_callSound'){
     sd_callSound.loop()
     sd_callSound.play()
     sd_callSound.playMode('restart')
   }
  }
  
  //image
  if (current_line_index < current_part.length){
    var image_state = current_part[current_line_index][1]
    if (img_needed == true){
      clear()
      imageMode(CENTER)
      if (image_state == '_black'){
        background(0)
      }
      else if (image_state == '_phone'){
        image(img_phone, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_door'){
        image(img_door, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_elevator'){
        image(img_elevator, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_elevatorButtoms'){
        image(img_elevatorButtoms, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_hallway'){
        image(img_hallway, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_hallwayJohn'){
        image(img_hallwayJohn, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_hallwayMan'){
        image(img_hallwayMan, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_hallwayManSee'){
        image(img_hallwayManSee, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_lobbyMorning'){
        image(img_lobbyMorning, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_lobbyNight'){
        image(img_lobbyNight, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_lobbyNightMan'){
        image(img_lobbyNightMan, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_lobbyNightManApp'){
        image(img_lobbyNightManApp, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_room'){
        image(img_room, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_stairs'){
        image(img_stairs, canvas_width/2, canvas_height/2)
      }
      else if (image_state == '_light'){
        image(img_light, canvas_width/2, canvas_height/2)
      }  
    }
  }
  
  /*
  if (current_line_index == current_part.length - 1){
    bg_need_refresh = false
  }
  */
  if (current_line_index < current_part.length && current_word_index < current_part[current_line_index].length){
    var current_word = current_part[current_line_index][current_word_index];
    if (current_line_index == current_part.length-1 && current_part[current_line_index][2] == 'Ending:' && current_word_index == current_part[current_line_index].length-1){
      music_end.loop()
      music_end.play()
      music_end.playMode('restart')
      game_ended = true
      game_started = false
    }
    
    img_needed = false
    text(current_word, word_width, word_height);
    word_width += textWidth(current_word + ' ');
    current_word_index += 1
    if (word_width >= word_width_end){
      word_width = canvas_width/4
      word_height += 30
    }
  }
  
  
  // game_ended = true;
  
  
} // end of my function

var end_timer = 0

function draw() {
  stroke(0);
  strokeWeight(2);
  
  if (game_started == true && game_ended == false){//press enter to start the game
    fill(255)
    music_intro.stop()
    if (bg_need_refresh == true){
      clear()
    }
    bg_need_refresh = false
    
    textAlign(LEFT)
    textSize(20)

    if (choices == 'S'){
      _printPart(storyline_ind._start)
    }
    else if (choices == 'SA'){
      _printPart(storyline_ind._no_pickup)
    }
    else if (choices == 'SAA'|| choices == 'SBAA'){
       _printPart(storyline_ind._no_go)//e
    }
    else if (choices == 'SAB'|| choices == 'SBB'|| choices == 'SBAB'){
       _printPart(storyline_ind._yes_go)
    }
    else if (choices == 'SABA'|| choices == 'SBBA'|| choices == 'SBABA'){
       _printPart(storyline_ind._go_freeze)//e
    }
    else if (choices == 'SABB'|| choices == 'SBBB'|| choices == 'SBABB'){
       _printPart(storyline_ind._go_run)
    }
    else if (choices == 'SABBA'|| choices == 'SBBBA'|| choices == 'SBABBA'){
       _printPart(storyline_ind._go_run_elevator)
    }
    else if (choices == 'SABBAA'|| choices == 'SBBBAA'|| choices == 'SBABBAA'){
       _printPart(storyline_ind._elevator_back)//e
    }
    else if (choices == 'SABBAB'|| choices == 'SBBBAB'|| choices == 'SBABBAB'){
       _printPart(storyline_ind._elevator_hide)
    }
    else if (choices == 'SABBABA'|| choices == 'SBBBABA'|| choices == 'SBABBABA'){
       _printPart(storyline_ind._hide_room)//e
    }
    else if (choices == 'SABBABB'|| choices == 'SBBBABB'|| choices == 'SABBBABB'){
       _printPart(storyline_ind._hide_bath)//e
    }
    else if (choices == 'SABBABC'|| choices == 'SBBBABC'|| choices == 'SBABBABC'){
       _printPart(storyline_ind._hide_janitor)//e
    }
    
    else if (choices == 'SABBB'|| choices == 'SBBBB'|| choices == 'SBABBB'){
       _printPart(storyline_ind._go_run_stairs)//e
    }
    else if (choices == 'SABBC'|| choices == 'SBBBC'|| choices == 'SBABBC'){
       _printPart(storyline_ind._go_run_door)//e
    }
    else if (choices == 'SB'){
       _printPart(storyline_ind._yes_pickup)
    }
    else if (choices == 'SBA'){
       _printPart(storyline_ind._yes_pickup_no_go)
    } 
  }
  
  
  else if (game_ended == true && game_started == false){ // if game has reached ending, 
    //bg_need_refresh = true;
    if (end_timer == 60){
      clear()
      //text("Made by Alex Yixuan Xu",canvas_width/2, canvas_height/2)
     
      textAlign(CENTER);
      textSize(25);
      fill(255, end_alpha);
      text("Made by Alex Yixuan Xu",canvas_width/2, canvas_height/2);
      end_alpha += 10;

      if (end_alpha >= 400){
        clear();
        fill(255, note_alpha);
        text("Check files for media sources.",canvas_width/2, canvas_height/2);
        note_alpha += 10;

        if(note_alpha >= 400){
          clear()
          fill(255, rd_word_alpha)
          text("Thank you.",canvas_width/2, canvas_height/2);
          rd_word_alpha += 10;
        }
      }
    }
    end_timer += 1
  }
  
  else if (game_started == false && game_ended == false ){ // if not started, show title page
    
    textAlign(CENTER);
    textSize(30)
    fill(255, intro_alpha)
    text("Based on a true story.",canvas_width/2, canvas_height/2)
    intro_alpha += 20
    
    if (intro_alpha >= 350 ){
      clear()
      
      textSize(80)
      fill(255, title_alpha)
      text("Struggle", canvas_width/2, canvas_height/2)
      title_alpha += 20

      if (title_alpha >= 400){
        fill(255)
        textSize(20);
        text("Press Enter to start.", canvas_width/2, canvas_height-canvas_height/4);
      }
    }
  }
}// end of draw function