let bubbles = [];
let fishes = [];
let bubblePopSound;
let fishImages = {};
let backgrounds = {};
let bgImage;
let bgIndex = 0;

function preload() {
  bubblePopSound = loadSound("sound/bubble.mp3");

  backgrounds["bgImage1"] = loadImage("../images/background1.png");
  backgrounds["bgImage2"] = loadImage("../images/background2.png");
  backgrounds["bgImage3"] = loadImage("../images/background3.png");

  fishImages["glowTetra"] = loadImage("images/fish1-colour.png");
  fishImages["goldFish"] = loadImage("images/fish2-colour.png");
  fishImages["cichlid"] = loadImage("images/fish3-colour.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble(random(width), random(height, height + 200)));
  }

  let button = select("button");

  button.mousePressed(() => {
    let keys = Object.keys(backgrounds);
    bgIndex = (bgIndex + 1) % keys.length;
    bgImage = backgrounds[keys[bgIndex]];
  });
}

function draw() {
  if (bgImage) {
    background(255);
    imageMode(CORNER);
    image(bgImage, 0, 0, width, height);
  } else {
    background(225);
    imageMode(CORNER);
    image(backgrounds["bgImage1"], 0, 0, width, height);
  }

  for (let b of bubbles) {
    b.move();
    b.display();
  }

  for (let f of fishes) {
    f.move();
    f.display();
  }
}

class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(10, 30);
  }

  move() {
    this.y -= 2;
    if (this.y < -this.radius) this.y = height + this.radius;
  }

  display() {
    fill(255, 255, 255);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  isClicked() {
    return dist(mouseX, mouseY, this.x, this.y) < this.radius;
  }
}

class Fish {
  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.size = random(250, 300);
    this.img = img;
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
    this.isStopped = false;
  }

  move() {
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    if (this.x + this.size / 2 >= width) {
      this.x = width - this.size / 2;
      this.angle = PI - this.angle;
    } else if (this.x - this.size / 2 <= 0) {
      this.x = this.size / 2;
      this.angle = PI - this.angle;
    }

    if (this.y + this.size / 2 >= height) {
      this.y = height - this.size / 2;
      this.angle = -this.angle;
    } else if (this.y - this.size / 2 <= 0) {
      this.y = this.size / 2;
      this.angle = -this.angle;
    }
  }

  display() {
    if (this.img) {
      push();
      imageMode(CENTER);

      let aspectRatio = this.img.width / this.img.height;
      let displayWidth = this.size;
      let displayHeight = this.size / aspectRatio;

      let direction = cos(this.angle) > 0 ? -1 : 1;

      if (direction === -1) {
        scale(-1, 1);
        image(this.img, -this.x, this.y, displayWidth, displayHeight);
      } else {
        image(this.img, this.x, this.y, displayWidth, displayHeight);
      }

      pop();
    }
  }

  isClicked() {
    let halfWidth = this.size / 2;
    let halfHeight = this.size / 2;

    return (
      mouseX > this.x - halfWidth &&
      mouseX < this.x + halfWidth &&
      mouseY > this.y - halfHeight &&
      mouseY < this.y + halfHeight
    );
  }

  toggleMovement() {
    this.isStopped = !this.isStopped;
    if (!this.isStopped) {
      this.speed = random(1, 3);
    } else {
      this.speed = 0;
    }
  }
}

function addFish(type) {
  if (type in fishImages) {
    let img = fishImages[type];
    fishes.push(new Fish(random(100, 1000), random(100, 1000), img));
  }
}

function removeFish(type) {
  fishes = fishes.filter((fish) => fish.img !== fishImages[type]);
}

function mousePressed() {
  for (let fish of fishes) {
    if (fish.isClicked()) {
      fish.toggleMovement();
      break;
    }
  }

  for (let i = bubbles.length - 1; i >= 0; i--) {
    if (bubbles[i].isClicked()) {
      bubblePopSound.play();
      bubbles.splice(i, 1);
      break;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
