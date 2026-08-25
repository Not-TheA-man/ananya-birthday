import './style.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const birthday = new Date('2026-08-26T00:00:00+05:30');
const previewMode = new URLSearchParams(window.location.search).has('preview');
const memories = [
  { image: '/photos/image-1787572542135.png', title: 'The birthday girl', copy: 'A little bit of sunshine, wherever you go.' },
  { image: '/photos/image-1787572583927.png', title: 'Your brightest nights', copy: 'You make every room warmer just by being in it.' },
  { image: '/photos/image-1787572619237.png', title: 'Twenty-one', copy: 'Here is to your next chapter, my favourite person.' }
];
const foodMemories = [
  { image: '/photos/image-1787604363166.png', title: 'Burger girl', copy: 'A very serious meeting with a very good burger.' },
  { image: '/photos/image-1787606676180.png', title: 'Dinner dates', copy: 'Good food, pretty places, and that little look of joy.' },
  { image: '/photos/image-1787606710353.png', title: 'Food first', copy: 'Honestly, the priorities are perfect.' },
  { image: '/photos/image-1787606783275.png', title: 'Cute and hungry', copy: 'The face of someone who is absolutely not sharing.' },
  { image: '/photos/image-1787606818771.png', title: 'One more bite', copy: 'A whole food era, captured one delicious moment at a time.' }
];

const app = document.querySelector('#app');

