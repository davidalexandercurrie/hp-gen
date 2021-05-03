let audioTrack;
let audioLoaded = false;
let beat = 0;
let waveform = [];
let fft;
let button;
let reverb;
let windowText = 'drop track to hyperfy here';

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight - 200);
  cnv.drop(audioFile);
  fft = new p5.FFT();
  button = createButton('play');
  reverb = new p5.Reverb();
}

function draw() {
  background('blue');
  textAlign(CENTER);
  fill('pink');
  textSize(60);
  text(windowText, width / 2, height / 2);
  fill('white');
  text(windowText, width / 2 - 1, height / 2 + 1);
  fill('lightgreen');
  text(windowText, width / 2 - 2, height / 2 + 2);
}

function audioFile(file) {
  windowText = 'hyperfying...';
  audioTrack = loadSound(file.data, () => {
    audioLoaded = true;
    console.log('loaded');
    windowText = 'click play when ready';

    button.mousePressed(() => {
      playNote(audioTrack);
      playNote(audioTrack);
    });
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 200);
}

function playNote(file) {
  let length = Math.floor(Math.random() * 6) * 250;
  let pos = Math.floor(Math.random() * file.duration());
  let rate = Math.floor(Math.random() * 4 + 0.25);
  let reps = Math.floor(Math.random() * 20);
  let noteLength = length / 2;
  pattern(file, pos, length, noteLength, reps, rate);
}

function pattern(file, pos, length, noteLength, reps, rate) {
  let counter = 0;
  let interval = setInterval(() => {
    reverb.process(file, 3, 2);
    file.play();
    file.rate(rate);
    file.jump(pos, length / 1000);
    if (Math.random() > 0.75) {
      setTimeout(() => {
        file.play();
        file.rate(rate);
        file.jump(pos, length / 1000);
      }, length / 4);
    }
    if (Math.random() > 0.75) {
      setTimeout(() => {
        file.play();
        file.rate(rate);
        file.jump(pos, length / 1000);
      }, length / 2);
      if (Math.random() > 0.75) {
        setTimeout(() => {
          file.play();
          file.rate(rate);
          file.jump(pos, length / 1000);
        }, length / 4);
      }
    }

    if (counter >= reps) {
      clearInterval(interval);

      playNote(file);
    }
    counter++;
  }, length);
}
