let audioTrack;
let audioLoaded = false;
let beat = 0;
let waveform = [];
let fft;
let button;
let reverb;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.drop(audioFile);
  fft = new p5.FFT();
  button = createButton('play');
  reverb = new p5.Reverb();
}

function draw() {
  background('blue');
}

function audioFile(file) {
  audioTrack = loadSound(file.data, () => {
    audioLoaded = true;
    console.log('loaded');

    button.mousePressed(() => {
      playNote(audioTrack);
      playNote(audioTrack);
    });
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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