app.innerHTML = `
  <main class="page-shell">
    <div class="topline">
      <span class="tiny-mark">A / 21</span>
      <span class="tiny-copy">A little countdown for my favourite person</span>
      <span class="date-stamp">26.08.26</span>
    </div>

    <section class="hero page-state" aria-labelledby="page-title">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Counting down to Ananya</p>
        <h1 id="page-title">Twenty-one looks<br /><em>beautiful</em> on you.</h1>
        <p class="intro">Your next chapter begins in</p>
        <div class="countdown" aria-live="polite">
          <div class="time-unit"><strong id="days">00</strong><span>days</span></div>
          <i>:</i>
          <div class="time-unit"><strong id="hours">00</strong><span>hours</span></div>
          <i>:</i>
          <div class="time-unit"><strong id="minutes">00</strong><span>minutes</span></div>
          <i>:</i>
          <div class="time-unit"><strong id="seconds">00</strong><span>seconds</span></div>
        </div>
        <p class="birthday-line">Until <b>Wednesday, 26 August 2026</b></p>
        <button class="reveal-button" type="button" aria-expanded="false" aria-controls="secret-note">
          <span class="button-icon">✦</span> Open a little note
        </button>
        <p class="secret-note" id="secret-note" hidden>
          Happy birthday, Ananya. You make ordinary days feel like something worth celebrating. Here’s to 21, and to every lovely thing still ahead of you. <span>♡</span>
        </p>
        <button class="birthday-music-button" type="button"><span>♫</span> Play happy birthday</button>
        <button class="journey-button" type="button" hidden>Begin her 21st <span>→</span></button>
      </div>

      <div class="portrait-stage" aria-label="A birthday keepsake for Ananya">
        <div class="sun-disc"></div>
        <div class="portrait-frame">
          <img class="portrait-image" src="/photos/image-1787572542135.png" alt="Ananya in a red outfit" />
          <div class="portrait-glow"></div>
          <div class="portrait-letter">A</div>
          <p class="portrait-caption">the birthday girl</p>
        </div>
        <span class="orbit orbit-one"></span>
        <span class="orbit orbit-two"></span>
        <span class="scribble">for you,<br />always</span>
        <span class="sparkle sparkle-one">✦</span>
        <span class="sparkle sparkle-two">✧</span>
      </div>
    </section>

    <section class="memories page-state book-page" id="memories" hidden tabindex="-1" aria-label="Chapter one: Ananya's portraits">
      <div class="memory-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Chapter one / Her portraits</p>
        <p class="memory-count"><span id="memory-number">01</span> / 03</p>
      </div>
      <div class="book-controls">
        <span class="chapter-label">01 / 02</span>
        <button class="book-button memories-next" type="button" aria-label="Open chapter two, Ananya's food era">Chapter two <span>→</span></button>
      </div>
      <div class="memory-view">
        <div class="memory-photo-wrap"><img id="memory-photo" class="memory-photo" alt="" /></div>
        <div class="memory-copy">
          <p class="memory-kicker">memory no. <span id="memory-index">01</span></p>
          <h2 id="memory-title"></h2>
          <p id="memory-text"></p>
          <button class="next-button" type="button">Next memory <span>→</span></button>
        </div>
      </div>
      <nav class="music-shelf" aria-label="Birthday soundtrack">
        <p class="memory-kicker">now playing for your next chapter</p>
        <div class="soundtrack-card">
          <span class="soundtrack-icon">♫</span>
          <div><b>Twenty-one soundtrack</b><small>Tap play below to listen</small></div>
        </div>
        <div class="artist-players">
          <div class="player-choice"><button class="artist-choice active" data-artist="lorde" type="button">Lorde</button><button class="artist-choice" data-artist="olivia" type="button">Olivia Rodrigo</button></div>
          <iframe class="single-player" title="Lorde Spotify player" src="https://open.spotify.com/embed/artist/163tK9Wjr9P9DmM0AVK7lm?utm_source=generator&theme=0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
      </nav>
    </section>

    <section class="food-page page-state book-page" id="food-page" hidden tabindex="-1" aria-label="Chapter two: Ananya's food era">
      <div class="memory-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Ananya's food era</p>
        <p class="memory-count"><span id="food-number">01</span> / 05</p>
      </div>
      <div class="memory-view">
        <div class="memory-photo-wrap food-photo-wrap"><img id="food-photo" class="memory-photo" alt="" /></div>
        <div class="memory-copy">
          <p class="memory-kicker">food memory no. <span id="food-index">01</span></p>
          <h2 id="food-title"></h2>
          <p id="food-text"></p>
          <button class="next-button food-next-button" type="button">Next food memory <span>→</span></button>
        </div>
      </div>
      <div class="book-controls">
        <button class="book-button food-prev" type="button" aria-label="Return to chapter one, Ananya's portraits"><span>←</span> Chapter one</button>
        <button class="book-button map-next" type="button" aria-label="Open chapter three, our Delhi dates">Chapter three <span>→</span></button>
      </div>
      <nav class="music-shelf" aria-label="Food page soundtrack">
        <p class="memory-kicker">soundtrack for the food era</p>
        <div class="soundtrack-card"><span class="soundtrack-icon">♫</span><div><b>Lorde x Olivia Rodrigo</b><small>Tap play inside either player</small></div></div>
        <div class="artist-players">
          <div class="player-choice"><button class="artist-choice active" data-artist="lorde" type="button">Lorde</button><button class="artist-choice" data-artist="olivia" type="button">Olivia Rodrigo</button></div>
          <iframe class="single-player" title="Lorde Spotify player" src="https://open.spotify.com/embed/artist/163tK9Wjr9P9DmM0AVK7lm?utm_source=generator&theme=0" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
      </nav>
    </section>

    <section class="letter-page page-state book-page" id="letter-page" hidden tabindex="-1" aria-label="Chapter five: The letter">
      <div class="memory-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Chapter five / The letter</p>
        <p class="memory-count">♡ 21 ♡</p>
      </div>
      <article class="letter-paper">
        <div class="cake-mark" aria-hidden="true">♡  ♡  ♡<br /><span>▰▰▰</span></div>
        <p class="memory-kicker">for my Ghewar Bunny</p>
        <h2>The letter</h2>
        <div class="letter-copy">
          <p>Dear Ananya,</p>
          <p>Happy 21st birthday, my love. I don't even know where to start because there is so much I want to tell you, but I hope you can feel how much love I have for you in every word.</p>
          <p>From the very first day, I fell in love with you, and since then you have slowly become such a huge part of my life. I love youuuuuuuuuuu so much, and I genuinely don't think I will ever get tired of saying it.</p>
          <p>I love your laugh, your eyes, your smell that reminds me of home, and the way you laugh at my absolutely shitty jokes. Sometimes I make stupid jokes just because I want to hear you laugh.</p>
          <p>I want to make you smile har din: by making you laugh, annoying you, taking you somewhere nice, or doing something stupid that makes your day a little better. And yes, I absolutely love ragebaiting you itna zyada.</p>
          <p>I love our stupid little fights, random conversations, dates with my cuutu patootie baby girl, and all the nonsense that somehow becomes a memory with you. You are my Ghewar Bunny, my Baniya Kim Kardashian, and the person I can be the most stupid version of myself around.</p>
          <p>I hope this year brings you everything you want and more. I want to see you turn 22, 23, 24 and then complain about how old we're getting together. I want to travel with you, celebrate your wins, be there when things aren't going well, and make a million more stupid memories together.</p>
          <p>Thank you for being my happy place. I hope when you read this years from now, we are still together and I am still annoying you with the same stupid jokes. Happy 21st birthday, Ananya. You deserve nothing less.</p>
          <p class="letter-signoff">I love youuuuuuuuuuuuuuuuuuuuuuuuuuu,<br />my Ghewar Bunny.<br /><br />Always yours,<br />Prakhar <span>♥</span></p>
        </div>
      </article>
      <div class="book-controls"><button class="book-button letter-prev" type="button" aria-label="Return to chapter four, Gallery of Big Dih Ananya"><span>←</span> Chapter four</button><span class="chapter-label">05 / 05</span></div>
    </section>

    <section class="map-page page-state book-page" id="map-page" hidden tabindex="-1" aria-label="Chapter three: Our Delhi dates">
      <div class="memory-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Chapter three / Our Delhi dates</p>
        <p class="memory-count">India <span>→</span> Delhi</p>
      </div>
      <div class="map-intro">
        <div>
          <p class="memory-kicker">a tiny map of us</p>
          <h2>Every road<br /><em>led to you.</em></h2>
        </div>
        <p>Three places, three little chapters, and one person who made every date feel like a city worth discovering.</p>
      </div>
      <div class="date-map" id="date-map" aria-label="Interactive map of our Delhi dates"></div>
      <div class="map-legend" aria-live="polite"><span class="map-pin-dot"></span><span id="map-message">Tap a pin to read something sweet.</span></div>
      <div class="book-controls">
        <button class="book-button map-prev" type="button" aria-label="Return to chapter two, Ananya's food era"><span>←</span> Chapter two</button>
        <button class="book-button collage-next" type="button" aria-label="Open chapter four, our memory collage">Chapter four <span>→</span></button>
      </div>
      <div class="chapter-soundtrack">Soundtrack: Lorde x Olivia Rodrigo <span>♫</span></div>
    </section>

    <section class="collage-page page-state book-page" id="collage-page" hidden tabindex="-1" aria-label="Gallery of Big Dih Ananya">
      <div class="memory-heading">
        <p class="eyebrow"><span class="eyebrow-dot"></span> Chapter four / Gallery of Big Dih Ananya</p>
        <p class="memory-count">04 / 04</p>
      </div>
      <div class="collage-intro">
        <p class="memory-kicker">the good stuff</p>
        <h2>Gallery of Big Dih<br /><em>Ananya.</em></h2>
        <p>Eight frames. One favourite person. A scrapbook page for every version of you I get to love.</p>
      </div>
      <div class="memory-collage" aria-label="A collage of Ananya's memories">
        <figure><img src="/photos/image-1787572542135.png" alt="Ananya in a colourful outfit" /><figcaption>you, always</figcaption></figure>
        <figure><img src="/photos/image-1787604363166.png" alt="Ananya enjoying a burger" /><figcaption>foodie energy</figcaption></figure>
        <figure><img src="/photos/image-1787572583927.png" alt="Ananya smiling in pink light" /><figcaption>best smile</figcaption></figure>
        <figure><img src="/photos/image-1787606783275.png" alt="Ananya being playful at dinner" /><figcaption>tiny menace</figcaption></figure>
        <figure><img src="/photos/image-1787572619237.png" alt="Ananya at a restaurant" /><figcaption>date night</figcaption></figure>
        <figure><img src="/photos/image-1787606676180.png" alt="Ananya at a restaurant table" /><figcaption>main character</figcaption></figure>
        <figure><img src="/photos/image-1787606710353.png" alt="Ananya sharing a food moment" /><figcaption>the little moments</figcaption></figure>
        <figure><img src="/photos/image-1787606818771.png" alt="Ananya enjoying dinner" /><figcaption>my favourite view</figcaption></figure>
      </div>
      <div class="book-controls">
        <button class="book-button collage-prev" type="button" aria-label="Return to chapter three, our Delhi dates"><span>←</span> Chapter three</button>
        <button class="book-button letter-next" type="button" aria-label="Open chapter five, the letter">The letter <span>→</span></button>
      </div>
      <div class="chapter-soundtrack">Soundtrack: Lorde x Olivia Rodrigo <span>♫</span></div>
    </section>

    <footer class="footer-note">
      <span>made with all my love</span>
      <span class="heart-line">♥</span>
      <span>for ananya</span>
    </footer>
  </main>
`;

