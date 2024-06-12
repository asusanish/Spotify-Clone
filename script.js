let currentSong = new Audio();

async function getSongs() {
  let songFetch = await fetch("http://127.0.0.1:3000/Songs/");
  let response = await songFetch.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let links = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < links.length; index++) {
    const element = links[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/Songs/")[1]);
    }
  }
  return songs;
}

async function main() {
  let music = await getSongs();

  let songList = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of music) {
    songList.innerHTML =
      songList.innerHTML +
      `<li>
                  <div class="songs">
                    <div class="info flex">
                      <img class="invert" src="music.svg" alt="" />
                      <p>${song.replaceAll("%20", " ")}</p>
                      </div>
                      <div class="play flex">
                        <p>Play Now </p>
                        <img class="invert" src="play.svg" alt="">
                      </div>
                  </div>
    </li>`;
  }

  //List of songs showing in library
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.getElementsByTagName("p")[0].innerHTML);
      playMusic(e.getElementsByTagName("p")[0].innerHTML);
      let songName = document.querySelector(".songName");
      songName.innerHTML = ` <img class="invert" src="music.svg" alt="" />
                <p>
                ${e.getElementsByTagName("p")[0].innerHTML}
                </p>
              `;
    });
  });

  // event listener to play next and prev
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "musicplay.svg";
    }
  });

  //time update event
  currentSong.addEventListener("timeupdate", () => {
    // console.log(currentSong.currentTime, currentSong.duration)
    document.querySelector(".seekbar p").innerHTML = `${formatTime(
      currentSong.currentTime
    )}/${formatTime(currentSong.duration)}`;

    

    document.querySelector(".duration").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
    document.querySelector(".backgroundColor").style.width =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";

      });
        document.querySelector(".seekbar").addEventListener("click", (e) => {

          let currentSongDuration = (e.offsetX / e.target.getBoundingClientRect().width) * 100
          document.querySelector(".duration").style.left = currentSongDuration + "%";
          document.querySelector(".backgroundColor").style.width = (e.offsetX / e.target.getBoundingClientRect().width) * 100 + "%";
          currentSong.currentTime = (currentSong.duration * currentSongDuration) / 100;
        });
}

// function volumeSlider() {
//   let volume = document.getElementById("volume-Slider");
//   volume.addEventListener("change", function (e) {
//     console.log(audio.volume = e.currentTarget.value / 100);
//   });
// }

const playMusic = (track) => {
  // let audio = new Audio("/Spotify Clone/Songs/" + track);
  currentSong.src = "/Songs/" + track;
  currentSong.play();
  play.src = "pause.svg";
};

function formatTime(duration) {
  if (isNaN(duration) || duration < 0) {
    return "Invalid Input";
  }
  const minutes = Math.floor(duration / 60);
  const remaningSeconds = Math.floor(duration % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remaningSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

main();
