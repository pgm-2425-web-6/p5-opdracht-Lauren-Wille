let bubbles = [];
let fishes = [];
let seaweed = [];
let bubblePopSound;

function preload() {
  // Load sound effects
  bubblePopSound = loadSound('sound/bubble.mp3');
}

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < 20; i++) {
    bubbles.push(new Bubble(random(width), random(height, height + 200)));
  }

  for (let i = 0; i < 5; i++) {
    fishes.push(new Fish(random(width), random(height)));
  }

  for (let i = 0; i < 10; i++) {
    seaweed.push(new Seaweed(random(width), height));
  }
}

function draw() {
  background(30, 144, 255); // Underwater blue

  // Draw seaweed
  for (let s of seaweed) s.display();

  // Draw bubbles
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
    if (this.y < -this.radius) this.y = height + this.radius; // Reset bubble
  }

  display() {
    noStroke();
    fill(255, 255, 255, 150);
    ellipse(this.x, this.y, this.radius * 2);
  }

  isClicked() {
    return dist(mouseX, mouseY, this.x, this.y) < this.radius;
  }
}

class Fish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(30, 70);
    this.color = color(random(100, 255), random(100, 255), random(100, 255));
    this.angle = random(TWO_PI);
    this.speed = random(1, 3);
  }

  move() {
    this.angle += random(-0.1, 0.1); // Wobble
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed;

    // Wrap around screen edges
    if (this.x > width) this.x = 0;
    if (this.x < 0) this.x = width;
    if (this.y > height) this.y = 0;
    if (this.y < 0) this.y = height;
  }

  display() {
    fill(this.color);
    noStroke();
    triangle(
      this.x, this.y,
      this.x - this.size, this.y - this.size / 2,
      this.x - this.size, this.y + this.size / 2
    );
  }
}

class Seaweed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.offset = random(0, TWO_PI);
  }

  display() {
    fill(34, 139, 34);
    beginShape();
    for (let i = 0; i < 10; i++) {
      let angle = this.offset + i * 0.5;
      let x = this.x + sin(angle) * 10;
      let y = this.y - i * 20;
      vertex(x, y);
    }
    endShape();
  }
}

function mousePressed() {
  for (let b of bubbles) {
    if (b.isClicked()) {
      bubblePopSound.play();
      bubbles.splice(bubbles.indexOf(b), 1);
      break;
    }
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
