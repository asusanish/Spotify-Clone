let currentSong = new Audio();

async function getSongs() {
  let songFetch = await fetch("https://github.com/asusanish/Spotify-Clone/tree/main/Songs");
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

  let musicList = Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.getElementsByTagName("p")[0].innerHTML);
      playMusic(e.getElementsByTagName("p")[0].innerHTML);
      let songName = document.querySelector(".songName");
      songName.innerHTML =
        `<img class="invert" src="music.svg" alt="" />
                <p>${e.getElementsByTagName("p")[0].innerHTML}</p>`;
    });
  });

  //   audio.addEventListener("loadeddata", () => {
  //     console.log(audio.duration, audio.currentSrc, audio.currentTime);
  //   });
}

// function volumeSlider() {
//   let volume = document.getElementById("volume-slider");
//   volume.addEventListener("change", function (e) {
//     audio.volume = e.currentTarget.value / 100;
//   });
// }

const playMusic = (track) => {
  // let audio = new Audio("/Spotify Clone/Songs/" + track);
  currentSong.src = "/Songs/" + track;
  currentSong.play();
};
main();