const units = {
  days: document.querySelector('#days'),
  hours: document.querySelector('#hours'),
  minutes: document.querySelector('#minutes'),
  seconds: document.querySelector('#seconds')
};

let memoriesOpened = false;
function openMemories() {
  if (memoriesOpened) return;
  memoriesOpened = true;
  document.querySelector('.hero').hidden = true;
  memoriesSection.hidden = false;
  journeyButton.hidden = true;
  showMemory();
}

function updateCountdown() {
  const difference = birthday.getTime() - Date.now();
  if (difference <= 0 || previewMode) {
    Object.values(units).forEach((unit) => { unit.textContent = '00'; });
    document.querySelector('.intro').textContent = previewMode ? 'Previewing your birthday journey' : 'Today is your day, Ananya';
    if (previewMode) document.querySelector('.journey-button').hidden = false;
    if (difference <= 0) openMemories();
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  units.days.textContent = String(Math.floor(totalSeconds / 86400)).padStart(2, '0');
  units.hours.textContent = String(Math.floor((totalSeconds % 86400) / 3600)).padStart(2, '0');
  units.minutes.textContent = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  units.seconds.textContent = String(totalSeconds % 60).padStart(2, '0');
}

const revealButton = document.querySelector('.reveal-button');
const note = document.querySelector('#secret-note');
revealButton.addEventListener('click', () => {
  const isOpen = revealButton.getAttribute('aria-expanded') === 'true';
  revealButton.setAttribute('aria-expanded', String(!isOpen));
  note.hidden = isOpen;
  revealButton.innerHTML = isOpen
    ? '<span class="button-icon">✦</span> Open a little note'
    : '<span class="button-icon">♡</span> Hide the note';
});

let memoryIndex = 0;
const journeyButton = document.querySelector('.journey-button');
const memoriesSection = document.querySelector('#memories');
const memoryPhoto = document.querySelector('#memory-photo');
const memoryTitle = document.querySelector('#memory-title');
const memoryText = document.querySelector('#memory-text');
const memoryNumber = document.querySelector('#memory-number');
const memoryIndexLabel = document.querySelector('#memory-index');
const foodPage = document.querySelector('#food-page');
const foodPhoto = document.querySelector('#food-photo');
const foodTitle = document.querySelector('#food-title');
const foodText = document.querySelector('#food-text');
const foodNumber = document.querySelector('#food-number');
const foodIndexLabel = document.querySelector('#food-index');
let foodIndex = 0;
const mapPage = document.querySelector('#map-page');
const mapMessage = document.querySelector('#map-message');
let dateMap;
const collagePage = document.querySelector('#collage-page');
const letterPage = document.querySelector('#letter-page');
const showPortraitChapter = () => {
  foodPage.hidden = true;
  memoriesSection.hidden = false;
  memoriesSection.focus();
};
const showFoodChapter = () => {
  memoriesSection.hidden = true;
  mapPage.hidden = true;
  foodPage.hidden = false;
  showFoodMemory();
  foodPage.focus();
};
const showMapChapter = () => {
  memoriesSection.hidden = true;
  foodPage.hidden = true;
  collagePage.hidden = true;
  mapPage.hidden = false;
  mapPage.focus();
  if (!dateMap) createDateMap();
  setTimeout(() => dateMap.invalidateSize(), 0);
};
const showCollageChapter = () => {
  memoriesSection.hidden = true;
  foodPage.hidden = true;
  mapPage.hidden = true;
  collagePage.hidden = false;
  collagePage.focus();
};
const showLetterChapter = () => {
  collagePage.hidden = true;
  letterPage.hidden = false;
  letterPage.focus();
};

function showMemory() {
  const memory = memories[memoryIndex];
  memoryPhoto.src = memory.image;
  memoryPhoto.alt = memory.title;
  memoryTitle.textContent = memory.title;
  memoryText.textContent = memory.copy;
  memoryNumber.textContent = String(memoryIndex + 1).padStart(2, '0');
  memoryIndexLabel.textContent = String(memoryIndex + 1).padStart(2, '0');
}

journeyButton.addEventListener('click', () => {
  openMemories();
});

document.querySelector('.next-button').addEventListener('click', () => {
  if (memoryIndex === memories.length - 1) {
    showFoodChapter();
    return;
  }
  memoryIndex += 1;
  showMemory();
});

function showFoodMemory() {
  const memory = foodMemories[foodIndex];
  foodPhoto.src = memory.image;
  foodPhoto.alt = memory.title;
  foodTitle.textContent = memory.title;
  foodText.textContent = memory.copy;
  foodNumber.textContent = String(foodIndex + 1).padStart(2, '0');
  foodIndexLabel.textContent = String(foodIndex + 1).padStart(2, '0');
}

document.querySelector('.food-next-button').addEventListener('click', () => {
  foodIndex = (foodIndex + 1) % foodMemories.length;
  showFoodMemory();
});

document.querySelector('.memories-next').addEventListener('click', showFoodChapter);
document.querySelector('.food-prev').addEventListener('click', showPortraitChapter);
document.querySelector('.map-next').addEventListener('click', showMapChapter);
document.querySelector('.map-prev').addEventListener('click', showFoodChapter);
document.querySelector('.collage-next').addEventListener('click', showCollageChapter);
document.querySelector('.collage-prev').addEventListener('click', showMapChapter);
document.querySelector('.letter-next').addEventListener('click', showLetterChapter);
document.querySelector('.letter-prev').addEventListener('click', showCollageChapter);

document.querySelectorAll('.artist-choice').forEach((choice) => {
  choice.addEventListener('click', () => {
    const player = choice.closest('.artist-players').querySelector('.single-player');
    const isOlivia = choice.dataset.artist === 'olivia';
    player.title = `${isOlivia ? 'Olivia Rodrigo' : 'Lorde'} Spotify player`;
    player.src = `https://open.spotify.com/embed/artist/${isOlivia ? '1McMsnEElThX1knmY4oliG' : '163tK9Wjr9P9DmM0AVK7lm'}?utm_source=generator&theme=0`;
    choice.parentElement.querySelectorAll('.artist-choice').forEach((item) => item.classList.toggle('active', item === choice));
  });
});

function createDateMap() {
  dateMap = L.map('date-map', { scrollWheelZoom: true, minZoom: 4, maxZoom: 18 }).setView([28.59, 77.22], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 18
  }).addTo(dateMap);

  const dates = [
    { location: [28.5497, 77.2002], place: 'Gypsy Haus, Hauz Khas', message: 'Our first date, and the beginning of my favourite story. You looked beautiful, and I forgot how to act normal.' },
    { location: [28.6005, 77.2267], place: 'Mamagoto, Khan Market', message: 'Our second date: excellent food, easy laughter, and you making even a busy room feel like ours.' },
    { location: [28.5494, 77.2426], place: 'Greater Kailash', message: 'Our third date, and proof that my favourite destination will always be wherever I get to meet you.' },
    { location: [28.5582, 77.2048], place: 'Diggin, in front of Green Park', message: 'A place I still think about because I wanted to tell you the simplest, biggest thing: I love you itna.' },
    { location: [28.5588, 77.2064], place: "Neelanjahna's home", message: 'The place where my heart got a little braver. I wanted to tell you I love you, itna, and I still do.' },
    { location: [28.5286, 77.2193], place: 'DLF Mall, Saket', message: 'Dancing, laughing, and enjoying Dadniya with you. Somehow you made a mall feel like our own little world.' },
    { location: [28.5438, 77.1553], place: 'Social, DLF Emporio', message: 'You gave me my best birthday here. I carry that happiness with me, and I carry you with it.' }
  ];
  dates.forEach((date, index) => {
    const marker = L.marker(date.location, { title: `${index + 1}. ${date.place}` }).addTo(dateMap);
    marker.bindPopup(`<strong>${index + 1}. ${date.place}</strong><br><span>${date.message}</span>`);
    marker.on('click', () => { mapMessage.textContent = date.message; });
  });
}

const birthdayMusicButton = document.querySelector('.birthday-music-button');
let birthdayAudio;
birthdayMusicButton.addEventListener('click', () => {
  if (birthdayAudio) {
    if (birthdayAudio.state === 'running') {
      birthdayAudio.suspend();
      birthdayMusicButton.innerHTML = '<span>♫</span> Play happy birthday';
    } else {
      birthdayAudio.resume();
      birthdayMusicButton.innerHTML = '<span>Ⅱ</span> Pause happy birthday';
    }
    return;
  }
  const audioContext = new AudioContext();
  const notes = [261.63, 261.63, 293.66, 261.63, 349.23, 329.63, 261.63, 261.63, 293.66, 261.63, 392, 349.23];
  let start = audioContext.currentTime;
  notes.forEach((frequency) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    gain.gain.setValueAtTime(.0001, start);
    gain.gain.exponentialRampToValueAtTime(.12, start + .03);
    gain.gain.exponentialRampToValueAtTime(.0001, start + .34);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(start);
    oscillator.stop(start + .36);
    start += .38;
  });
  birthdayAudio = audioContext;
  birthdayMusicButton.innerHTML = '<span>Ⅱ</span> Pause happy birthday';
});


updateCountdown();
setInterval(updateCountdown, 1000);
