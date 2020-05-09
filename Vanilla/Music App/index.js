const app = ()=>{
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    let timer = null;
    let timeElapsed = 0;
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll('.sound-picker button');

    const timeDisplay = document.querySelector('.time-display');

    const outlineLength = outline.getTotalLength();

    const timeDuration = document.querySelector('.time-picker');

    
    let fakeDuration = 600;

    const countDown = ()=>{
        timeElapsed++;
        timeDisplay.textContent = `${Math.floor(timeElapsed/60)}:${timeElapsed%60}`
        if(timeElapsed == fakeDuration){
            clearTimeout(timer);
            timer = null;
        }
        else{
           timer =  setTimeout(countDown,1000);
        }
    }
    timeDuration.addEventListener("click", (event)=>{
        console.log('clicked');
        const value = event.target.getAttribute("data-time");
        fakeDuration = value;
        timer = setTimeout(countDown, 1000);
        timeElapsed = 1;
    })
    console.log(play)
    // song.play();
    play.addEventListener("click", ()=>{
        if(song.paused){
            song.play();
            video.play();
            play.src = './meditation-app-master/meditation-app-master/svg/pause.svg';
        }
        else{
            song.pause();
            video.pause();
            play.src = './meditation-app-master/meditation-app-master/svg/play.svg'
        }
    });

    sounds.forEach((sound)=>{
        sound.addEventListener('click', ()=>{
            song.src = sound.getAttribute('data-sound');
            video.src = sound.getAttribute('data-video');
            if(song.paused){
                song.play();
                video.play();
                play.src = './meditation-app-master/meditation-app-master/svg/pause.svg';
            }
        })
    })

}
app();