const app = () => {
  const play= document.querySelector(".play");
  const song= document.querySelector(".song");
  const video= document.querySelector(".video-container video");
  const outline= document.querySelector(".moving-outline circle");
  const sounds= document.querySelectorAll(".sound-picker button"); //all sounds
  const timeDisplay= document.querySelector(".time-display");
  const timeSelect= document.querySelectorAll(".time-select button")

  const outlineLength= outline.getTotalLength(); //length of outline circle

  let fakeDuration=600;
  outline.style.strokeDasharray = outlineLength;
  outline.style.strokeDashoffset = outlineLength;

  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  //play different sound and video
  sounds.forEach(sound => {
    sound.addEventListener('click', () =>{
      song.src=sound.getAttribute('data-sound');
      video.src= sound.getAttribute('data-video');
      checkPlaying(song);
    })
  })

  // select song duration
  timeSelect.forEach(option =>{
    option.addEventListener('click',function(){
      fakeDuration = option.getAttribute("data-time");
      timeDisplay.textContent= `${Math.floor(fakeDuration/60)}:${Math.floor(fakeDuration%60)}`;
    })
  })

  const checkPlaying = song => {        //function to pause &play sound ,video
    if(song.paused){
      song.play();
      video.play();
      play.src = "./svg/pause.svg";
    }
    else{
      song.pause();
      video.pause();
      play.src = "./svg/play.svg";
    }
  }
  //Animating the circle
  song.ontimeupdate = () => {
    let currentTime =song.currentTime;
    let elapsed= fakeDuration -currentTime;
    let seconds = Math.floor(elapsed%60);
    let minutes = Math.floor(elapsed / 60);

    let progress= outlineLength-(currentTime / fakeDuration)*outlineLength;
    outline.style.strokeDashoffset= progress;

    //animating timeDisplay
    timeDisplay.textContent=`${minutes}: ${seconds}`

    // When song finishes then stops the circle and sound and clock
    if(currentTime >= fakeDuration){
      video.pause();
      song.pause();
      play.src="./svg/play.svg"
      song.currentTime=0;
    }
  }

}
app();
